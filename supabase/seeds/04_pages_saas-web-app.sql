-- ============================================================
-- Seed: Pages PSEO ville × service "saas-web-app"
-- Exécuter dans Supabase SQL Editor (4ème)
-- ============================================================

INSERT INTO pseo_pages (city_id, service_slug, sector_id, title_fr, title_en, meta_title_fr, meta_title_en, meta_description_fr, meta_description_en, content_fr, content_en, faq_fr, faq_en, published) VALUES

-- Casablanca × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'casablanca'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Casablanca',
 'Website & SaaS Development in Casablanca',
 'Création de Sites Web & SaaS à Casablanca | Diez Agency',
 'Website & SaaS Development in Casablanca | Diez Agency',
 'Développement de sites web et applications SaaS à Casablanca. Next.js, React, design UI/UX moderne. Score Lighthouse > 90 garanti. Livraison en 6-8 semaines.',
 'Website and SaaS application development in Casablanca. Next.js, React, modern UI/UX design. Lighthouse score > 90 guaranteed. Delivery in 6-8 weeks.',
 'Casablanca concentre la majorité des entreprises tech du Maroc, et la compétition digitale y est féroce. Pour se démarquer, il ne suffit pas d''avoir un site web — il faut un site qui performe, qui convertit, et qui évolue avec votre business.

Chez Diez Agency, nous concevons des sites web et des applications SaaS sur-mesure avec les technologies les plus modernes : Next.js, React, Tailwind CSS. Chaque projet bénéficie d''un design UI/UX soigné, d''un score Lighthouse supérieur à 90, et d''une architecture pensée pour scaler.

Du MVP en 6 semaines au produit SaaS complet, nous accompagnons les startups et entreprises casablancaises à chaque étape de leur croissance digitale.',
 'Casablanca is home to the majority of Morocco''s tech companies, and digital competition is fierce. To stand out, having a website isn''t enough — you need a site that performs, converts, and evolves with your business.

At Diez Agency, we design custom websites and SaaS applications with the most modern technologies: Next.js, React, Tailwind CSS. Every project benefits from polished UI/UX design, a Lighthouse score above 90, and an architecture designed to scale.

From a 6-week MVP to a complete SaaS product, we support Casablanca startups and businesses at every stage of their digital growth.',
 '[{"question":"Quelles technologies utilisez-vous pour les sites web à Casablanca ?","answer":"Nous utilisons Next.js, React et Tailwind CSS — les mêmes technologies que les meilleures startups mondiales. Cela garantit performance, SEO natif et maintenabilité à long terme."},{"question":"Combien coûte un site web professionnel à Casablanca ?","answer":"À partir de 8 000€ pour un site vitrine, 15 000€+ pour une application SaaS. Devis fixe et transparent après audit gratuit."},{"question":"Livrez-vous vraiment un MVP en 6-8 semaines ?","answer":"Oui, c''est garanti par contrat. Nous travaillons en sprints de 2 semaines avec démos régulières pour que vous voyiez l''avancement en temps réel."}]',
 '[{"question":"What technologies do you use for websites in Casablanca?","answer":"We use Next.js, React, and Tailwind CSS — the same technologies used by the world''s best startups. This ensures performance, native SEO, and long-term maintainability."},{"question":"How much does a professional website cost in Casablanca?","answer":"Starting from €8,000 for a showcase site, €15,000+ for a SaaS application. Fixed and transparent quote after free audit."},{"question":"Do you really deliver an MVP in 6-8 weeks?","answer":"Yes, it''s guaranteed by contract. We work in 2-week sprints with regular demos so you see progress in real time."}]',
 true),

-- Rabat × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'rabat'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Rabat',
 'Website & SaaS Development in Rabat',
 'Création de Sites Web & SaaS à Rabat | Diez Agency',
 'Website & SaaS Development in Rabat | Diez Agency',
 'Développement de sites web et SaaS à Rabat. Sites institutionnels, applications métier, portails digitaux. Technologies modernes, délais garantis.',
 'Website and SaaS development in Rabat. Institutional sites, business applications, digital portals. Modern technologies, guaranteed deadlines.',
 'Rabat, avec ses institutions, ses startups du Technopolis et ses entreprises de services, a besoin de sites web qui allient professionnalisme et performance technique.

