export type ServiceData = {
  id: string;
  icon: string;
  color: string;
  colorDark: string;
  bgLight: string;
  bgGradient: string;
  num: string;

  // copy FR
  fr: {
    title: string;
    tagline: string;
    heroSubtitle: string;
    desc: string;
    painTitle: string;
    pains: { icon: string; title: string; desc: string }[];
    solutionTitle: string;
    solutionSubtitle: string;
    features: { icon: string; title: string; desc: string }[];
    processTitle: string;
    steps: { num: string; title: string; desc: string }[];
    resultsTitle: string;
    results: { metric: string; label: string }[];
    testimonial: { text: string; author: string; role: string };
    faqTitle: string;
    faqs: { q: string; a: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
  };

  // copy EN
  en: {
    title: string;
    tagline: string;
    heroSubtitle: string;
    desc: string;
    painTitle: string;
    pains: { icon: string; title: string; desc: string }[];
    solutionTitle: string;
    solutionSubtitle: string;
    features: { icon: string; title: string; desc: string }[];
    processTitle: string;
    steps: { num: string; title: string; desc: string }[];
    resultsTitle: string;
    results: { metric: string; label: string }[];
    testimonial: { text: string; author: string; role: string };
    faqTitle: string;
    faqs: { q: string; a: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
  };
};

export const SERVICES_DATA: ServiceData[] = [
  /* ──────────────────────────────────────
     1. SaaS / Web / App
  ────────────────────────────────────── */
  {
    id: 'saas-web-app',
    icon: 'fa-code',
    color: '#FF4D29',
    colorDark: '#cc3d21',
    bgLight: '#FFF4F1',
    bgGradient: 'from-[#FFF4F1] to-[#FFF8F3]',
    num: '01',
    fr: {
      title: 'SaaS, Sites Web & Applications',
      tagline: 'De l\'idée au produit live en quelques semaines.',
      heroSubtitle: 'Nous concevons et développons des produits digitaux sur‑mesure qui génèrent de la croissance — sans dette technique, sans tunnel d\'effet.',
      desc: 'Chaque entreprise mérite un outil digital à son image. Nous construisons des plateformes web, SaaS et applications qui s\'adaptent à vos processus métier — pas l\'inverse.',
      painTitle: 'Vous reconnaissez-vous ?',
      pains: [
        { icon: 'fa-clock', title: 'Délais non tenus', desc: 'Votre précédente agence a livré 3 mois en retard, sans explication.' },
        { icon: 'fa-euro-sign', title: 'Budget explosé', desc: 'Les "imprévus techniques" se multiplient et la facture finale est le double du devis.' },
        { icon: 'fa-puzzle-piece', title: 'Code spaghetti', desc: 'Votre app est si difficile à maintenir que chaque nouvelle feature coûte une fortune.' },
        { icon: 'fa-user-slash', title: 'Aucune pédagogie', desc: 'L\'agence parle en jargon, vous ne comprenez rien à l\'avancement de votre projet.' },
      ],
      solutionTitle: 'Notre approche change tout',
      solutionSubtitle: 'Sprints de 2 semaines. Validation continue. Zéro surprise.',
      features: [
        { icon: 'fa-pencil-ruler', title: 'Design UI/UX & Prototype Figma', desc: 'Vous voyez et validez chaque écran avant qu\'une seule ligne de code soit écrite. Pas de mauvaises surprises.' },
        { icon: 'fa-bolt', title: 'Next.js / React ultra-performant', desc: 'Stack moderne, rapide, scalable. Votre produit charge en moins d\'une seconde et tient la charge.' },
        { icon: 'fa-server', title: 'Backend & API robuste', desc: 'Architecture solide, sécurisée, documentée. Votre produit peut évoluer sans tout reconstruire.' },
        { icon: 'fa-shield-alt', title: 'Auth, paiements & sécurité', desc: 'Stripe, Auth0, Supabase — intégrés proprement dès le départ pour un produit production-ready.' },
        { icon: 'fa-cloud-upload-alt', title: 'Déploiement cloud & CI/CD', desc: 'Pipeline automatisé. Chaque mise à jour est testée et déployée sans interruption de service.' },
        { icon: 'fa-chart-line', title: 'SEO technique & Core Web Vitals', desc: 'Votre produit est visible dès le lancement. Score Lighthouse > 90 garanti.' },
      ],
      processTitle: 'Comment ça se passe ?',
      steps: [
        { num: '01', title: 'Audit & Cadrage (Semaine 1)', desc: 'On passe 1h ensemble pour comprendre votre business, vos utilisateurs et vos objectifs. On sort avec un cahier des charges précis et un budget fixe.' },
        { num: '02', title: 'Design & Prototype (Semaines 2–3)', desc: 'Nos designers créent les maquettes Figma. Vous validez chaque page avant de passer au code. Retouches illimitées à ce stade.' },
        { num: '03', title: 'Développement en sprints (Semaines 4–8)', desc: 'Livraisons toutes les 2 semaines. Vous testez, vous donnez du feedback, on itère. Vous voyez votre produit prendre forme en temps réel.' },
        { num: '04', title: 'Tests, lancement & passation (Semaine 8+)', desc: 'Tests de charge, audit sécurité, mise en production. Formation de votre équipe et documentation complète fournie.' },
      ],
      resultsTitle: 'Résultats typiques de nos clients',
      results: [
        { metric: '6 sem.', label: 'MVP fonctionnel livré' },
        { metric: '>90', label: 'Score Lighthouse garanti' },
        { metric: '-60%', label: 'Coût vs agence classique' },
        { metric: '0€', label: 'Frais cachés' },
      ],
      testimonial: {
        text: '"On avait déjà dépensé 40k€ avec une agence qui n\'avait rien livré. Diez a sorti notre MVP en 7 semaines, dans le budget. C\'est notre partenaire tech depuis."',
        author: 'Alexandre M.',
        role: 'CEO, Startup FinTech Paris',
      },
      faqTitle: 'Questions fréquentes',
      faqs: [
        { q: 'Quelle est la durée et le coût d\'un projet type ?', a: 'Un MVP web est livrable en 6–8 semaines à partir de 8 000€. Un SaaS complet avec backend avancé se situe entre 15 000€ et 40 000€ selon la complexité. Nous travaillons toujours avec un devis fixe, jamais en régie.' },
        { q: 'Puis-je avoir un suivi en temps réel ?', a: 'Oui. Vous avez accès à notre outil de suivi de projet (Notion) mis à jour en continu. Une réunion de sprint toutes les 2 semaines, et un canal Slack dédié pour les échanges quotidiens.' },
        { q: 'Que se passe-t-il après la livraison ?', a: 'Nous proposons des forfaits maintenance mensuels (à partir de 500€/mois) incluant hébergement, mises à jour de sécurité, corrections de bugs et petites évolutions.' },
        { q: 'Je n\'ai qu\'une idée, pas de cahier des charges. Vous pouvez quand même m\'aider ?', a: 'C\'est exactement notre point de départ le plus fréquent. Nous structurons votre idée lors de l\'audit initial et créons le cahier des charges avec vous.' },
      ],
      ctaTitle: 'Votre produit mérite mieux qu\'une promesse.',
      ctaSubtitle: 'Audit gratuit en 48h · Devis fixe · Délais garantis par contrat',
      ctaBtn: 'Démarrer mon projet',
    },
    en: {
      title: 'SaaS, Websites & Applications',
      tagline: 'From idea to live product in a few weeks.',
      heroSubtitle: 'We design and develop custom digital products that drive growth — no technical debt, no tunnel effect.',
      desc: 'Every business deserves a digital tool built for its own processes. We build web platforms, SaaS and applications that adapt to your business — not the other way around.',
      painTitle: 'Does this sound familiar?',
      pains: [
        { icon: 'fa-clock', title: 'Missed deadlines', desc: 'Your previous agency delivered 3 months late, with no explanation.' },
        { icon: 'fa-euro-sign', title: 'Budget overruns', desc: '"Technical surprises" keep piling up and the final invoice is double the quote.' },
        { icon: 'fa-puzzle-piece', title: 'Spaghetti code', desc: 'Your app is so hard to maintain that every new feature costs a fortune.' },
        { icon: 'fa-user-slash', title: 'No transparency', desc: 'The agency speaks in jargon and you have no idea what\'s actually happening.' },
      ],
      solutionTitle: 'Our approach changes everything',
      solutionSubtitle: '2-week sprints. Continuous validation. Zero surprises.',
      features: [
        { icon: 'fa-pencil-ruler', title: 'UI/UX Design & Figma Prototype', desc: 'You see and approve every screen before a single line of code is written. No bad surprises.' },
        { icon: 'fa-bolt', title: 'High-performance Next.js / React', desc: 'Modern, fast, scalable stack. Your product loads in under a second and handles the load.' },
        { icon: 'fa-server', title: 'Robust backend & API', desc: 'Solid, secure, documented architecture. Your product can evolve without rebuilding everything.' },
        { icon: 'fa-shield-alt', title: 'Auth, payments & security', desc: 'Stripe, Auth0, Supabase — properly integrated from day one for a production-ready product.' },
        { icon: 'fa-cloud-upload-alt', title: 'Cloud deployment & CI/CD', desc: 'Automated pipeline. Every update is tested and deployed without service interruption.' },
        { icon: 'fa-chart-line', title: 'Technical SEO & Core Web Vitals', desc: 'Your product is visible from launch. Lighthouse score > 90 guaranteed.' },
      ],
      processTitle: 'How does it work?',
      steps: [
        { num: '01', title: 'Audit & Scoping (Week 1)', desc: 'We spend 1h together understanding your business, your users and your goals. We leave with a precise brief and a fixed budget.' },
        { num: '02', title: 'Design & Prototype (Weeks 2–3)', desc: 'Our designers create Figma mockups. You approve each page before we write a line of code. Unlimited revisions at this stage.' },
        { num: '03', title: 'Development in sprints (Weeks 4–8)', desc: 'Deliveries every 2 weeks. You test, give feedback, we iterate. You see your product take shape in real time.' },
        { num: '04', title: 'Tests, launch & handover (Week 8+)', desc: 'Load tests, security audit, production launch. Team training and complete documentation provided.' },
      ],
      resultsTitle: 'Typical results from our clients',
      results: [
        { metric: '6 wks', label: 'Functional MVP delivered' },
        { metric: '>90', label: 'Lighthouse score guaranteed' },
        { metric: '-60%', label: 'Cost vs traditional agency' },
        { metric: '$0', label: 'Hidden fees' },
      ],
      testimonial: {
        text: '"We had already spent $40k with an agency that delivered nothing. Diez shipped our MVP in 7 weeks, on budget. They\'ve been our tech partner ever since."',
        author: 'Alexandre M.',
        role: 'CEO, FinTech Startup Paris',
      },
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'How long does a project take and what does it cost?', a: 'A web MVP is deliverable in 6–8 weeks starting from $8,000. A full SaaS with advanced backend ranges from $15,000 to $40,000 depending on complexity. We always work with a fixed quote, never on a time-and-materials basis.' },
        { q: 'Can I follow the project in real time?', a: 'Yes. You have access to our project tracking tool (Notion) updated continuously. A sprint meeting every 2 weeks, and a dedicated Slack channel for daily exchanges.' },
        { q: 'What happens after delivery?', a: 'We offer monthly maintenance packages (from $500/month) including hosting, security updates, bug fixes and small feature additions.' },
        { q: 'I only have an idea, no brief. Can you still help?', a: 'That\'s actually our most common starting point. We structure your idea during the initial audit and create the brief together with you.' },
      ],
      ctaTitle: 'Your product deserves better than a promise.',
      ctaSubtitle: 'Free audit in 48h · Fixed quote · Deadlines guaranteed by contract',
      ctaBtn: 'Start my project',
    },
  },

  /* ──────────────────────────────────────
     2. LLM SEO
  ────────────────────────────────────── */
  {
    id: 'llm-seo',
    icon: 'fa-brain',
    color: '#7C3AED',
    colorDark: '#5b21b6',
    bgLight: '#F5F3FF',
    bgGradient: 'from-[#F5F3FF] to-[#FAF9FF]',
    num: '02',
    fr: {
      title: 'LLM SEO Optimisation',
      tagline: 'Soyez cité par ChatGPT, Perplexity & Google AI.',
      heroSubtitle: '70% des recherches Google intègrent déjà des réponses IA. Si vous n\'y apparaissez pas, vos concurrents le font à votre place.',
      desc: 'Le SEO a muté. Google AI Overviews, ChatGPT Search, Perplexity — ces outils répondent directement aux questions de vos clients sans qu\'ils cliquent sur votre site. Sauf si vous êtes la source citée.',
      painTitle: 'Votre SEO classique devient obsolète',
      pains: [
        { icon: 'fa-chart-line', title: 'Trafic en chute libre', desc: 'Google AI Overviews répond sans que l\'utilisateur clique. Votre trafic organique baisse alors que votre positionnement reste le même.' },
        { icon: 'fa-robot', title: 'Invisible dans l\'IA', desc: 'ChatGPT, Perplexity et Gemini ne citent jamais votre marque dans leurs réponses, même sur vos sujets d\'expertise.' },
        { icon: 'fa-sitemap', title: 'Contenu non structuré', desc: 'Votre contenu existe mais n\'est pas structuré pour être compris et cité par les LLMs.' },
        { icon: 'fa-question-circle', title: 'Stratégie floue', desc: 'Vous entendez parler de GEO, AEO, LLM SEO mais ne savez pas par où commencer.' },
      ],
      solutionTitle: 'Devenez la source de référence',
      solutionSubtitle: 'Nos optimisations font de votre contenu la réponse que les IAs citent.',
      features: [
        { icon: 'fa-search', title: 'Audit SEO technique complet', desc: 'Crawl complet, analyse des Core Web Vitals, identification des opportunités et des blocages techniques.' },
        { icon: 'fa-layer-group', title: 'Topical Authority & clustering', desc: 'Nous structurons votre contenu en clusters sémantiques pour établir votre autorité sur vos sujets clés.' },
        { icon: 'fa-code', title: 'Schema.org & structured data', desc: 'Balisage JSON-LD avancé : FAQ, HowTo, Article, Organization — ce que les LLMs lisent en priorité.' },
        { icon: 'fa-google', title: 'Google AI Overviews optimization', desc: 'Contenus formatés pour apparaître dans les réponses directes de Google. Format question/réponse, concision, autorité.' },
        { icon: 'fa-comment-alt', title: 'Citation optimization', desc: 'Formats, tons, structures et contenus optimisés pour être cités par ChatGPT, Perplexity et Gemini.' },
        { icon: 'fa-chart-bar', title: 'Tracking & reporting mensuel', desc: 'Suivi de vos citations IA, positions Google, trafic organique et conversions. Rapport clair chaque mois.' },
      ],
      processTitle: 'Notre méthode en 4 phases',
      steps: [
        { num: '01', title: 'Audit & Analyse (Semaine 1–2)', desc: 'Audit technique complet, analyse concurrentielle, cartographie des opportunités IA sur votre secteur.' },
        { num: '02', title: 'Architecture sémantique (Semaine 3–4)', desc: 'Restructuration des silos de contenu, création du plan de clustering topique, optimisation du maillage interne.' },
        { num: '03', title: 'Production & optimisation (Semaine 5–8)', desc: 'Création ou réécriture des contenus clés, déploiement des structured data, optimisation des balises.' },
        { num: '04', title: 'Suivi & itération (Mois 2+)', desc: 'Monitoring des citations IA, ajustements continus, reporting mensuel et nouvelles opportunités identifiées.' },
      ],
      resultsTitle: 'Résultats constatés',
      results: [
        { metric: '+3x', label: 'Citations dans les IAs en 90j' },
        { metric: '+40%', label: 'Trafic organique en 6 mois' },
        { metric: '3x', label: 'Plus de Featured Snippets' },
        { metric: 'Top 3', label: 'Positionnements IA Overviews' },
      ],
      testimonial: {
        text: '"En 3 mois, ChatGPT cite notre blog comme référence dans notre secteur. Notre trafic organique a bondi de 47%. On avait essayé d\'autres agences SEO pendant 2 ans sans ce résultat."',
        author: 'Sarah L.',
        role: 'CMO, Plateforme RH SaaS',
      },
      faqTitle: 'Questions fréquentes',
      faqs: [
        { q: 'En quoi le LLM SEO est différent du SEO traditionnel ?', a: 'Le SEO traditionnel optimise pour les positions dans les SERPs Google. Le LLM SEO optimise pour que les IAs génératives (ChatGPT, Gemini, Perplexity) citent votre contenu dans leurs réponses. Les deux se complètent.' },
        { q: 'Combien de temps avant les premiers résultats visibles ?', a: 'Les optimisations techniques sont visibles sous 4–6 semaines dans Google Search Console. Les citations IA apparaissent généralement entre 6–10 semaines sur les contenus bien structurés.' },
        { q: 'Faut-il refaire tout mon contenu ?', a: 'Non. Nous auditons d\'abord ce qui existe et identifions les contenus à fort potentiel. Souvent, une restructuration et un balisage suffisent. Seuls les contenus stratégiques manquants sont créés.' },
        { q: 'Comment mesurez-vous les citations IA ?', a: 'Via des outils spécialisés (Perplexity API, tests manuels structurés, Brand Radar) complétés par Google Search Console et Analytics. Vous recevez un rapport mensuel détaillé.' },
      ],
      ctaTitle: 'Vos concurrents sont déjà dans les IAs.',
      ctaSubtitle: 'Audit SEO gratuit · Stratégie personnalisée · Résultats en 90 jours',
      ctaBtn: 'Obtenir mon audit SEO gratuit',
    },
    en: {
      title: 'LLM SEO Optimization',
      tagline: 'Get cited by ChatGPT, Perplexity & Google AI.',
      heroSubtitle: '70% of Google searches already include AI answers. If you don\'t appear there, your competitors are taking your spot.',
      desc: 'SEO has mutated. Google AI Overviews, ChatGPT Search, Perplexity — these tools answer your clients\' questions directly without them clicking on your site. Unless you\'re the cited source.',
      painTitle: 'Your classic SEO is becoming obsolete',
      pains: [
        { icon: 'fa-chart-line', title: 'Traffic in free fall', desc: 'Google AI Overviews answers without the user clicking. Your organic traffic drops even though your rankings stay the same.' },
        { icon: 'fa-robot', title: 'Invisible in AI', desc: 'ChatGPT, Perplexity and Gemini never cite your brand in their answers, even on your topics of expertise.' },
        { icon: 'fa-sitemap', title: 'Unstructured content', desc: 'Your content exists but isn\'t structured to be understood and cited by LLMs.' },
        { icon: 'fa-question-circle', title: 'Unclear strategy', desc: 'You\'ve heard of GEO, AEO, LLM SEO but don\'t know where to start.' },
      ],
      solutionTitle: 'Become the reference source',
      solutionSubtitle: 'Our optimizations make your content the answer AIs cite.',
      features: [
        { icon: 'fa-search', title: 'Full technical SEO audit', desc: 'Complete crawl, Core Web Vitals analysis, identification of opportunities and technical blockers.' },
        { icon: 'fa-layer-group', title: 'Topical Authority & clustering', desc: 'We structure your content into semantic clusters to establish your authority on your key topics.' },
        { icon: 'fa-code', title: 'Schema.org & structured data', desc: 'Advanced JSON-LD markup: FAQ, HowTo, Article, Organization — what LLMs read first.' },
        { icon: 'fa-google', title: 'Google AI Overviews optimization', desc: 'Content formatted to appear in Google\'s direct answers. Q&A format, conciseness, authority.' },
        { icon: 'fa-comment-alt', title: 'Citation optimization', desc: 'Formats, tones, structures and content optimized to be cited by ChatGPT, Perplexity and Gemini.' },
        { icon: 'fa-chart-bar', title: 'Monthly tracking & reporting', desc: 'AI citation tracking, Google positions, organic traffic and conversions. Clear report every month.' },
      ],
      processTitle: 'Our 4-phase method',
      steps: [
        { num: '01', title: 'Audit & Analysis (Week 1–2)', desc: 'Full technical audit, competitive analysis, mapping of AI opportunities in your sector.' },
        { num: '02', title: 'Semantic architecture (Week 3–4)', desc: 'Restructuring content silos, creating the topical clustering plan, optimizing internal linking.' },
        { num: '03', title: 'Production & optimization (Week 5–8)', desc: 'Creation or rewriting of key content, structured data deployment, tag optimization.' },
        { num: '04', title: 'Monitoring & iteration (Month 2+)', desc: 'AI citation monitoring, continuous adjustments, monthly reporting and new opportunities identified.' },
      ],
      resultsTitle: 'Observed results',
      results: [
        { metric: '+3x', label: 'AI citations in 90 days' },
        { metric: '+40%', label: 'Organic traffic in 6 months' },
        { metric: '3x', label: 'More Featured Snippets' },
        { metric: 'Top 3', label: 'AI Overviews rankings' },
      ],
      testimonial: {
        text: '"In 3 months, ChatGPT cites our blog as a reference in our industry. Our organic traffic jumped 47%. We had tried other SEO agencies for 2 years without this result."',
        author: 'Sarah L.',
        role: 'CMO, HR SaaS Platform',
      },
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'How is LLM SEO different from traditional SEO?', a: 'Traditional SEO optimizes for positions in Google SERPs. LLM SEO optimizes for generative AIs (ChatGPT, Gemini, Perplexity) to cite your content in their answers. Both complement each other.' },
        { q: 'How long before the first visible results?', a: 'Technical optimizations are visible within 4–6 weeks in Google Search Console. AI citations typically appear between 6–10 weeks for well-structured content.' },
        { q: 'Do I need to redo all my content?', a: 'No. We first audit what exists and identify high-potential content. Often, restructuring and tagging is enough. Only missing strategic content is created.' },
        { q: 'How do you measure AI citations?', a: 'Via specialized tools (Perplexity API, structured manual tests, Brand Radar) complemented by Google Search Console and Analytics. You receive a detailed monthly report.' },
      ],
      ctaTitle: 'Your competitors are already in the AIs.',
      ctaSubtitle: 'Free SEO audit · Personalized strategy · Results in 90 days',
      ctaBtn: 'Get my free SEO audit',
    },
  },

  /* ──────────────────────────────────────
     4. Agent Automation
  ────────────────────────────────────── */
  {
    id: 'agent-automation',
    icon: 'fa-robot',
    color: '#059669',
    colorDark: '#047857',
    bgLight: '#ECFDF5',
    bgGradient: 'from-[#ECFDF5] to-[#F0FDF4]',
    num: '03',
    fr: {
      title: 'Agent Automation Process',
      tagline: 'Vos tâches répétitives gérées par des agents IA 24h/24.',
      heroSubtitle: 'Chaque heure passée sur des tâches manuelles est une heure volée à votre croissance. Nos agents IA travaillent pendant que vous dormez.',
      desc: 'L\'automatisation n\'est plus réservée aux grandes entreprises. Nous construisons des agents IA sur‑mesure qui prennent en charge vos processus répétitifs — qualification de leads, réponses emails, reporting, gestion de données — sans erreur, sans pause.',
      painTitle: 'Le temps que vous perdez chaque semaine',
      pains: [
        { icon: 'fa-envelope', title: 'Emails manuels en série', desc: 'Vos commerciaux passent 3h/jour à copier-coller des emails de suivi au lieu de vendre.' },
        { icon: 'fa-table', title: 'Saisie de données interminable', desc: 'Transfert manuel entre CRM, Excel, ERP — source d\'erreurs et de perte de temps colossale.' },
        { icon: 'fa-chart-pie', title: 'Reporting chronophage', desc: 'Compilation de données depuis 5 sources différentes chaque lundi matin. 2h perdues, chaque semaine.' },
        { icon: 'fa-users', title: 'Leads non suivis', desc: 'Les leads entrants attendent des heures avant d\'être qualifiés. Vous perdez des deals à cause de la réactivité.' },
      ],
      solutionTitle: 'Des agents qui ne s\'arrêtent jamais',
      solutionSubtitle: 'Automatisez. Délégez. Scalez.',
      features: [
        { icon: 'fa-map-signs', title: 'Audit des processus & ROI', desc: 'On cartographie vos flux de travail et on identifie les automations au ROI le plus élevé. Vous savez exactement ce que ça va vous rapporter.' },
        { icon: 'fa-cogs', title: 'Agents IA autonomes', desc: 'Make, n8n, LangChain, GPT-4 — nos agents lisent, décident et agissent sans intervention humaine.' },
        { icon: 'fa-funnel-dollar', title: 'Automation CRM & pipeline', desc: 'Qualification automatique des leads, assignment, suivi et relances — votre pipeline commercial tourne tout seul.' },
        { icon: 'fa-envelope-open-text', title: 'Traitement emails & documents', desc: 'Lecture, catégorisation, réponse automatique aux emails. Extraction de données depuis les PDFs, factures, contrats.' },
        { icon: 'fa-plug', title: 'Intégrations API sur-mesure', desc: 'Slack, Notion, HubSpot, Salesforce, Stripe, Airtable — vos outils communiquent entre eux sans friction.' },
        { icon: 'fa-tachometer-alt', title: 'Dashboard de monitoring', desc: 'Tableau de bord en temps réel pour suivre l\'activité de vos agents, les erreurs et les métriques clés.' },
      ],
      processTitle: 'De l\'audit aux agents en 3 semaines',
      steps: [
        { num: '01', title: 'Cartographie des processus (Semaine 1)', desc: 'Workshop de 2h avec vos équipes pour documenter chaque processus manuel. Identification des quick wins et des automatisations à fort ROI.' },
        { num: '02', title: 'Architecture & prototypage (Semaine 2)', desc: 'Design de l\'architecture des agents, choix des outils, création des premiers workflows. Vous validez la logique avant l\'implémentation complète.' },
        { num: '03', title: 'Développement & tests (Semaine 3)', desc: 'Déploiement des agents en environnement de test. Tests intensifs avec vos données réelles. Ajustements jusqu\'à 0 erreur.' },
        { num: '04', title: 'Go-live & formation (Semaine 4)', desc: 'Mise en production, formation de vos équipes, documentation complète. Monitoring actif les 2 premières semaines.' },
      ],
      resultsTitle: 'L\'impact sur votre business',
      results: [
        { metric: '-80%', label: 'Temps sur tâches répétitives' },
        { metric: '24/7', label: 'Agents actifs en continu' },
        { metric: '3 mois', label: 'Retour sur investissement moyen' },
        { metric: '0', label: 'Erreurs de saisie manuelle' },
      ],
      testimonial: {
        text: '"Nos commerciaux passaient 40% de leur temps sur des tâches admin. Avec les agents Diez, ce temps est passé à 5%. On a fermé 2x plus de deals le trimestre suivant."',
        author: 'Thomas R.',
        role: 'Directeur Commercial, Scale-up B2B',
      },
      faqTitle: 'Questions fréquentes',
      faqs: [
        { q: 'Mes équipes doivent-elles être techniques pour utiliser les agents ?', a: 'Non. Nous concevons les agents pour qu\'ils soient transparents pour vos équipes. Elles voient les résultats (emails envoyés, données mises à jour, leads qualifiés) sans gérer la technique.' },
        { q: 'Que se passe-t-il si un agent fait une erreur ?', a: 'Chaque agent est conçu avec des mécanismes de fallback et d\'alerte. En cas d\'anomalie, l\'agent stoppe et vous notifie immédiatement. Aucune action irréversible sans validation humaine.' },
        { q: 'Quels outils utilisez-vous ?', a: 'Make (Integromat) et n8n pour les workflows, LangChain et OpenAI pour les agents LLM, Airtable/Supabase pour le stockage. Nous nous adaptons à vos outils existants.' },
        { q: 'Combien d\'agents peut-on déployer simultanément ?', a: 'Il n\'y a pas de limite technique. Nous commençons généralement par 2–3 agents sur les processus à plus fort ROI, puis nous expandons progressivement.' },
      ],
      ctaTitle: 'Chaque heure gagnée, c\'est de la croissance.',
      ctaSubtitle: 'Audit des processus gratuit · Agents déployés en 3 semaines · ROI garanti',
      ctaBtn: 'Automatiser mon business',
    },
    en: {
      title: 'Agent Automation Process',
      tagline: 'Your repetitive tasks handled by AI agents 24/7.',
      heroSubtitle: 'Every hour spent on manual tasks is an hour stolen from your growth. Our AI agents work while you sleep.',
      desc: 'Automation is no longer reserved for large companies. We build custom AI agents that take over your repetitive processes — lead qualification, email responses, reporting, data management — without errors, without breaks.',
      painTitle: 'The time you waste every week',
      pains: [
        { icon: 'fa-envelope', title: 'Serial manual emails', desc: 'Your salespeople spend 3h/day copy-pasting follow-up emails instead of selling.' },
        { icon: 'fa-table', title: 'Endless data entry', desc: 'Manual transfer between CRM, Excel, ERP — a massive source of errors and time waste.' },
        { icon: 'fa-chart-pie', title: 'Time-consuming reporting', desc: 'Compiling data from 5 different sources every Monday morning. 2 hours lost, every week.' },
        { icon: 'fa-users', title: 'Unfollowed leads', desc: 'Incoming leads wait hours before being qualified. You lose deals because of responsiveness.' },
      ],
      solutionTitle: 'Agents that never stop',
      solutionSubtitle: 'Automate. Delegate. Scale.',
      features: [
        { icon: 'fa-map-signs', title: 'Process audit & ROI', desc: 'We map your workflows and identify the automations with the highest ROI. You know exactly what it will bring you.' },
        { icon: 'fa-cogs', title: 'Autonomous AI agents', desc: 'Make, n8n, LangChain, GPT-4 — our agents read, decide and act without human intervention.' },
        { icon: 'fa-funnel-dollar', title: 'CRM & pipeline automation', desc: 'Automatic lead qualification, assignment, follow-up and reminders — your sales pipeline runs on its own.' },
        { icon: 'fa-envelope-open-text', title: 'Email & document processing', desc: 'Reading, categorizing, automatic email replies. Data extraction from PDFs, invoices, contracts.' },
        { icon: 'fa-plug', title: 'Custom API integrations', desc: 'Slack, Notion, HubSpot, Salesforce, Stripe, Airtable — your tools communicate without friction.' },
        { icon: 'fa-tachometer-alt', title: 'Monitoring dashboard', desc: 'Real-time dashboard to track your agents\' activity, errors and key metrics.' },
      ],
      processTitle: 'From audit to agents in 3 weeks',
      steps: [
        { num: '01', title: 'Process mapping (Week 1)', desc: '2h workshop with your teams to document every manual process. Identification of quick wins and high-ROI automations.' },
        { num: '02', title: 'Architecture & prototyping (Week 2)', desc: 'Agent architecture design, tool selection, creation of first workflows. You validate the logic before full implementation.' },
        { num: '03', title: 'Development & testing (Week 3)', desc: 'Agent deployment in test environment. Intensive tests with your real data. Adjustments until 0 errors.' },
        { num: '04', title: 'Go-live & training (Week 4)', desc: 'Production launch, team training, complete documentation. Active monitoring for the first 2 weeks.' },
      ],
      resultsTitle: 'The impact on your business',
      results: [
        { metric: '-80%', label: 'Time on repetitive tasks' },
        { metric: '24/7', label: 'Continuously active agents' },
        { metric: '3 months', label: 'Average return on investment' },
        { metric: '0', label: 'Manual data entry errors' },
      ],
      testimonial: {
        text: '"Our salespeople were spending 40% of their time on admin tasks. With Diez agents, that dropped to 5%. We closed 2x more deals the following quarter."',
        author: 'Thomas R.',
        role: 'Sales Director, B2B Scale-up',
      },
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'Do my teams need to be technical to use the agents?', a: 'No. We design agents to be transparent for your teams. They see the results (emails sent, data updated, leads qualified) without managing the tech.' },
        { q: 'What happens if an agent makes a mistake?', a: 'Every agent is designed with fallback and alert mechanisms. In case of an anomaly, the agent stops and notifies you immediately. No irreversible action without human validation.' },
        { q: 'What tools do you use?', a: 'Make (Integromat) and n8n for workflows, LangChain and OpenAI for LLM agents, Airtable/Supabase for storage. We adapt to your existing tools.' },
        { q: 'How many agents can be deployed simultaneously?', a: 'There is no technical limit. We generally start with 2–3 agents on the highest-ROI processes, then expand progressively.' },
      ],
      ctaTitle: 'Every hour gained is growth.',
      ctaSubtitle: 'Free process audit · Agents deployed in 3 weeks · Guaranteed ROI',
      ctaBtn: 'Automate my business',
    },
  },
];
