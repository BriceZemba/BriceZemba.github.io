// All site content lives here. Edit this file, then run: node src/build.js
// Each translatable value is { en: "...", fr: "..." }.

const ORIGIN = "https://bricezemba.github.io";

const person = {
  name: "Wendemi Brice Roméo Zemba",
  short: "Brice Zemba",
  initials: "BZ",
  email: "bricezemba336@gmail.com",
  links: {
    github: "https://github.com/BriceZemba",
    linkedin: "https://linkedin.com/in/wendemi-brice-romeo-zemba/",
    scholar: "https://scholar.google.com/citations?user=OHpJOGkAAAAJ&hl=en",
    medium: "https://medium.com/@bricezemba336",
  },
};

const ui = {
  skip: { en: "Skip to content", fr: "Aller au contenu" },
  nav: {
    about: { en: "About", fr: "À propos" },
    work: { en: "Work", fr: "Projets" },
    writing: { en: "Writing", fr: "Écrits" },
    teaching: { en: "Teaching", fr: "Enseignement" },
    cv: { en: "CV", fr: "CV" },
  },
  langSwitch: { en: "FR", fr: "EN" },
  langSwitchLabel: { en: "Lire en français", fr: "Read in English" },
  themeLabel: { en: "Toggle dark mode", fr: "Basculer le mode sombre" },
  sections: {
    news: { en: "News", fr: "Actualités" },
    about: { en: "About me", fr: "À propos de moi" },
    education: { en: "Education", fr: "Formation" },
    experience: { en: "Experience", fr: "Expérience" },
    work: { en: "Selected work", fr: "Projets sélectionnés" },
    awards: { en: "Awards and certifications", fr: "Distinctions et certifications" },
    posts: { en: "Latest writing", fr: "Derniers écrits" },
    interests: { en: "Research interests", fr: "Centres d'intérêt de recherche" },
  },
  allProjects: { en: "All {n} projects", fr: "Les {n} projets" },
  allWriting: { en: "All writing", fr: "Tous les écrits" },
  viewWork: { en: "View my work", fr: "Voir mes projets" },
  viewCV: { en: "Curriculum vitae", fr: "Curriculum vitae" },
  awardsLabel: { en: "Awards", fr: "Distinctions" },
  certsLabel: { en: "Certifications", fr: "Certifications" },
  footer: {
    en: "Static site, no tracking, no cookies.",
    fr: "Site statique, sans suivi, sans cookies.",
  },
  rss: { en: "RSS feed", fr: "Flux RSS" },
  email: { en: "Email", fr: "Courriel" },
  print: { en: "Print or save as PDF", fr: "Imprimer ou enregistrer en PDF" },
  cvNote: {
    en: "References available on request.",
    fr: "Références disponibles sur demande.",
  },
  notFound: {
    en: "This page does not exist.",
    fr: "Cette page n'existe pas.",
  },
  backHome: { en: "Back to the home page", fr: "Retour à l'accueil" },
};

const meta = {
  home: {
    title: {
      en: "Wendemi Brice Roméo Zemba | Machine learning, interpretability, multi-agent RL",
      fr: "Wendemi Brice Roméo Zemba | Apprentissage automatique, interprétabilité, RL multi-agent",
    },
    desc: {
      en: "Engineer in Data Science and AI based in Rabat. Interpretable machine learning, multi-agent reinforcement learning, and learning from multi-sensor data.",
      fr: "Ingénieur en Data Science et IA basé à Rabat. Apprentissage automatique interprétable, apprentissage par renforcement multi-agent et données multi-capteurs.",
    },
  },
  projects: {
    title: { en: "Work | Brice Zemba", fr: "Projets | Brice Zemba" },
    desc: {
      en: "Research projects and open-source code: reinforcement learning for O-RAN, graph neural network agents, a GPT from scratch, interpretability, and remote sensing.",
      fr: "Projets de recherche et code open source : apprentissage par renforcement pour O-RAN, agents à graphes de neurones, GPT depuis zéro, interprétabilité et télédétection.",
    },
  },
  blog: {
    title: { en: "Writing | Brice Zemba", fr: "Écrits | Brice Zemba" },
    desc: {
      en: "Preprints on HAL Open Science and articles on Medium.",
      fr: "Préprints sur HAL Open Science et articles sur Medium.",
    },
  },
  teaching: {
    title: { en: "Teaching and talks | Brice Zemba", fr: "Enseignement et prises de parole | Brice Zemba" },
    desc: {
      en: "Public speaking, debate, community leadership, and teaching through writing.",
      fr: "Prise de parole, débat, engagement associatif et pédagogie par l'écriture.",
    },
  },
  cv: {
    title: { en: "CV | Brice Zemba", fr: "CV | Brice Zemba" },
    desc: {
      en: "Curriculum vitae of Wendemi Brice Roméo Zemba: education, research, experience, publications, skills.",
      fr: "Curriculum vitae de Wendemi Brice Roméo Zemba : formation, recherche, expérience, publications, compétences.",
    },
  },
};

const hero = {
  role: {
    en: "Engineer in Data Science and AI · Rabat, Morocco",
    fr: "Ingénieur en Data Science et IA · Rabat, Maroc",
  },
  tagline: {
    en: "I study when a machine learning model can be trusted: interpretable models, multi-agent reinforcement learning, and learning from multi-sensor data.",
    fr: "J'étudie dans quelles conditions on peut faire confiance à un modèle d'apprentissage : modèles interprétables, apprentissage par renforcement multi-agent et apprentissage à partir de données multi-capteurs.",
  },
};