Nous développons des sites institutionnels pour les organisations, des applications métier pour les entreprises en croissance, et des plateformes SaaS pour les startups de la capitale. Chaque projet est livré avec un code propre, un design moderne et un SEO technique irréprochable.

Stack technique : Next.js 15, React, TypeScript, Supabase, Tailwind CSS. Score Lighthouse > 90 garanti.',
 'Rabat, with its institutions, Technopolis startups, and service companies, needs websites that combine professionalism with technical performance.

We develop institutional sites for organizations, business applications for growing companies, and SaaS platforms for the capital''s startups. Every project is delivered with clean code, modern design, and flawless technical SEO.

Tech stack: Next.js 15, React, TypeScript, Supabase, Tailwind CSS. Lighthouse score > 90 guaranteed.',
 '[{"question":"Créez-vous des sites institutionnels à Rabat ?","answer":"Oui, nous avons une expertise forte sur les sites institutionnels : design sobre et professionnel, accessibilité, sécurité renforcée et conformité aux standards."},{"question":"Pouvez-vous développer un portail interne pour une entreprise à Rabat ?","answer":"Absolument. Nous concevons des applications métier sur-mesure : portails RH, dashboards analytics, CRM internes. Technologies modernes, maintenance facilitée."},{"question":"Quel est l''avantage de Next.js par rapport à WordPress ?","answer":"Next.js offre des performances 3 à 5 fois supérieures, un SEO natif optimal, une sécurité renforcée et une scalabilité illimitée. WordPress a ses limites — Next.js est fait pour durer."}]',
 '[{"question":"Do you create institutional websites in Rabat?","answer":"Yes, we have strong expertise in institutional sites: clean and professional design, accessibility, enhanced security, and standards compliance."},{"question":"Can you develop an internal portal for a Rabat company?","answer":"Absolutely. We design custom business applications: HR portals, analytics dashboards, internal CRMs. Modern technologies, easy maintenance."},{"question":"What''s the advantage of Next.js over WordPress?","answer":"Next.js offers 3-5x better performance, native optimal SEO, enhanced security, and unlimited scalability. WordPress has its limits — Next.js is built to last."}]',
 true),

-- Marrakech × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'marrakech'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Marrakech',
 'Website & SaaS Development in Marrakech',
 'Création de Sites Web & SaaS à Marrakech | Diez Agency',
 'Website & SaaS Development in Marrakech | Diez Agency',
 'Création de sites web à Marrakech : réservation hôtels, e-commerce artisanat, sites vitrines tourisme. Design premium, SEO local optimisé.',
 'Website creation in Marrakech: hotel booking, artisan e-commerce, tourism showcase sites. Premium design, optimized local SEO.',
 'À Marrakech, votre site web est votre première impression — et dans une ville qui vit du tourisme et de l''image, cette impression doit être parfaite.

Nous créons des sites web premium pour l''écosystème marrakchi : sites de réservation directe pour hôtels et riads (plus de commissions OTA), boutiques en ligne pour artisans et designers, sites vitrines pour restaurants gastronomiques et spas.

Chaque site est optimisé pour le SEO local (« riad Marrakech », « restaurant gastronomique Marrakech ») et conçu pour convertir les visiteurs en clients.',
 'In Marrakech, your website is your first impression — and in a city that thrives on tourism and image, that impression must be perfect.

We create premium websites for the Marrakech ecosystem: direct booking sites for hotels and riads (no more OTA commissions), online stores for artisans and designers, showcase sites for fine dining restaurants and spas.

Every site is optimized for local SEO ("riad Marrakech", "fine dining Marrakech") and designed to convert visitors into customers.',
 '[{"question":"Faites-vous des sites de réservation directe pour riads à Marrakech ?","answer":"Oui, c''est notre spécialité. Un site de réservation directe vous libère des commissions Booking/Expedia (15-25%) et vous donne le contrôle sur votre relation client."},{"question":"Combien coûte un site web pour un hôtel à Marrakech ?","answer":"Un site de réservation directe avec design premium démarre à 12 000€. L''investissement est rentabilisé en quelques mois grâce aux économies sur les commissions OTA."},{"question":"Optimisez-vous le SEO local pour Marrakech ?","answer":"Oui, chaque site est optimisé pour les recherches locales : « hôtel Marrakech pas cher », « restaurant Marrakech médina », etc. Nous travaillons aussi votre fiche Google Business."}]',
 '[{"question":"Do you build direct booking sites for riads in Marrakech?","answer":"Yes, it''s our specialty. A direct booking site frees you from Booking/Expedia commissions (15-25%) and gives you control over your customer relationship."},{"question":"How much does a website cost for a Marrakech hotel?","answer":"A direct booking site with premium design starts at €12,000. The investment pays for itself in a few months through OTA commission savings."},{"question":"Do you optimize local SEO for Marrakech?","answer":"Yes, every site is optimized for local searches: ''hotel Marrakech budget'', ''restaurant Marrakech medina'', etc. We also work on your Google Business listing."}]',
 true),

