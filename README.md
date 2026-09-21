# bricezemba.github.io

Personal academic site of Wendemi Brice Roméo Zemba, in English and French. Live at https://bricezemba.github.io/

## Add your profile picture

Put a square photo (at least 400 x 400 px, under 300 KB) in the `assets` folder and name it `profile.jpg` (`profile.png` or `profile.webp` also work). Commit and push. The photo replaces the "BZ" monogram on the home page automatically, with no rebuild needed. On GitHub you can do it from the browser: open the repository, go to `assets`, choose Add file, then Upload files.

## Edit the content

All text lives in `src/content.js` (each value has an `en` and an `fr` version). After editing, run:

    node src/build.js

then commit and push. The generated pages, feed and sitemap are written to the repository root.

## Features

- English and French versions of every page, with a language switch
- Dark and light theme, saved in the browser
- Research map: an interactive graph linking research themes to projects
- Project filters by theme (the map links to them)
- Command palette: press Ctrl+K (or Cmd+K, or /) to jump to any page, section, project or link
- Negative results section, key numbers, print-friendly CV page, RSS feed, sitemap
- No tracking and no cookies