const news = [
  {
    date: "2026-09",
    en: "Extended my thesis analysis with a pre-sowing negative control that exposed a spatial confounder, and deployed a web tool for intra-plot mapping.",
    fr: "J'ai prolongé l'analyse de mon mémoire avec un contrôle négatif avant semis, qui a révélé un facteur de confusion spatial, et déployé un outil web de cartographie intraparcellaire.",
  },
  {
    date: "2026-08",
    en: "Created my Google Scholar profile.",
    fr: "Création de mon profil Google Scholar.",
  },
  {
    date: "2026-06",
    en: "Graduated with the Diplôme d'Ingénieur in Data Science and AI from ENSAM Rabat.",
    fr: "Diplômé ingénieur en Data Science et IA de l'ENSAM Rabat.",
  },
  {
    date: "2026-03",
    en: "Started a research internship at the Analytics Lab of UM6P Rabat, supervised by Dr. Hamd Ait Abdelali.",
    fr: "Début d'un stage de recherche à l'Analytics Lab de l'UM6P Rabat, encadré par le Dr. Hamd Ait Abdelali.",
  },
  {
    date: "2026-01",
    en: "Published three articles on Medium: a GPT built from first principles, a Transformer for cyber threat intelligence, and a guide to cutting cloud costs with machine learning.",
    fr: "Publication de trois articles sur Medium : un GPT construit depuis les premiers principes, un Transformer pour la cyber threat intelligence et un guide pour réduire les coûts cloud par le machine learning.",
  },
];

const about = {
  paragraphs: [
    {
      en: "I graduated in June 2026 with an engineering diploma (Diplôme d'Ingénieur, equivalent to an MSc) in Data Science and Artificial Intelligence from ENSAM Rabat, after a BSc in Applied Mathematics in Tétouan. I am from Burkina Faso and based in Rabat, Morocco.",
      fr: "J'ai obtenu en juin 2026 un diplôme d'ingénieur (équivalent au master) en Data Science et Intelligence Artificielle à l'ENSAM Rabat, après une licence en Mathématiques Appliquées à Tétouan. Je suis burkinabè et je vis à Rabat, au Maroc.",
    },
    {
      en: "My research asks when a model's behaviour, and its explanations, can be trusted. That led me to symbolic rule extraction and explanation stability (DeepRED with SHAP), to decentralised multi-agent systems where graph neural network agents coordinate from local observations, and to sequence models that I implement from their equations, including a GPT trained from scratch and a Transformer that anticipates MITRE ATT&CK attack chains.",
      fr: "Ma recherche pose une question : quand peut-on faire confiance au comportement d'un modèle, et à ses explications ? Elle m'a conduit à l'extraction de règles symboliques et à la stabilité des explications (DeepRED avec SHAP), aux systèmes multi-agents décentralisés où des agents à graphes de neurones se coordonnent à partir d'observations locales, et aux modèles de séquences que j'implémente à partir de leurs équations, dont un GPT entraîné depuis zéro et un Transformer qui anticipe des chaînes d'attaques MITRE ATT&CK.",
    },
    {
      en: "My thesis, a research internship at the Analytics Lab of UM6P Rabat under Dr. Hamd Ait Abdelali, studies early detection of Fusarium in maize from Sentinel-1 radar, Sentinel-2 optical and weather data. Its most useful result is a negative one: a control run on the pre-sowing period, with no maize in the ground, still separated infected from healthy plots, which revealed a spatial confounder. I report it that way.",
      fr: "Mon mémoire, un stage de recherche à l'Analytics Lab de l'UM6P Rabat sous la direction du Dr. Hamd Ait Abdelali, porte sur la détection précoce de la fusariose du maïs à partir de données radar Sentinel-1, optiques Sentinel-2 et météorologiques. Son résultat le plus utile est négatif : un contrôle sur la période précédant le semis, sans maïs en terre, séparait quand même les parcelles infectées des saines, ce qui a révélé un facteur de confusion spatial. Je le rapporte tel quel.",
    },
    {
      en: "I write about what I build on Medium and release code and preprints openly. I am looking for MSc and PhD opportunities in machine learning research.",
      fr: "J'écris sur ce que je construis sur Medium et je publie mon code et mes préprints en accès libre. Je cherche des opportunités de master et de doctorat en recherche en apprentissage automatique.",
    },
  ],
  interests: [
    { en: "Interpretable machine learning", fr: "Apprentissage automatique interprétable" },
    { en: "Multi-agent reinforcement learning", fr: "Apprentissage par renforcement multi-agent" },
    { en: "Graph neural networks", fr: "Réseaux de neurones sur graphes" },
    { en: "Sequence models and LLMs", fr: "Modèles de séquences et LLM" },
    { en: "Multi-sensor remote sensing", fr: "Télédétection multi-capteurs" },
  ],
};