-- Fes × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'fes'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Fès',
 'Website & SaaS Development in Fes',
 'Création de Sites Web & SaaS à Fès | Diez Agency',
 'Website & SaaS Development in Fes | Diez Agency',
 'Création de sites web et boutiques e-commerce à Fès. Valorisez le savoir-faire artisanal fassi avec un site moderne et performant.',
 'Website and e-commerce creation in Fes. Showcase Fes artisanal craftsmanship with a modern, high-performance website.',
 'Fès est une ville de savoir-faire. Mais ce savoir-faire mérite d''être vu au-delà de la médina. Un site web moderne est le meilleur ambassadeur de votre expertise — il travaille pour vous 24h/24, partout dans le monde.

Nous créons des sites vitrines et des boutiques e-commerce qui mettent en valeur l''artisanat fassi, les services professionnels et les PME de la région. Design soigné, performance optimale, SEO pensé pour le marché local et international.',
 'Fes is a city of craftsmanship. But that craftsmanship deserves to be seen beyond the medina. A modern website is the best ambassador for your expertise — it works for you 24/7, worldwide.

We create showcase websites and e-commerce stores that highlight Fes artisanship, professional services, and regional SMEs. Polished design, optimal performance, SEO designed for both local and international markets.',
 '[{"question":"Créez-vous des boutiques en ligne pour les artisans de Fès ?","answer":"Oui, nous créons des e-commerce sur-mesure avec paiement en ligne sécurisé, gestion de stock et livraison internationale. Votre savoir-faire mérite d''être accessible au monde entier."},{"question":"Un artisan a-t-il vraiment besoin d''un site web ?","answer":"En 2026, absolument. 87% des acheteurs recherchent en ligne avant d''acheter. Un site web professionnel multiplie votre visibilité et votre crédibilité."},{"question":"Quel budget pour un site e-commerce à Fès ?","answer":"À partir de 12 000€ pour une boutique en ligne complète avec paiement, gestion de stock et SEO. Devis gratuit en 24h."}]',
 '[{"question":"Do you create online stores for Fes artisans?","answer":"Yes, we create custom e-commerce sites with secure online payments, inventory management, and international shipping. Your craftsmanship deserves to be accessible worldwide."},{"question":"Does an artisan really need a website?","answer":"In 2026, absolutely. 87% of buyers search online before purchasing. A professional website multiplies your visibility and credibility."},{"question":"What budget for an e-commerce site in Fes?","answer":"Starting from €12,000 for a complete online store with payments, inventory management, and SEO. Free quote within 24h."}]',
 true),

-- Tanger × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'tanger'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Tanger',
 'Website & SaaS Development in Tangier',
 'Création de Sites Web & SaaS à Tanger | Diez Agency',
 'Website & SaaS Development in Tangier | Diez Agency',
 'Développement de sites web et SaaS à Tanger. Solutions digitales pour l''industrie, la logistique et le commerce du nord du Maroc.',
 'Website and SaaS development in Tangier. Digital solutions for industry, logistics and commerce in northern Morocco.',
 'Tanger est un pôle industriel et logistique de premier plan. Les entreprises de la zone franche, les sociétés de logistique et les commerces du nord ont besoin de plateformes digitales qui reflètent leur professionnalisme et accélèrent leur croissance.

Nous développons des sites corporate pour les entreprises industrielles, des plateformes B2B pour les sociétés de négoce, et des applications métier pour optimiser les opérations. Stack moderne, code propre, performances garanties.',
 'Tangier is a premier industrial and logistics hub. Free zone businesses, logistics companies, and northern commerce need digital platforms that reflect their professionalism and accelerate their growth.

