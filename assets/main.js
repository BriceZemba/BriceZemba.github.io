(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle */
  var btn = document.getElementById("theme-toggle");
  function effective() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function sync() { if (btn) btn.setAttribute("aria-pressed", effective() === "dark" ? "true" : "false"); }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    sync();
  }

  /* Print button on the CV page */
  Array.prototype.forEach.call(document.querySelectorAll("[data-print]"), function (b) {
    b.addEventListener("click", function () { window.print(); });
  });

  /* Profile photo: if assets/profile.* exists, swap it in for the monogram */
  var probe = document.querySelector("[data-photo-probe]");
  if (probe) {
    var exts = probe.getAttribute("data-photo-probe").split(",");
    var tryNext = function (i) {
      if (i >= exts.length) return;
      var img = new Image();
      img.onload = function () {
        img.className = "photo";
        img.alt = probe.getAttribute("data-alt") || "";
        img.width = 120; img.height = 120;
        probe.innerHTML = "";
        probe.appendChild(img);
      };
      img.onerror = function () { tryNext(i + 1); };
      img.src = "/assets/profile." + exts[i];
    };
    tryNext(0);
  }

  /* Key numbers count up when they scroll into view */
  var counters = document.querySelectorAll("[data-count]");
  function countUp(el) {
    var end = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    var loc = el.getAttribute("data-locale") === "fr" ? "fr-FR" : "en-US";
    var t0 = null, dur = 900;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString(loc) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (c) { io.observe(c); });
  }

  /* Research map: highlight what a node is connected to */
  var svg = document.querySelector(".graph");
  if (svg) {
    var caption = document.getElementById("map-caption");
    var hint = caption ? caption.textContent : "";
    var nodes = Array.prototype.slice.call(svg.querySelectorAll(".node"));
    var edges = Array.prototype.slice.call(svg.querySelectorAll(".edge"));
    var themesOf = function (n) { return (n.getAttribute("data-themes") || "").split(" "); };
    var activate = function (node) {
      var t = node.getAttribute("data-t");
      var p = node.getAttribute("data-p");
      svg.classList.add("has-active");
      nodes.forEach(function (n) {
        var on = n === node ||
          (t && n.getAttribute("data-p") && themesOf(n).indexOf(t) > -1) ||
          (p && n.getAttribute("data-t") && themesOf(node).indexOf(n.getAttribute("data-t")) > -1);
        n.classList.toggle("is-related", !!on);
      });
      edges.forEach(function (e) {
        var on = (t && e.getAttribute("data-t") === t) || (p && e.getAttribute("data-p") === p);
        e.classList.toggle("is-related", !!on);
      });
      if (caption) caption.textContent = node.getAttribute("data-cap") || hint;
    };
    var reset = function () {
      svg.classList.remove("has-active");
      nodes.forEach(function (n) { n.classList.remove("is-related"); });
      edges.forEach(function (e) { e.classList.remove("is-related"); });
      if (caption) caption.textContent = hint;
    };
    nodes.forEach(function (n) {
      n.addEventListener("mouseenter", function () { activate(n); });
      n.addEventListener("focus", function () { activate(n); });
      n.addEventListener("mouseleave", reset);
      n.addEventListener("blur", reset);
    });
  }

  /* Project filters (projects page) */
  var bar = document.querySelector(".filters");
  if (bar) {
    bar.hidden = false;
    var cards = Array.prototype.slice.call(document.querySelectorAll(".card[data-themes]"));
    var fbtns = Array.prototype.slice.call(bar.querySelectorAll("button"));
    var nomatch = document.querySelector(".nomatch");
    var keys = fbtns.map(function (b) { return b.getAttribute("data-filter"); });
    var apply = function (key) {
      var shown = 0;
      cards.forEach(function (c) {
        var on = key === "all" || c.getAttribute("data-themes").split(" ").indexOf(key) > -1;
        c.hidden = !on;
        if (on) shown++;
      });
      fbtns.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === key ? "true" : "false"); });
      if (nomatch) nomatch.hidden = shown > 0;
    };
    var fromHash = function () {
      var h = location.hash.slice(1);
      var isTheme = keys.indexOf(h) > -1 && h !== "all";
      apply(isTheme ? h : "all");
      if (!isTheme && h) {
        var el = document.getElementById(h);
        if (el) el.scrollIntoView();
      }
    };
    fbtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-filter");
        try { history.replaceState(null, "", k === "all" ? location.pathname : "#" + k); } catch (e) {}
        apply(k);
      });
    });
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* Command palette (Ctrl or Cmd + K, or "/") */
  var dlg = document.getElementById("palette");
  var dataEl = document.getElementById("palette-data");
  var openBtn = document.getElementById("palette-open");
  if (dlg && dataEl && typeof dlg.showModal === "function") {
    var items = [];
    try { items = JSON.parse(dataEl.textContent); } catch (e) { items = []; }
    var input = document.getElementById("palette-input");
    var list = document.getElementById("palette-list");
    var shown = [], active = 0;
    var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
    var mark = function () {
      Array.prototype.forEach.call(list.querySelectorAll(".pal-item"), function (li) {
        var on = +li.getAttribute("data-i") === active;
        li.classList.toggle("active", on);
        li.setAttribute("aria-selected", on ? "true" : "false");
        if (on) { input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
      });
    };
    var render = function () {
      var q = norm(input.value.trim());
      shown = items.filter(function (it) { return !q || norm(it.l + " " + (it.k || "") + " " + it.g).indexOf(q) > -1; }).slice(0, 14);
      active = 0;
      list.innerHTML = "";
      if (!shown.length) {
        var none = document.createElement("li");
        none.className = "pal-none";
        none.textContent = dlg.getAttribute("data-none") || "";
        list.appendChild(none);
        return;
      }
      var last = "";
      shown.forEach(function (it, i) {
        if (it.g !== last) {
          var g = document.createElement("li");
          g.className = "pal-group";
          g.setAttribute("role", "presentation");
          g.textContent = it.g;
          list.appendChild(g);
          last = it.g;
        }
        var li = document.createElement("li");
        li.id = "pal-" + i;
        li.className = "pal-item";
        li.setAttribute("role", "option");
        li.setAttribute("data-i", i);
        li.textContent = it.l;
        list.appendChild(li);
      });
      mark();
    };
    var go = function (it) {
      dlg.close();
      if (!it) return;
      if (it.a === "theme") { if (btn) btn.click(); return; }
      if (it.x) window.open(it.u, "_blank", "noopener");
      else window.location.href = it.u;
    };
    var open = function () {
      if (dlg.open) return;
      dlg.showModal();
      input.value = "";
      render();
      input.focus();
    };
    if (openBtn) { openBtn.hidden = false; openBtn.addEventListener("click", open); }
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, shown.length - 1); mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); mark(); }
      else if (e.key === "Enter") { e.preventDefault(); go(shown[active]); }
    });
    list.addEventListener("click", function (e) {
      var li = e.target.closest ? e.target.closest(".pal-item") : null;
      if (li) go(shown[+li.getAttribute("data-i")]);
    });
    list.addEventListener("mousemove", function (e) {
      var li = e.target.closest ? e.target.closest(".pal-item") : null;
      if (li && +li.getAttribute("data-i") !== active) { active = +li.getAttribute("data-i"); mark(); }
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener("keydown", function (e) {
      var tag = (e.target && e.target.tagName || "").toLowerCase();
      var typing = tag === "input" || tag === "textarea" || tag === "select" || (e.target && e.target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); open(); }
      else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); open(); }
    });
  }
})();