const education = [
  {
    when: { en: "Sep 2023 to Jun 2026", fr: "Sept. 2023 à juin 2026" },
    title: {
      en: "Diplôme d'Ingénieur (5 years), Data Science and Artificial Intelligence",
      fr: "Diplôme d'Ingénieur (5 ans), Data Science et Intelligence Artificielle",
    },
    org: { en: "ENSAM, Mohammed V University, Rabat, Morocco", fr: "ENSAM, Université Mohammed V, Rabat, Maroc" },
    body: {
      en: "Equivalent to an MSc. Weighted average 15.565/20. Coursework: numerical analysis (MATLAB), optimisation, machine learning and deep learning, probability and statistics, graph theory.",
      fr: "Équivalent d'un master. Moyenne pondérée 15,565/20. Cours : analyse numérique (MATLAB), optimisation, apprentissage automatique et profond, probabilités et statistiques, théorie des graphes.",
    },
  },
  {
    when: { en: "Sep 2021 to Jul 2023", fr: "Sept. 2021 à juil. 2023" },
    title: { en: "BSc, Applied Mathematics", fr: "Licence, Mathématiques Appliquées" },
    org: { en: "Faculté des Sciences, Tétouan, Morocco", fr: "Faculté des Sciences, Tétouan, Maroc" },
    body: {
      en: "Linear algebra, real and functional analysis, probability, statistics, optimisation, numerical methods.",
      fr: "Algèbre linéaire, analyse réelle et fonctionnelle, probabilités, statistiques, optimisation, méthodes numériques.",
    },
  },
];

const experience = [
  {
    when: { en: "Mar 2026 to present", fr: "Mars 2026 à aujourd'hui" },
    title: { en: "Research Intern (MSc thesis)", fr: "Stagiaire de recherche (mémoire)" },
    org: { en: "Analytics Lab, UM6P, Rabat", fr: "Analytics Lab, UM6P, Rabat" },
    bullets: [
      {
        en: "Early detection of Fusarium in maize from Sentinel-1 radar, Sentinel-2 optical time series and ERA5-Land weather data, at a pilot site in the Gharb region (2024 season). Supervised by Dr. Hamd Ait Abdelali.",
        fr: "Détection précoce de la fusariose du maïs à partir de séries temporelles radar Sentinel-1, optiques Sentinel-2 et de données météo ERA5-Land, sur un site pilote du Gharb (campagne 2024). Encadré par le Dr. Hamd Ait Abdelali.",
      },
      {
        en: "Digitised and validated 18 plots against their declared areas (18,214 pixels), then compared Random Forest, MiniROCKET and a frozen Presto encoder under one plot-level validation protocol.",
        fr: "Numérisation de 18 parcelles validées par leurs surfaces déclarées (18 214 pixels), puis comparaison de Random Forest, MiniROCKET et d'un encodeur Presto gelé selon un même protocole de validation par parcelle.",
      },
      {
        en: "A negative control on the pre-sowing window still separated infected from healthy plots (AUC 0.78), exposing a spatial confounder; I report it openly and propose interleaved plots, geolocated field surveys and multi-season data.",
        fr: "Un contrôle négatif sur la fenêtre avant semis séparait quand même les parcelles infectées des saines (AUC 0,78), révélant un facteur de confusion spatial ; je le rapporte ouvertement et propose des parcelles entrelacées, des relevés terrain géolocalisés et des données multi-saisons.",
      },
      {
        en: "Deployed a web tool for intra-plot mapping of the 14 usable plots.",
        fr: "Déploiement d'un outil web de cartographie intraparcellaire des 14 parcelles exploitables.",
      },
    ],
  },
  {
    when: { en: "Jul to Sep 2025", fr: "Juil. à sept. 2025" },
    title: { en: "Data Science and AI Intern", fr: "Stagiaire Data Science et IA" },
    org: { en: "Thinline, Morocco", fr: "Thinline, Maroc" },
    bullets: [
      {
        en: "Built an end-to-end machine learning pipeline used by non-technical colleagues, reducing error processing from 4 hours to 3 minutes at 99.8% data integrity.",
        fr: "Construction d'une chaîne de machine learning de bout en bout utilisée par des collègues non techniques, réduisant le traitement des erreurs de 4 heures à 3 minutes avec 99,8 % d'intégrité des données.",
      },
    ],
  },
  {
    when: { en: "Sep to Oct 2024", fr: "Sept. à oct. 2024" },
    title: { en: "Deep Learning Intern", fr: "Stagiaire Deep Learning" },
    org: { en: "TechnoColab, Morocco", fr: "TechnoColab, Maroc" },
    bullets: [
      {
        en: "Built RNN and LSTM predictive models (87% accuracy) and deployed them behind a real-time Flask API.",
        fr: "Construction de modèles prédictifs RNN et LSTM (87 % de précision) déployés derrière une API Flask temps réel.",
      },
    ],
  },
  {
    when: { en: "Jul 2024", fr: "Juil. 2024" },
    title: { en: "Data Infrastructure Intern", fr: "Stagiaire Infrastructure de données" },
    org: { en: "Thinline, Morocco", fr: "Thinline, Maroc" },
    bullets: [
      {
        en: "Cleaned data at scale with a Random Forest and fuzzy matching, reaching 99.8% integrity.",
        fr: "Nettoyage de données à grande échelle avec une Random Forest et une correspondance floue, pour 99,8 % d'intégrité.",
      },
    ],
  },
];