We develop corporate websites for industrial companies, B2B platforms for trading firms, and business applications to optimize operations. Modern stack, clean code, guaranteed performance.',
 '[{"question":"Développez-vous des plateformes B2B pour les entreprises de Tanger ?","answer":"Oui, nous créons des plateformes de mise en relation, des catalogues produits en ligne et des portails B2B adaptés aux besoins des entreprises industrielles et de négoce."},{"question":"Vos sites sont-ils multilingues ?","answer":"Oui, tous nos sites sont bilingues (FR/EN) par défaut. Nous pouvons ajouter l''arabe, l''espagnol ou toute autre langue selon vos besoins."},{"question":"Quel délai pour un site corporate à Tanger ?","answer":"4 à 6 semaines pour un site corporate professionnel. Délais garantis par contrat."}]',
 '[{"question":"Do you develop B2B platforms for Tangier businesses?","answer":"Yes, we create matchmaking platforms, online product catalogs, and B2B portals tailored to the needs of industrial and trading companies."},{"question":"Are your websites multilingual?","answer":"Yes, all our sites are bilingual (FR/EN) by default. We can add Arabic, Spanish, or any other language according to your needs."},{"question":"What timeline for a corporate site in Tangier?","answer":"4 to 6 weeks for a professional corporate website. Deadlines guaranteed by contract."}]',
 true),

-- Agadir × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'agadir'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Agadir',
 'Website & SaaS Development in Agadir',
 'Création de Sites Web & SaaS à Agadir | Diez Agency',
 'Website & SaaS Development in Agadir | Diez Agency',
 'Création de sites web à Agadir. Sites touristiques, e-commerce produits du terroir, applications métier agricoles. Design moderne, SEO local.',
 'Website creation in Agadir. Tourism sites, local product e-commerce, agricultural business apps. Modern design, local SEO.',
 'Agadir est une ville où tourisme, agriculture et commerce se rencontrent. Chaque secteur a besoin d''une vitrine digitale à la hauteur de ses ambitions.

Sites de réservation pour les hôtels du bord de mer, boutiques en ligne pour les produits du terroir (argan, safran, miel), plateformes métier pour les coopératives agricoles — nous concevons des solutions web qui répondent aux besoins spécifiques de l''économie gadiria.',
 'Agadir is a city where tourism, agriculture, and commerce converge. Each sector needs a digital showcase that matches its ambitions.

Booking sites for beachfront hotels, online stores for local products (argan oil, saffron, honey), business platforms for agricultural cooperatives — we design web solutions that address the specific needs of Agadir''s economy.',
 '[{"question":"Créez-vous des sites pour les coopératives à Agadir ?","answer":"Oui, nous créons des sites vitrines et des boutiques e-commerce pour les coopératives agricoles, avec vente en ligne et gestion des commandes."},{"question":"Combien coûte un site de réservation à Agadir ?","answer":"Un site de réservation directe pour hôtel démarre à 12 000€. Le ROI est rapide grâce aux économies sur les commissions de plateformes."},{"question":"Le SEO local fonctionne-t-il à Agadir ?","answer":"Oui, le SEO local est crucial à Agadir. Nous optimisons votre site pour les recherches comme « hôtel Agadir bord de mer » ou « restaurant Agadir poisson »."}]',
 '[{"question":"Do you create websites for cooperatives in Agadir?","answer":"Yes, we create showcase sites and e-commerce stores for agricultural cooperatives, with online sales and order management."},{"question":"How much does a booking site cost in Agadir?","answer":"A direct booking site for a hotel starts at €12,000. ROI is quick thanks to savings on platform commissions."},{"question":"Does local SEO work in Agadir?","answer":"Yes, local SEO is crucial in Agadir. We optimize your site for searches like ''hotel Agadir beachfront'' or ''restaurant Agadir seafood''."}]',
 true),

-- Meknes × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'meknes'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Meknès',
 'Website & SaaS Development in Meknes',
 'Création de Sites Web & SaaS à Meknès | Diez Agency',
 'Website & SaaS Development in Meknes | Diez Agency',
 'Création de sites web à Meknès. Sites vitrines, e-commerce et applications métier pour PME et commerces meknassis. À partir de 8 000€.',
 'Website creation in Meknes. Showcase sites, e-commerce and business applications for Meknes SMEs and businesses. Starting from €8,000.',
 'Les PME de Meknès ont besoin de sites web qui travaillent pour elles : qui attirent des clients, renforcent la crédibilité et permettent de vendre en ligne.

Nous créons des sites vitrines professionnels, des boutiques e-commerce et des applications métier adaptés au budget et aux ambitions des entreprises meknassies. Design moderne, performances optimales, SEO local intégré.',
 'Meknes SMEs need websites that work for them: that attract customers, build credibility, and enable online sales.

We create professional showcase websites, e-commerce stores, and business applications adapted to the budget and ambitions of Meknes businesses. Modern design, optimal performance, integrated local SEO.',
 '[{"question":"Quel type de site pour un commerce à Meknès ?","answer":"Un site vitrine professionnel avec SEO local, à partir de 8 000€. Pour vendre en ligne : boutique e-commerce à partir de 12 000€."},{"question":"Livrez-vous rapidement ?","answer":"Oui, un site vitrine en 4-6 semaines, un e-commerce en 6-8 semaines. Délais garantis par contrat."},{"question":"Pourquoi choisir Diez Agency plutôt qu''un freelance ?","answer":"Un freelance disparaît souvent après la livraison. Nous offrons un suivi, une garantie et un code maintenable. Votre investissement est protégé sur le long terme."}]',
 '[{"question":"What type of site for a Meknes business?","answer":"A professional showcase site with local SEO, starting from €8,000. For online sales: e-commerce store from €12,000."},{"question":"Do you deliver quickly?","answer":"Yes, a showcase site in 4-6 weeks, an e-commerce in 6-8 weeks. Deadlines guaranteed by contract."},{"question":"Why choose Diez Agency over a freelancer?","answer":"Freelancers often disappear after delivery. We offer ongoing support, guarantees, and maintainable code. Your investment is protected long-term."}]',
 true),

-- Oujda × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'oujda'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Oujda',
 'Website & SaaS Development in Oujda',
 'Création de Sites Web & SaaS à Oujda | Diez Agency',
 'Website & SaaS Development in Oujda | Diez Agency',
 'Création de sites web à Oujda. Sites professionnels, e-commerce et applications pour les entreprises de l''Oriental marocain.',
 'Website creation in Oujda. Professional sites, e-commerce and applications for businesses in Morocco''s Oriental region.',
 'Oujda mérite des solutions digitales de qualité nationale. Que vous soyez commerçant, prestataire de services ou entreprise d''import-export, un site web professionnel est votre carte de visite digitale — il travaille pour vous 24h/24.

Nous concevons des sites modernes, rapides et optimisés pour le SEO, avec un design qui inspire confiance. Notre modèle de travail à distance garantit la même qualité et réactivité qu''une agence locale.',
 'Oujda deserves national-quality digital solutions. Whether you''re a merchant, service provider, or import-export business, a professional website is your digital business card — it works for you 24/7.

We design modern, fast, SEO-optimized websites with a design that inspires trust. Our remote work model guarantees the same quality and responsiveness as a local agency.',
 '[{"question":"Travaillez-vous à distance avec des clients à Oujda ?","answer":"Oui, notre processus est 100% digital : visioconférence, outils collaboratifs, sprints de 2 semaines. La distance ne change rien à la qualité."},{"question":"Quel budget pour un site web à Oujda ?","answer":"Sites vitrines à partir de 8 000€, e-commerce à partir de 12 000€. Audit gratuit et devis transparent en 24h."},{"question":"Proposez-vous la maintenance après livraison ?","answer":"Oui, nous proposons des forfaits de maintenance mensuels pour les mises à jour, la sécurité et le support technique."}]',
 '[{"question":"Do you work remotely with clients in Oujda?","answer":"Yes, our process is 100% digital: video calls, collaborative tools, 2-week sprints. Distance doesn''t change quality."},{"question":"What budget for a website in Oujda?","answer":"Showcase sites from €8,000, e-commerce from €12,000. Free audit and transparent quote within 24h."},{"question":"Do you offer maintenance after delivery?","answer":"Yes, we offer monthly maintenance packages for updates, security, and technical support."}]',
 true),

-- Kenitra × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'kenitra'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Kénitra',
 'Website & SaaS Development in Kenitra',
 'Création de Sites Web & SaaS à Kénitra | Diez Agency',
 'Website & SaaS Development in Kenitra | Diez Agency',
 'Développement de sites web et SaaS à Kénitra. Solutions digitales pour les industries de l''Atlantic Free Zone et les PME locales.',
 'Website and SaaS development in Kenitra. Digital solutions for Atlantic Free Zone industries and local SMEs.',
 'Kénitra vit une croissance industrielle exceptionnelle. Les entreprises de l''Atlantic Free Zone et les PME locales ont besoin de plateformes digitales à la hauteur de leurs ambitions.