const projects = [
  {
    id: "oran-rl",
    featured: true,
    date: "2025",
    tags: [{ en: "Reinforcement learning", fr: "Apprentissage par renforcement" }, { en: "Wireless networks", fr: "Réseaux sans fil" }],
    title: {
      en: "Energy-aware resource allocation for O-RAN with reinforcement learning",
      fr: "Allocation de ressources économe en énergie pour O-RAN par apprentissage par renforcement",
    },
    desc: {
      en: "A custom Gym environment and a PPO agent written from scratch for a constrained control problem (15-dimensional state, 9 continuous actions), with AR(1) channel and Markov traffic dynamics and an explicit safety-first constraint hierarchy. It reaches +32.6% QoS and 43.1% lower energy use than a static baseline.",
      fr: "Un environnement Gym sur mesure et un agent PPO écrit depuis zéro pour un problème de contrôle sous contraintes (état de dimension 15, 9 actions continues), avec un canal AR(1), un trafic markovien et une hiérarchie de contraintes où la sécurité passe d'abord. Il atteint +32,6 % de QoS et 43,1 % d'énergie en moins par rapport à une référence statique.",
    },
    links: [
      { label: { en: "Code", fr: "Code" }, url: "https://github.com/BriceZemba/Energy-Aware-Resource-Allocation-for-O-RAN-using-Reinforcement-Learning" },
      { label: { en: "Technical report", fr: "Rapport technique" }, url: "https://github.com/BriceZemba/Energy-Aware-Resource-Allocation-for-O-RAN-using-Reinforcement-Learning/blob/main/Technical_Report.pdf" },
    ],
  },
  {
    id: "gnn-agents",
    featured: false,
    date: "2025",
    tags: [{ en: "Multi-agent systems", fr: "Systèmes multi-agents" }, { en: "Graph neural networks", fr: "Réseaux de neurones sur graphes" }],
    title: {
      en: "Decentralised multi-agent coordination with graph neural networks",
      fr: "Coordination multi-agents décentralisée par réseaux de neurones sur graphes",
    },
    desc: {
      en: "Agents that coordinate from local neighbourhood observations only, with no central controller. Curriculum learning improves sample efficiency by 40%.",
      fr: "Des agents qui se coordonnent à partir d'observations locales de voisinage uniquement, sans contrôleur central. L'apprentissage par curriculum améliore l'efficacité d'échantillonnage de 40 %.",
    },
    links: [{ label: { en: "Code", fr: "Code" }, url: "https://github.com/BriceZemba/trustworthy-ran-orchestration" }],
  },
  {
    id: "gpt-scratch",
    featured: true,
    date: "2025",
    tags: [{ en: "LLMs", fr: "LLM" }, { en: "Retrieval-augmented generation", fr: "Génération augmentée par récupération" }],
    title: {
      en: "A GPT from first principles, with knowledge-graph RAG",
      fr: "Un GPT depuis les premiers principes, avec RAG sur graphe de connaissances",
    },
    desc: {
      en: "Attention, positional encoding and autoregressive generation implemented from the equations and trained on 40M tokens, coupled to a Neo4j knowledge graph (200+ nodes, typed relations) for retrieval-augmented generation, reaching 80% top-3 precision.",
      fr: "Attention, encodage positionnel et génération autorégressive implémentés à partir des équations et entraînés sur 40 M de tokens, couplés à un graphe de connaissances Neo4j (plus de 200 nœuds, relations typées) pour la génération augmentée par récupération, avec 80 % de précision top-3.",
    },
    links: [
      { label: { en: "Code", fr: "Code" }, url: "https://github.com/BriceZemba/llm-from-scratch" },
      { label: { en: "Preprint", fr: "Préprint" }, url: "https://hal.science/view/index/docid/5481094" },
      { label: { en: "Article", fr: "Article" }, url: "https://medium.com/@bricezemba336/beyond-the-api-implementing-a-gpt-architecture-from-first-principles-e6079962e08d" },
    ],
  },
  {
    id: "deepred-shap",
    featured: true,
    date: "2025 to 2026",
    dateFr: "2025 à 2026",
    tags: [{ en: "Interpretability", fr: "Interprétabilité" }],
    title: {
      en: "Symbolic rule extraction with DeepRED and SHAP",
      fr: "Extraction de règles symboliques avec DeepRED et SHAP",
    },
    desc: {
      en: "Extracts human-readable symbolic rules from trained neural networks and pairs them with Shapley attributions (92% fidelity), then measures how much the explanations shift under input perturbation.",
      fr: "Extrait des règles symboliques lisibles à partir de réseaux de neurones entraînés et les associe à des attributions de Shapley (fidélité de 92 %), puis mesure de combien les explications varient sous perturbation des entrées.",
    },
    links: [
      { label: { en: "Code", fr: "Code" }, url: "https://github.com/BriceZemba/interpretable-deep-models" },
      { label: { en: "Preprint", fr: "Préprint" }, url: "https://hal.science/view/index/docid/5495532" },
    ],
  },
  {
    id: "attack-chains",
    date: "2025 to 2026",
    dateFr: "2025 à 2026",
    tags: [{ en: "Cybersecurity", fr: "Cybersécurité" }, { en: "Sequence models", fr: "Modèles de séquences" }],
    title: {
      en: "Anticipating cyber attacks with a Transformer",
      fr: "Anticiper les cyberattaques avec un Transformer",
    },
    desc: {
      en: "A Transformer that predicts the most likely next action on a structured MITRE ATT&CK graph (14 categories, 200+ actions) under precedence constraints.",
      fr: "Un Transformer qui prédit l'action suivante la plus probable sur un graphe MITRE ATT&CK structuré (14 catégories, plus de 200 actions) sous contraintes de précédence.",
    },
    links: [
      { label: { en: "Preprint", fr: "Préprint" }, url: "https://hal.science/view/index/docid/5485705" },
      { label: { en: "Article (French)", fr: "Article" }, url: "https://medium.com/@bricezemba336/pr%C3%A9dire-la-prochaine-attaque-le-transformer-au-service-de-la-cyber-threat-intelligence-74169aa2ddd7" },
    ],
  },
  {
    id: "zindi-redteam",
    date: "",
    tags: [{ en: "AI safety", fr: "Sûreté de l'IA" }, { en: "Red-teaming", fr: "Red-teaming" }],
    title: {
      en: "Red-teaming LLMs in African languages (Zindi Trust and Safety challenge)",
      fr: "Red-teaming de LLM en langues africaines (défi Zindi Trust and Safety)",
    },
    desc: {
      en: "Adversarial prompting of pawa-gemma, N-ATLaS, InkubaLM and AfroLM as team SecondEtre. Only pawa-gemma (Swahili) and N-ATLaS (Hausa, Yoruba, Igbo) produced genuinely harmful outputs, and quality and reproducibility mattered more than volume. Best score: 0.85.",
      fr: "Prompts adverses contre pawa-gemma, N-ATLaS, InkubaLM et AfroLM au sein de l'équipe SecondEtre. Seuls pawa-gemma (swahili) et N-ATLaS (haoussa, yoruba, igbo) ont produit de vraies sorties nuisibles, et la qualité comme la reproductibilité ont primé sur la quantité. Meilleur score : 0,85.",
    },
    links: [],
  },
];