Sites corporate, applications métier, portails internes, outils SaaS — nous développons des solutions sur-mesure avec une stack technique moderne et un code maintenable. Livraison en 4-8 semaines selon la complexité.',
 'Kenitra is experiencing exceptional industrial growth. Atlantic Free Zone businesses and local SMEs need digital platforms that match their ambitions.

Corporate sites, business applications, internal portals, SaaS tools — we develop custom solutions with a modern tech stack and maintainable code. Delivery in 4-8 weeks depending on complexity.',
 '[{"question":"Développez-vous des applications pour les industries de Kénitra ?","answer":"Oui, nous créons des applications métier, des portails internes et des outils SaaS adaptés aux besoins des entreprises industrielles."},{"question":"Votre code est-il maintenable sur le long terme ?","answer":"Absolument. Nous utilisons TypeScript, des tests automatisés et une architecture modulaire. Votre code reste propre et évolutif."},{"question":"Proposez-vous des solutions API ?","answer":"Oui, nous développons des API REST et GraphQL pour connecter vos systèmes existants à vos nouvelles plateformes digitales."}]',
 '[{"question":"Do you develop applications for Kenitra industries?","answer":"Yes, we create business applications, internal portals, and SaaS tools tailored to the needs of industrial companies."},{"question":"Is your code maintainable long-term?","answer":"Absolutely. We use TypeScript, automated tests, and modular architecture. Your code stays clean and scalable."},{"question":"Do you offer API solutions?","answer":"Yes, we develop REST and GraphQL APIs to connect your existing systems to your new digital platforms."}]',
 true),

-- Tetouan × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'tetouan'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Tétouan',
 'Website & SaaS Development in Tetouan',
 'Création de Sites Web & SaaS à Tétouan | Diez Agency',
 'Website & SaaS Development in Tetouan | Diez Agency',
 'Création de sites web à Tétouan. Sites vitrines, boutiques en ligne et SEO pour artisans et commerces du nord du Maroc.',
 'Website creation in Tetouan. Showcase sites, online stores and SEO for artisans and businesses in northern Morocco.',
 'Tétouan regorge de talents artisanaux et de commerces de qualité qui méritent une vitrine digitale à la hauteur. Un site web professionnel, c''est l''opportunité de toucher des clients bien au-delà de la ville.

Nous créons des sites vitrines élégants et des boutiques en ligne performantes, optimisés pour le SEO local et national. Design soigné, navigation intuitive, performance maximale.',
 'Tetouan is rich with artisanal talent and quality businesses that deserve a digital showcase to match. A professional website is the opportunity to reach customers well beyond the city.

We create elegant showcase websites and high-performance online stores, optimized for local and national SEO. Polished design, intuitive navigation, maximum performance.',
 '[{"question":"Créez-vous des sites pour les artisans de Tétouan ?","answer":"Oui, nous concevons des sites vitrines et des boutiques e-commerce qui mettent en valeur l''artisanat tétouanais avec un design élégant et moderne."},{"question":"Le SEO peut-il attirer des clients hors de Tétouan ?","answer":"Absolument. Avec un bon SEO, votre site attire des clients de tout le Maroc et de l''international. C''est votre commercial qui travaille 24h/24."},{"question":"Quel est votre processus de travail ?","answer":"Audit gratuit → devis fixe → sprints de 2 semaines avec démos → livraison. Transparent, prévisible, garanti par contrat."}]',
 '[{"question":"Do you create websites for Tetouan artisans?","answer":"Yes, we design showcase websites and e-commerce stores that highlight Tetouan craftsmanship with elegant, modern design."},{"question":"Can SEO attract customers outside Tetouan?","answer":"Absolutely. With good SEO, your website attracts customers from all over Morocco and internationally. It''s your 24/7 salesperson."},{"question":"What is your work process?","answer":"Free audit → fixed quote → 2-week sprints with demos → delivery. Transparent, predictable, guaranteed by contract."}]',
 true),