const thesisProject = {
  id: "thesis-fusarium",
  featured: true,
  date: "2026",
  tags: [{ en: "Remote sensing", fr: "Télédétection" }, { en: "Evaluation", fr: "Évaluation" }],
  title: {
    en: "Early detection of Fusarium in maize from satellite time series",
    fr: "Détection précoce de la fusariose du maïs par séries temporelles satellitaires",
  },
  desc: {
    en: "Sentinel-1 radar, Sentinel-2 optical and weather data at a pilot site in the Gharb region (2024 season, 18 plots). Random Forest, MiniROCKET and a frozen Presto encoder were compared under one plot-level protocol. A negative control on the pre-sowing window, with no maize in the ground, still reached AUC 0.78, and position alone reached AUC 0.79: infected and healthy plots were spatially confounded. The honest conclusion is that the apparent skill cannot be credited to disease signal without a better experimental design.",
    fr: "Données radar Sentinel-1, optiques Sentinel-2 et météo sur un site pilote du Gharb (campagne 2024, 18 parcelles). Random Forest, MiniROCKET et un encodeur Presto gelé ont été comparés selon un même protocole de validation par parcelle. Un contrôle négatif sur la fenêtre avant semis, sans maïs en terre, atteignait encore une AUC de 0,78, et la seule position une AUC de 0,79 : parcelles infectées et saines étaient confondues dans l'espace. La conclusion honnête est que la performance apparente ne peut pas être attribuée au signal de la maladie sans un meilleur plan d'expérience.",
  },
  links: [],
};

// Order shown on the projects page: thesis first, then the rest.
const allProjects = [thesisProject, ...projects];

const awards = [
  {
    year: "2025",
    title: { en: "1st Prize, Social Entrepreneurship", fr: "1er Prix, Entrepreneuriat social" },
    org: { en: "ENACTUS", fr: "ENACTUS" },
  },
  {
    year: "2023",
    title: { en: "1st Prize, JeJa competition", fr: "1er Prix, concours JeJa" },
    org: { en: "JeJa", fr: "JeJa" },
  },
  {
    year: "2022",
    title: { en: "2nd Prize, General Knowledge", fr: "2e Prix, Connaissances générales" },
    org: { en: "Abdelmalek Essaâdi University", fr: "Université Abdelmalek Essaâdi" },
  },
  {
    year: "",
    title: { en: "1st Prize, Public Speaking", fr: "1er Prix, Prise de parole" },
    org: { en: "Burkinabè community", fr: "Communauté burkinabè" },
  },
];

const certifications = [
  { en: "Oracle Certified AI Foundation Associate", fr: "Oracle Certified AI Foundation Associate" },
  { en: "CS50x, Harvard", fr: "CS50x, Harvard" },
  { en: "Deep Learning Specialization, Stanford and Coursera", fr: "Deep Learning Specialization, Stanford et Coursera" },
  { en: "Machine Learning Specialization, IBM", fr: "Machine Learning Specialization, IBM" },
  { en: "Scientific Computing with Python, freeCodeCamp", fr: "Scientific Computing with Python, freeCodeCamp" },
];

const posts = [
  {
    date: "2026-01-31",
    lang: "EN",
    url: "https://medium.com/@bricezemba336/cutting-cloud-costs-by-40-with-machine-learning-a-complete-implementation-guide-62f777bad339",
    title: { en: "Cutting Cloud Costs by 40% with Machine Learning: A Complete Implementation Guide", fr: "Cutting Cloud Costs by 40% with Machine Learning: A Complete Implementation Guide" },
    tags: ["machine-learning", "cloud-computing", "deep-learning"],
  },
  {
    date: "2026-01-30",
    lang: "FR",
    url: "https://medium.com/@bricezemba336/pr%C3%A9dire-la-prochaine-attaque-le-transformer-au-service-de-la-cyber-threat-intelligence-74169aa2ddd7",
    title: { en: "Prédire la Prochaine Attaque : Le Transformer au Service de la Cyber Threat Intelligence", fr: "Prédire la Prochaine Attaque : Le Transformer au Service de la Cyber Threat Intelligence" },
    tags: ["cybersecurity", "deep-learning"],
  },
  {
    date: "2026-01-25",
    lang: "EN",
    url: "https://medium.com/@bricezemba336/beyond-the-api-implementing-a-gpt-architecture-from-first-principles-e6079962e08d",
    title: { en: "Beyond the API: Implementing a GPT Architecture from First Principles", fr: "Beyond the API: Implementing a GPT Architecture from First Principles" },
    tags: ["llm", "transformers"],
  },
];

const preprints = [
  {
    title: "Symbolic Rule Extraction from Deep Neural Networks: A Hybrid DeepRED and SHAP Framework",
    url: "https://hal.science/view/index/docid/5495532",
    note: { en: "Preprint, HAL Open Science, 2026, under review", fr: "Préprint, HAL Open Science, 2026, en révision" },
  },
  {
    title: "Beyond the API: Implementing a GPT Architecture from First Principles",
    url: "https://hal.science/view/index/docid/5481094",
    note: { en: "Preprint, HAL Open Science, 2026, under review", fr: "Préprint, HAL Open Science, 2026, en révision" },
  },
  {
    title: "Anticipating Cyber Attacks: A Transformer-Based Approach to MITRE ATT&CK Chain Prediction",
    url: "https://hal.science/view/index/docid/5485705",
    note: { en: "Preprint, HAL Open Science, 2026, under review", fr: "Préprint, HAL Open Science, 2026, en révision" },
  },
];

const teaching = {
  intro: {
    en: "Speaking, organising and explaining: on stage, in a debate club, in a community of 200 people, and in writing.",
    fr: "Parler, organiser et expliquer : sur scène, dans un club de débat, dans une communauté de 200 personnes, et par écrit.",
  },
  blocks: [
    {
      title: { en: "Speaking and debate", fr: "Prise de parole et débat" },
      items: [
        {
          when: "2023",
          en: "Founded the Debate Club of the Faculté des Sciences in Tétouan.",
          fr: "Fondation du Club de débat de la Faculté des Sciences de Tétouan.",
        },
        {
          when: "",
          en: "1st Prize, Public Speaking, Burkinabè community.",
          fr: "1er Prix, Prise de parole, Communauté burkinabè.",
        },
      ],
    },
    {
      title: { en: "Community and IT leadership", fr: "Engagement associatif et responsabilité informatique" },
      items: [
        {
          when: "2021 to 2023",
          whenFr: "2021 à 2023",
          en: "IT lead of the Burkinabè community, more than 200 members.",
          fr: "Responsable informatique de la Communauté burkinabè, plus de 200 membres.",
        },
      ],
    },
    {
      title: { en: "Teaching through writing", fr: "Pédagogie par l'écriture" },
      items: [
        {
          when: "2026",
          en: "Articles on Medium that rebuild models from their equations, such as a GPT and a cyber-threat Transformer, with code released alongside. My Medium articles have reached more than 10,000 readers in total.",
          fr: "Articles sur Medium qui reconstruisent des modèles à partir de leurs équations, comme un GPT et un Transformer pour la cyber threat intelligence, avec le code publié en parallèle. Mes articles Medium ont réuni plus de 10 000 lecteurs au total.",
        },
      ],
    },
  ],
};