-- Sale × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'sale'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Salé',
 'Website & SaaS Development in Sale',
 'Création de Sites Web & SaaS à Salé | Diez Agency',
 'Website & SaaS Development in Sale | Diez Agency',
 'Création de sites web à Salé. Sites professionnels, applications et e-commerce pour les entreprises de Salé et la région Rabat-Salé.',
 'Website creation in Sale. Professional sites, applications and e-commerce for Sale businesses and the Rabat-Sale region.',
 'Salé bénéficie de la dynamique de la capitale tout en offrant un tissu économique diversifié. Les entreprises de Salé qui se dotent d''un site web professionnel captent une clientèle élargie dans toute la région Rabat-Salé-Kénitra.

Nous développons des sites vitrines, des boutiques e-commerce et des applications métier pour les PME et commerces de Salé. Technologies modernes, performances optimales, livraison garantie.',
 'Sale benefits from the capital''s dynamism while offering a diversified economic fabric. Sale businesses with professional websites capture an expanded clientele across the Rabat-Sale-Kenitra region.

We develop showcase websites, e-commerce stores, and business applications for Sale SMEs and shops. Modern technologies, optimal performance, guaranteed delivery.',
 '[{"question":"Couvrez-vous Salé et Rabat ?","answer":"Oui, nous travaillons avec des clients dans toute la région Rabat-Salé-Kénitra. Mêmes services, même qualité, mêmes garanties."},{"question":"Quel budget pour un site vitrine à Salé ?","answer":"À partir de 8 000€ pour un site professionnel avec design moderne et SEO intégré. Devis gratuit en 24h."},{"question":"Faites-vous du e-commerce ?","answer":"Oui, nous créons des boutiques en ligne complètes avec paiement sécurisé, gestion de stock et livraison. À partir de 12 000€."}]',
 '[{"question":"Do you cover Sale and Rabat?","answer":"Yes, we work with clients across the Rabat-Sale-Kenitra region. Same services, same quality, same guarantees."},{"question":"What budget for a showcase site in Sale?","answer":"Starting from €8,000 for a professional site with modern design and integrated SEO. Free quote within 24h."},{"question":"Do you do e-commerce?","answer":"Yes, we create complete online stores with secure payments, inventory management, and delivery. Starting from €12,000."}]',
 true),

-- Nador × SaaS
((SELECT id FROM pseo_cities WHERE slug = 'nador'), 'saas-web-app', NULL,
 'Création de Sites Web & SaaS à Nador',
 'Website & SaaS Development in Nador',
 'Création de Sites Web & SaaS à Nador | Diez Agency',
 'Website & SaaS Development in Nador | Diez Agency',
 'Création de sites web à Nador. Sites professionnels et e-commerce pour les entreprises et commerçants du Rif. Technologies modernes.',
 'Website creation in Nador. Professional sites and e-commerce for Rif businesses and merchants. Modern technologies.',
 'Nador et sa région regorgent d''entrepreneurs ambitieux. Un site web professionnel est le premier pas pour connecter votre business aux marchés nationaux et internationaux.

Nous créons des sites modernes et performants pour les commerçants, les entreprises d''import-export et les prestataires de services de Nador. Design professionnel, SEO optimisé, performances garanties — le tout livré en 4-6 semaines.',
 'Nador and its region are full of ambitious entrepreneurs. A professional website is the first step to connecting your business to national and international markets.

We create modern, high-performance websites for Nador merchants, import-export businesses, and service providers. Professional design, optimized SEO, guaranteed performance — all delivered in 4-6 weeks.',
 '[{"question":"Pouvez-vous créer un site multilingue pour Nador ?","answer":"Oui, nos sites sont bilingues FR/EN par défaut. Nous pouvons ajouter l''arabe ou le rifain selon vos besoins."},{"question":"Comment se passe la collaboration à distance ?","answer":"Visioconférence, Slack, démos toutes les 2 semaines. Vous êtes impliqué à chaque étape sans quitter votre bureau."},{"question":"Quel retour sur investissement attendre ?","answer":"Un site web professionnel génère en moyenne 3x plus de demandes de contact qu''une simple page Facebook. L''investissement est rentabilisé en quelques mois."}]',
 '[{"question":"Can you create a multilingual site for Nador?","answer":"Yes, our sites are bilingual FR/EN by default. We can add Arabic or Rifian based on your needs."},{"question":"How does remote collaboration work?","answer":"Video calls, Slack, demos every 2 weeks. You''re involved at every step without leaving your office."},{"question":"What ROI can I expect?","answer":"A professional website generates on average 3x more contact requests than a simple Facebook page. The investment pays for itself in a few months."}]',
 true);