const skills = [
  {
    label: { en: "Machine learning", fr: "Apprentissage automatique" },
    text: { en: "PyTorch (from scratch and applied), Transformers, GNNs, RNN and LSTM, reinforcement learning (PPO, DQN, actor-critic, GAE), scikit-learn, random forests, gradient boosting, SVM.", fr: "PyTorch (depuis zéro et appliqué), Transformers, GNN, RNN et LSTM, apprentissage par renforcement (PPO, DQN, acteur-critique, GAE), scikit-learn, forêts aléatoires, gradient boosting, SVM." },
  },
  {
    label: { en: "Sequence models and LLMs", fr: "Modèles de séquences et LLM" },
    text: { en: "Attention, autoregressive generation, in-context learning, trajectory modelling, Hugging Face, RAG, embeddings, knowledge graphs (Neo4j, Cypher).", fr: "Attention, génération autorégressive, apprentissage en contexte, modélisation de trajectoires, Hugging Face, RAG, embeddings, graphes de connaissances (Neo4j, Cypher)." },
  },
  {
    label: { en: "Interpretable and responsible AI", fr: "IA interprétable et responsable" },
    text: { en: "SHAP, DeepRED, explanation fidelity and stability, red-teaming, negative controls.", fr: "SHAP, DeepRED, fidélité et stabilité des explications, red-teaming, contrôles négatifs." },
  },
  {
    label: { en: "Optimisation", fr: "Optimisation" },
    text: { en: "Constrained, combinatorial and multi-objective optimisation, Pareto analysis, constraint hierarchies.", fr: "Optimisation sous contraintes, combinatoire et multi-objectif, analyse de Pareto, hiérarchies de contraintes." },
  },
  {
    label: { en: "Modelling and simulation", fr: "Modélisation et simulation" },
    text: { en: "Agent-based modelling (GAMA, NetLogo, Mesa), sensitivity analysis, surrogate models, stochastic dynamical systems.", fr: "Modélisation à base d'agents (GAMA, NetLogo, Mesa), analyse de sensibilité, modèles substituts, systèmes dynamiques stochastiques." },
  },
  {
    label: { en: "Geospatial and remote sensing", fr: "Géospatial et télédétection" },
    text: { en: "GIS, multispectral and SAR imagery, vegetation indices, multi-sensor fusion.", fr: "SIG, imagerie multispectrale et radar, indices de végétation, fusion multi-capteurs." },
  },
  {
    label: { en: "Software engineering", fr: "Ingénierie logicielle" },
    text: { en: "Modular tested code (pytest), Git, Docker, MLflow, FastAPI and Flask, YAML, CI/CD, cluster computing.", fr: "Code modulaire testé (pytest), Git, Docker, MLflow, FastAPI et Flask, YAML, CI/CD, calcul sur cluster." },
  },
  {
    label: { en: "Mathematics", fr: "Mathématiques" },
    text: { en: "Probability, statistics, linear algebra, optimisation, stochastic processes, graph theory, numerical analysis (MATLAB).", fr: "Probabilités, statistique, algèbre linéaire, optimisation, processus stochastiques, théorie des graphes, analyse numérique (MATLAB)." },
  },
  {
    label: { en: "Programming", fr: "Programmation" },
    text: { en: "Python (expert), C++ (intermediate), R, Java (basics), SQL, Cypher, JavaScript.", fr: "Python (expert), C++ (intermédiaire), R, Java (notions), SQL, Cypher, JavaScript." },
  },
];

const languages = {
  en: "French: native (C2). English: professional (B2+), scientific writing. German and Dutch: beginner.",
  fr: "Français : langue maternelle (C2). Anglais : professionnel (B2+), écriture scientifique. Allemand et néerlandais : débutant.",
};

// ---------- Research map: themes, project links, extras ----------

const themes = [
  {
    key: "trust",
    x: 118, y: 170,
    short: { en: "Interpretable and trustworthy ML", fr: "ML interprétable et fiable" },
    desc: {
      en: "When can a model, or its explanation, be trusted? Rule extraction, explanation stability, negative controls, red-teaming.",
      fr: "Quand peut-on faire confiance à un modèle, ou à son explication ? Extraction de règles, stabilité des explications, contrôles négatifs, red-teaming.",
    },
  },
  {
    key: "rl",
    x: 262, y: 86,
    short: { en: "RL and multi-agent systems", fr: "RL et systèmes multi-agents" },
    desc: {
      en: "Sequential decisions under constraints, from a PPO agent built from scratch to agents that coordinate without a central controller.",
      fr: "Décisions séquentielles sous contraintes, d'un agent PPO écrit depuis zéro à des agents qui se coordonnent sans contrôleur central.",
    },
  },
  {
    key: "gnn",
    x: 470, y: 86,
    short: { en: "Graph neural networks", fr: "Réseaux de neurones sur graphes" },
    desc: {
      en: "Structured local representations: agents that reason over their neighbourhood in a graph.",
      fr: "Représentations locales structurées : des agents qui raisonnent sur leur voisinage dans un graphe.",
    },
  },
  {
    key: "seq",
    x: 604, y: 180,
    short: { en: "Sequence models and LLMs", fr: "Modèles de séquences et LLM" },
    desc: {
      en: "Models implemented from their equations: a GPT with knowledge-graph RAG and a Transformer that anticipates attack chains.",
      fr: "Des modèles implémentés à partir de leurs équations : un GPT avec RAG sur graphe de connaissances et un Transformer qui anticipe des chaînes d'attaques.",
    },
  },
  {
    key: "rs",
    x: 360, y: 330,
    short: { en: "Multi-sensor remote sensing", fr: "Télédétection multi-capteurs" },
    desc: {
      en: "Sentinel-1 radar, Sentinel-2 optical and weather data for early disease detection, with an honest evaluation.",
      fr: "Radar Sentinel-1, optique Sentinel-2 et météo pour la détection précoce de maladies, avec une évaluation honnête.",
    },
  },
];

const projectMeta = {
  "thesis-fusarium": { themes: ["rs", "trust"], short: { en: "Fusarium thesis", fr: "Mémoire fusariose" } },
  "oran-rl": { themes: ["rl"], short: { en: "O-RAN RL", fr: "RL pour O-RAN" } },
  "gnn-agents": { themes: ["rl", "gnn"], short: { en: "GNN agents", fr: "Agents GNN" } },
  "gpt-scratch": { themes: ["seq"], short: { en: "GPT from scratch", fr: "GPT depuis zéro" } },
  "deepred-shap": { themes: ["trust"], short: { en: "DeepRED + SHAP", fr: "DeepRED + SHAP" } },
  "attack-chains": { themes: ["seq"], short: { en: "ATT&CK Transformer", fr: "Transformer ATT&CK" } },
  "zindi-redteam": { themes: ["trust", "seq"], short: { en: "LLM red-teaming", fr: "Red-teaming de LLM" } },
};
for (const p of allProjects) Object.assign(p, projectMeta[p.id]);

const map = {
  title: { en: "Research map", fr: "Carte de recherche" },
  intro: {
    en: "My projects and the questions that connect them. Hover or focus a node to see its links, click to open the projects.",
    fr: "Mes projets et les questions qui les relient. Survolez ou activez un nœud pour voir ses liens, cliquez pour ouvrir les projets.",
  },
  hint: {
    en: "Big nodes are research themes, small nodes are projects.",
    fr: "Les grands nœuds sont des thèmes de recherche, les petits des projets.",
  },
  themeCount: { en: "{n} projects", fr: "{n} projets" },
  ariaLabel: { en: "Graph of research themes and projects", fr: "Graphe des thèmes de recherche et des projets" },
};

const stats = [
  { n: 3, label: { en: "preprints on HAL", fr: "préprints sur HAL" } },
  { n: 10000, suffix: "+", label: { en: "readers on Medium", fr: "lecteurs sur Medium" } },
  { n: "projects", label: { en: "research projects", fr: "projets de recherche" } },
  { n: 40, suffix: "M", label: { en: "tokens, a GPT trained from scratch", fr: "tokens, un GPT entraîné depuis zéro" } },
];

const negatives = {
  title: { en: "Negative results", fr: "Résultats négatifs" },
  intro: {
    en: "The results that did not go my way taught me the most, so I keep them in plain sight.",
    fr: "Les résultats qui n'ont pas tourné comme prévu m'ont le plus appris, alors je les garde bien en vue.",
  },
  lessonLabel: { en: "Lesson", fr: "Leçon" },
  items: [
    {
      title: { en: "A control run that should have failed did not", fr: "Un contrôle qui aurait dû échouer n'a pas échoué" },
      what: {
        en: "Retrained on the pre-sowing window, with no maize in the ground, the model still separated infected from healthy plots (AUC 0.78).",
        fr: "Réentraîné sur la fenêtre avant semis, sans maïs en terre, le modèle séparait encore les parcelles infectées des saines (AUC 0,78).",
      },
      lesson: {
        en: "Healthy and infected plots sat in different blocks, so the model was recognising the block. Experimental design limits a result more than the algorithm does.",
        fr: "Parcelles saines et infectées étaient dans des blocs différents : le modèle reconnaissait le bloc. Le plan d'expérience borne un résultat plus que l'algorithme.",
      },
    },
    {
      title: { en: "Position alone almost matched the satellite bands", fr: "La seule position égalait presque les bandes satellites" },
      what: {
        en: "Latitude and longitude alone, with no imagery, reached AUC 0.79 against 0.97 for all 90 variables in the first experiment.",
        fr: "La latitude et la longitude seules, sans aucune image, atteignaient une AUC de 0,79 contre 0,97 pour les 90 variables dans la première expérience.",
      },
      lesson: {
        en: "Always test a trivial baseline that cannot possibly see the phenomenon.",
        fr: "Toujours tester une référence triviale qui ne peut pas voir le phénomène.",
      },
    },
    {
      title: { en: "More prompts did not mean more harm found", fr: "Plus de prompts n'a pas voulu dire plus de failles trouvées" },
      what: {
        en: "Red-teaming four African-language models, only two produced genuinely harmful outputs.",
        fr: "En red-teamant quatre modèles en langues africaines, seuls deux ont produit de vraies sorties nuisibles.",
      },
      lesson: {
        en: "Quality and reproducibility of each attack mattered more than volume.",
        fr: "La qualité et la reproductibilité de chaque attaque comptaient plus que le volume.",
      },
    },
  ],
};

const palette = {
  placeholder: { en: "Search pages, projects, links", fr: "Chercher pages, projets, liens" },
  open: { en: "Search", fr: "Rechercher" },
  none: { en: "No result", fr: "Aucun résultat" },
  hint: { en: "Up and down to move, Enter to open, Esc to close", fr: "Haut et bas pour naviguer, Entrée pour ouvrir, Échap pour fermer" },
  groups: {
    page: { en: "Pages", fr: "Pages" },
    section: { en: "Sections", fr: "Sections" },
    project: { en: "Projects", fr: "Projets" },
    link: { en: "Links", fr: "Liens" },
    action: { en: "Actions", fr: "Actions" },
  },
  actionTheme: { en: "Toggle dark mode", fr: "Basculer le mode sombre" },
  actionLang: { en: "Read in French", fr: "Lire en anglais" },
  label: { en: "Command palette", fr: "Palette de commandes" },
};

const photo = {
  alt: {
    en: "Portrait of Wendemi Brice Roméo Zemba",
    fr: "Portrait de Wendemi Brice Roméo Zemba",
  },
};

const extraUi = {
  updated: { en: "Last updated", fr: "Dernière mise à jour" },
  filterAll: { en: "All", fr: "Tous" },
  filterLabel: { en: "Filter projects by theme", fr: "Filtrer les projets par thème" },
  statsLabel: { en: "Key numbers", fr: "Chiffres clés" },
  noMatch: { en: "No project matches this filter.", fr: "Aucun projet pour ce filtre." },
};

module.exports = {
  ORIGIN, person, ui, meta, hero, news, about, education, experience,
  projects, allProjects, awards, certifications, posts, preprints,
  teaching, skills, languages,
  themes, map, stats, negatives, palette, photo, extraUi,
};
