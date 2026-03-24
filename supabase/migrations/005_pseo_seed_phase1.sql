-- ============================================================
-- Migration 005 : Seed PSEO Phase 1
-- Villes (12) + Secteurs (10) + Pages ville (12) + Pages ville×service (48)
-- ============================================================

-- ============================================================
-- Seed: 12 villes marocaines pour PSEO
-- Exécuter dans Supabase SQL Editor (1er)
-- ============================================================

INSERT INTO pseo_cities (slug, name_fr, name_en, region, population, description_fr, description_en, lat, lng) VALUES

('casablanca', 'Casablanca', 'Casablanca', 'Casablanca-Settat', 3752000,
 'Casablanca est le poumon économique du Maroc. Capitale financière et industrielle, elle concentre plus de 60% des sièges sociaux du pays et un écosystème tech en pleine explosion avec le Casablanca Technopark et la Casa Finance City.',
 'Casablanca is Morocco''s economic powerhouse. As the financial and industrial capital, it hosts over 60% of the country''s corporate headquarters and a booming tech ecosystem with the Casablanca Technopark and Casa Finance City.',
 33.5731, -7.5898),

('rabat', 'Rabat', 'Rabat', 'Rabat-Salé-Kénitra', 1932000,
 'Rabat, capitale administrative du Maroc, est un hub institutionnel et technologique. Avec le Technopolis et l''Université Mohammed V, la ville attire startups, administrations et entreprises de conseil en quête de modernisation digitale.',
 'Rabat, Morocco''s administrative capital, is an institutional and technological hub. With Technopolis and Mohammed V University, the city attracts startups, government agencies, and consulting firms seeking digital modernization.',
 34.0209, -6.8416),

('marrakech', 'Marrakech', 'Marrakech', 'Marrakech-Safi', 1330000,
 'Marrakech est la capitale touristique du Maroc, avec plus de 3 millions de visiteurs par an. Son économie repose sur l''hôtellerie, la restauration et le commerce — des secteurs où la présence digitale fait toute la différence.',
 'Marrakech is Morocco''s tourism capital, welcoming over 3 million visitors annually. Its economy relies on hospitality, dining, and retail — industries where digital presence makes all the difference.',
 31.6295, -7.9811),

('fes', 'Fès', 'Fes', 'Fès-Meknès', 1220000,
 'Fès, ville impériale et universitaire, est un centre culturel et artisanal majeur. Avec l''essor du e-commerce et la modernisation des métiers traditionnels, les entreprises fassies investissent massivement dans leur transformation digitale.',
 'Fes, an imperial and university city, is a major cultural and artisanal center. With the rise of e-commerce and the modernization of traditional crafts, Fes-based businesses are investing heavily in digital transformation.',
 34.0181, -5.0078),

('tanger', 'Tanger', 'Tangier', 'Tanger-Tétouan-Al Hoceïma', 1065000,
 'Tanger est la porte de l''Afrique vers l''Europe. Avec le port Tanger Med, les zones franches et un afflux d''investissements internationaux, la ville est devenue un pôle industriel et logistique où le digital est un levier stratégique.',
 'Tangier is Africa''s gateway to Europe. With the Tanger Med port, free trade zones, and a surge of international investment, the city has become an industrial and logistics hub where digital is a strategic lever.',
 35.7595, -5.8340),

('agadir', 'Agadir', 'Agadir', 'Souss-Massa', 924000,
 'Agadir est la capitale du Souss-Massa, un pôle agricole, touristique et halieutique majeur. Les entreprises locales — hôtels, exploitations agricoles, exportateurs — ont un besoin croissant de solutions digitales pour se développer.',
 'Agadir is the capital of the Souss-Massa region, a major agricultural, tourism, and fishing hub. Local businesses — hotels, farms, exporters — have a growing need for digital solutions to scale.',
 30.4278, -9.5981),

('meknes', 'Meknès', 'Meknes', 'Fès-Meknès', 835000,
 'Meknès, ville impériale au cœur du Maroc, est un centre agricole et commercial en pleine mutation. Les PME et commerces meknassis adoptent le digital pour conquérir de nouveaux marchés et moderniser leurs opérations.',
 'Meknes, an imperial city in the heart of Morocco, is an agricultural and commercial center undergoing transformation. Local SMEs and businesses are adopting digital to conquer new markets and modernize operations.',
 33.8935, -5.5547),

('oujda', 'Oujda', 'Oujda', 'Oriental', 560000,
 'Oujda, capitale de l''Oriental, est un carrefour stratégique à la frontière algérienne. La ville mise sur le digital et l''innovation pour dynamiser son économie et connecter ses entreprises aux marchés nationaux et internationaux.',
 'Oujda, capital of the Oriental region, is a strategic crossroads near the Algerian border. The city is leveraging digital and innovation to boost its economy and connect local businesses to national and international markets.',
 34.6814, -1.9086),

('kenitra', 'Kénitra', 'Kenitra', 'Rabat-Salé-Kénitra', 507000,
 'Kénitra connaît un essor industriel remarquable avec l''Atlantic Free Zone et l''usine PSA. La ville attire des entreprises manufacturières et de services qui ont besoin de solutions digitales pour accompagner leur croissance rapide.',
 'Kenitra is experiencing remarkable industrial growth with the Atlantic Free Zone and the PSA factory. The city attracts manufacturing and service companies that need digital solutions to support their rapid growth.',
 34.2610, -6.5802),

('tetouan', 'Tétouan', 'Tetouan', 'Tanger-Tétouan-Al Hoceïma', 460000,
 'Tétouan, perle du Nord marocain, allie patrimoine culturel et dynamisme économique. Son tissu de PME, artisans et commerçants se digitalise pour répondre aux attentes d''une clientèle de plus en plus connectée.',
 'Tetouan, the pearl of northern Morocco, combines cultural heritage with economic dynamism. Its network of SMEs, artisans, and merchants is going digital to meet the expectations of an increasingly connected clientele.',
 35.5785, -5.3684),

('sale', 'Salé', 'Sale', 'Rabat-Salé-Kénitra', 982000,
 'Salé, ville jumelle de Rabat, bénéficie de la dynamique de la capitale avec le Technopolis voisin. Ses entreprises et commerces profitent d''un bassin de population massif et d''un accès direct à l''écosystème tech de la région.',
 'Sale, Rabat''s twin city, benefits from the capital''s momentum with the nearby Technopolis. Its businesses and shops enjoy access to a massive population base and the region''s tech ecosystem.',
 34.0531, -6.7985),

('nador', 'Nador', 'Nador', 'Oriental', 410000,
 'Nador, porte du Rif sur la Méditerranée, est un hub commercial dynamique. Avec une diaspora active et un tissu d''import-export florissant, les entreprises nadories investissent dans le digital pour se connecter aux marchés internationaux.',
 'Nador, the Rif''s gateway to the Mediterranean, is a dynamic commercial hub. With an active diaspora and a thriving import-export network, Nador businesses are investing in digital to connect to international markets.',
 35.1681, -2.9335);

-- ============================================================
-- Seed: 10 secteurs d'activité pour PSEO
-- Exécuter dans Supabase SQL Editor (2ème)
-- ============================================================

INSERT INTO pseo_sectors (slug, name_fr, name_en, icon, description_fr, description_en) VALUES

('restaurant', 'Restaurant', 'Restaurant', '🍽️',
 'Sites vitrines, systèmes de réservation en ligne, menus digitaux et stratégie de visibilité locale pour restaurants, cafés et traiteurs.',
 'Showcase websites, online booking systems, digital menus, and local visibility strategy for restaurants, cafés, and caterers.'),

('immobilier', 'Immobilier', 'Real Estate', '🏠',
 'Plateformes immobilières, sites d''annonces, visites virtuelles et outils CRM pour agences immobilières et promoteurs.',
 'Real estate platforms, listing websites, virtual tours, and CRM tools for real estate agencies and developers.'),

('ecommerce', 'E-commerce', 'E-commerce', '🛒',
 'Boutiques en ligne, marketplaces, gestion de stock et automatisation des commandes pour les commerces qui vendent sur internet.',
 'Online stores, marketplaces, inventory management, and order automation for businesses selling online.'),

('avocat', 'Avocat', 'Law Firm', '⚖️',
 'Sites professionnels, prise de rendez-vous en ligne, gestion documentaire et visibilité SEO pour cabinets d''avocats et notaires.',
 'Professional websites, online appointment booking, document management, and SEO visibility for law firms and notaries.'),

('medecin', 'Médecin', 'Healthcare', '🏥',
 'Sites médicaux, plateformes de téléconsultation, prise de rendez-vous et portails patients pour médecins, cliniques et laboratoires.',
 'Medical websites, telemedicine platforms, appointment booking, and patient portals for doctors, clinics, and laboratories.'),

('hotel', 'Hôtel', 'Hotel', '🏨',
 'Sites de réservation directe, channel managers, expérience client digitale et stratégie de visibilité pour hôtels, riads et maisons d''hôtes.',
 'Direct booking websites, channel managers, digital guest experience, and visibility strategy for hotels, riads, and guesthouses.'),

('startup', 'Startup', 'Startup', '🚀',
 'MVPs, applications SaaS, landing pages de conversion et outils internes pour startups en phase de lancement ou de croissance.',
 'MVPs, SaaS applications, conversion landing pages, and internal tools for startups in launch or growth phase.'),

('pme', 'PME', 'SME', '🏢',
 'Sites corporate, outils de gestion interne, automatisation des processus et transformation digitale pour petites et moyennes entreprises.',
 'Corporate websites, internal management tools, process automation, and digital transformation for small and medium enterprises.'),

('import-export', 'Import / Export', 'Import / Export', '🚢',
 'Plateformes B2B, catalogues en ligne, automatisation logistique et outils CRM pour les entreprises d''import-export et de négoce.',
 'B2B platforms, online catalogs, logistics automation, and CRM tools for import-export and trading companies.'),

('education', 'Éducation', 'Education', '🎓',
 'Plateformes e-learning, sites d''écoles et universités, gestion des inscriptions et outils pédagogiques digitaux.',
 'E-learning platforms, school and university websites, enrollment management, and digital teaching tools.');

-- ============================================================
-- Seed: 12 pages PSEO ville (agence générale par ville)
-- Exécuter dans Supabase SQL Editor (3ème)
-- Requiert: 01_cities.sql exécuté en premier
-- ============================================================

-- On utilise une sous-requête pour récupérer le city_id par slug
-- service_slug = NULL, sector_id = NULL → page agence générale

INSERT INTO pseo_pages (city_id, service_slug, sector_id, title_fr, title_en, meta_title_fr, meta_title_en, meta_description_fr, meta_description_en, content_fr, content_en, faq_fr, faq_en, published) VALUES

-- ── CASABLANCA ──
((SELECT id FROM pseo_cities WHERE slug = 'casablanca'), NULL, NULL,
 'Agence Digitale à Casablanca',
 'Digital Agency in Casablanca',
 'Agence Digitale à Casablanca | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Casablanca | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, votre agence digitale à Casablanca. Création de sites web, SaaS, automatisation IA et SEO. Délais garantis par contrat. Audit gratuit en 24h.',
 'Diez Agency, your digital agency in Casablanca. Website creation, SaaS, AI automation and SEO. Deadlines guaranteed by contract. Free audit within 24h.',
 'Casablanca est le cœur économique du Maroc, et votre présence digitale doit être à la hauteur de cette ambition. Chez Diez Agency, nous accompagnons les entreprises casablancaises — startups, PME et grands comptes — dans leur transformation digitale complète.

Que vous ayez besoin d''un site web performant, d''une application SaaS sur-mesure, d''automatiser vos processus métier avec l''IA, ou de dominer les résultats de recherche grâce au SEO nouvelle génération, notre équipe livre des résultats concrets.

Nous ne sommes pas une agence de plus. Nos délais sont garantis par contrat, nos devis sont fixes et transparents, et nous travaillons en sprints de 2 semaines avec validation continue. Votre projet avance, vous le voyez en temps réel.',
 'Casablanca is Morocco''s economic heart, and your digital presence should match that ambition. At Diez Agency, we support Casablanca-based businesses — startups, SMEs, and enterprises — through their complete digital transformation.

Whether you need a high-performance website, a custom SaaS application, AI-powered business process automation, or next-gen SEO to dominate search results, our team delivers concrete results.

We''re not just another agency. Our deadlines are guaranteed by contract, our quotes are fixed and transparent, and we work in 2-week sprints with continuous validation. Your project moves forward — you see it in real time.',
 '[{"question":"Combien coûte un site web à Casablanca ?","answer":"Nos projets démarrent à partir de 8 000€ pour un site vitrine professionnel. Le prix exact dépend de la complexité, du nombre de pages et des fonctionnalités. Nous proposons un audit gratuit pour établir un devis transparent et fixe."},{"question":"En combien de temps livrez-vous un projet ?","answer":"Un site vitrine est livré en 4 à 6 semaines. Un MVP SaaS en 6 à 8 semaines. Les délais sont garantis par contrat — c''est notre engagement."},{"question":"Travaillez-vous uniquement avec des entreprises à Casablanca ?","answer":"Non, nous travaillons avec des clients dans tout le Maroc et à l''international. Mais notre connaissance du marché casablancais nous permet d''apporter une expertise locale précieuse à nos clients de la région."}]',
 '[{"question":"How much does a website cost in Casablanca?","answer":"Our projects start from €8,000 for a professional showcase website. The exact price depends on complexity, number of pages, and features. We offer a free audit to provide a transparent, fixed quote."},{"question":"How fast do you deliver a project?","answer":"A showcase website is delivered in 4 to 6 weeks. An MVP SaaS in 6 to 8 weeks. Deadlines are guaranteed by contract — that''s our commitment."},{"question":"Do you only work with Casablanca-based businesses?","answer":"No, we work with clients across Morocco and internationally. But our knowledge of the Casablanca market allows us to bring valuable local expertise to our regional clients."}]',
 true),

-- ── RABAT ──
((SELECT id FROM pseo_cities WHERE slug = 'rabat'), NULL, NULL,
 'Agence Digitale à Rabat',
 'Digital Agency in Rabat',
 'Agence Digitale à Rabat | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Rabat | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, votre agence digitale à Rabat. Création de sites web, SaaS, automatisation IA et SEO pour administrations, startups et entreprises de la capitale.',
 'Diez Agency, your digital agency in Rabat. Website creation, SaaS, AI automation and SEO for government agencies, startups and businesses in the capital.',
 'Rabat, capitale du Royaume, est un carrefour où se rencontrent l''administration, la tech et l''innovation. Avec le Technopolis et un écosystème startup en plein essor, la capitale a besoin de partenaires digitaux fiables et ambitieux.

Diez Agency accompagne les entreprises et institutions de Rabat dans leur transformation digitale. Sites web institutionnels, applications métier, automatisation des workflows administratifs, optimisation SEO — nous livrons des solutions concrètes, dans les délais, au budget prévu.

Notre approche est simple : zéro jargon technique, des sprints de 2 semaines avec votre validation, et des résultats mesurables. Que vous soyez une startup du Technopolis ou un organisme public en quête de modernisation, nous avons l''expertise pour vous accompagner.',
 'Rabat, the Kingdom''s capital, is a crossroads where government, tech, and innovation meet. With Technopolis and a thriving startup ecosystem, the capital needs reliable and ambitious digital partners.

Diez Agency supports Rabat-based businesses and institutions in their digital transformation. Institutional websites, business applications, administrative workflow automation, SEO optimization — we deliver concrete solutions, on time, on budget.

Our approach is simple: zero technical jargon, 2-week sprints with your validation, and measurable results. Whether you''re a Technopolis startup or a public organization seeking modernization, we have the expertise to support you.',
 '[{"question":"Travaillez-vous avec des administrations publiques à Rabat ?","answer":"Oui, nous avons l''expérience des projets institutionnels. Nous comprenons les contraintes de sécurité, d''accessibilité et de conformité propres au secteur public."},{"question":"Proposez-vous des solutions d''automatisation pour les organisations à Rabat ?","answer":"Absolument. Nous déployons des agents IA et des workflows automatisés qui remplacent les tâches manuelles répétitives — idéal pour les administrations et les entreprises en croissance."},{"question":"Comment se passe un projet avec Diez Agency ?","answer":"Après un audit gratuit, nous définissons ensemble le périmètre. Le projet avance en sprints de 2 semaines avec démos régulières. Délais garantis par contrat, devis fixe, zéro surprise."}]',
 '[{"question":"Do you work with government agencies in Rabat?","answer":"Yes, we have experience with institutional projects. We understand the security, accessibility, and compliance requirements specific to the public sector."},{"question":"Do you offer automation solutions for Rabat organizations?","answer":"Absolutely. We deploy AI agents and automated workflows that replace repetitive manual tasks — ideal for government agencies and growing businesses."},{"question":"What does a project with Diez Agency look like?","answer":"After a free audit, we define the scope together. The project progresses in 2-week sprints with regular demos. Deadlines guaranteed by contract, fixed quote, zero surprises."}]',
 true),

-- ── MARRAKECH ──
((SELECT id FROM pseo_cities WHERE slug = 'marrakech'), NULL, NULL,
 'Agence Digitale à Marrakech',
 'Digital Agency in Marrakech',
 'Agence Digitale à Marrakech | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Marrakech | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, votre agence digitale à Marrakech. Sites web pour hôtels, restaurants et commerces. Réservation en ligne, SEO local et automatisation IA.',
 'Diez Agency, your digital agency in Marrakech. Websites for hotels, restaurants and shops. Online booking, local SEO and AI automation.',
 'Marrakech accueille plus de 3 millions de visiteurs chaque année. Dans une ville où le tourisme, l''hôtellerie et la restauration dominent l''économie, votre visibilité digitale n''est pas un luxe — c''est une nécessité.

Diez Agency aide les entreprises marrakchies à capter cette clientèle connectée. Sites de réservation directe pour hôtels et riads, menus digitaux et commandes en ligne pour restaurants, boutiques e-commerce pour artisans — nous construisons des outils qui génèrent du chiffre d''affaires.

Notre différence : nous livrons vite (4-6 semaines), au prix annoncé, avec un design qui reflète l''identité unique de Marrakech et de votre business.',
 'Marrakech welcomes over 3 million visitors every year. In a city where tourism, hospitality, and dining dominate the economy, your digital visibility isn''t a luxury — it''s a necessity.

Diez Agency helps Marrakech businesses capture this connected clientele. Direct booking sites for hotels and riads, digital menus and online ordering for restaurants, e-commerce shops for artisans — we build tools that generate revenue.

Our difference: we deliver fast (4-6 weeks), at the quoted price, with a design that reflects the unique identity of Marrakech and your business.',
 '[{"question":"Faites-vous des sites de réservation pour hôtels à Marrakech ?","answer":"Oui, c''est l''une de nos spécialités. Nous créons des sites de réservation directe qui réduisent votre dépendance aux OTA (Booking, Expedia) et augmentent vos marges."},{"question":"Combien de temps pour créer un site pour un restaurant à Marrakech ?","answer":"Un site vitrine avec menu digital et réservation en ligne est livré en 4 semaines. Un site e-commerce plus complet en 6-8 semaines."},{"question":"Le SEO local fonctionne-t-il vraiment à Marrakech ?","answer":"Absolument. Quand un touriste cherche « meilleur restaurant Marrakech » ou « riad Marrakech pas cher », le SEO local détermine qui apparaît en premier. Nous optimisons votre visibilité sur ces recherches stratégiques."}]',
 '[{"question":"Do you build booking websites for hotels in Marrakech?","answer":"Yes, it''s one of our specialties. We create direct booking websites that reduce your dependency on OTAs (Booking, Expedia) and increase your margins."},{"question":"How long to create a website for a Marrakech restaurant?","answer":"A showcase site with digital menu and online booking is delivered in 4 weeks. A more complete e-commerce site in 6-8 weeks."},{"question":"Does local SEO really work in Marrakech?","answer":"Absolutely. When a tourist searches for ''best restaurant Marrakech'' or ''riad Marrakech budget'', local SEO determines who shows up first. We optimize your visibility on these strategic searches."}]',
 true),

-- ── FES ──
((SELECT id FROM pseo_cities WHERE slug = 'fes'), NULL, NULL,
 'Agence Digitale à Fès',
 'Digital Agency in Fes',
 'Agence Digitale à Fès | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Fes | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Fès. Création de sites web, e-commerce pour artisans, automatisation et SEO. Modernisez votre business fassi.',
 'Diez Agency, digital agency in Fes. Website creation, e-commerce for artisans, automation and SEO. Modernize your Fes-based business.',
 'Fès est une ville de savoir-faire et de tradition, mais aussi une ville qui se modernise à grande vitesse. Les artisans, commerçants et entrepreneurs fassis comprennent que le digital est le pont entre leur expertise séculaire et les marchés d''aujourd''hui.

Diez Agency accompagne cette transformation. Boutiques en ligne pour artisans qui veulent vendre au-delà de la médina, sites vitrines pour professionnels libéraux, applications métier pour PME en croissance — nous construisons les outils digitaux qui font grandir votre business.

Nous comprenons les spécificités de Fès : un tissu économique de PME familiales, un artisanat d''excellence à valoriser, et des entrepreneurs ambitieux qui méritent des partenaires à la hauteur.',
 'Fes is a city of craftsmanship and tradition, but also a city modernizing at full speed. Artisans, merchants, and Fes-based entrepreneurs understand that digital is the bridge between centuries-old expertise and today''s markets.

Diez Agency supports this transformation. Online shops for artisans wanting to sell beyond the medina, showcase websites for professionals, business applications for growing SMEs — we build the digital tools that grow your business.

We understand what makes Fes unique: a fabric of family-owned SMEs, world-class craftsmanship to showcase, and ambitious entrepreneurs who deserve partners that match their ambition.',
 '[{"question":"Pouvez-vous créer une boutique en ligne pour un artisan de Fès ?","answer":"Oui, c''est exactement ce que nous faisons. Nous créons des boutiques e-commerce qui mettent en valeur le savoir-faire artisanal fassi, avec paiement en ligne, livraison internationale et SEO optimisé."},{"question":"Les PME de Fès ont-elles vraiment besoin d''un site web ?","answer":"En 2026, oui. 87% des consommateurs marocains recherchent en ligne avant d''acheter. Sans présence digitale, vous êtes invisible pour la majorité de vos clients potentiels."},{"question":"Quel budget prévoir pour un projet digital à Fès ?","answer":"Nos sites vitrines démarrent à 8 000€, les boutiques e-commerce à 12 000€. Devis gratuit et transparent, sans frais cachés."}]',
 '[{"question":"Can you create an online store for a Fes artisan?","answer":"Yes, that''s exactly what we do. We create e-commerce shops that showcase Fes artisanal craftsmanship, with online payments, international shipping, and optimized SEO."},{"question":"Do Fes SMEs really need a website?","answer":"In 2026, yes. 87% of Moroccan consumers search online before buying. Without a digital presence, you''re invisible to most of your potential customers."},{"question":"What budget should I plan for a digital project in Fes?","answer":"Our showcase websites start at €8,000, e-commerce shops at €12,000. Free and transparent quote, no hidden fees."}]',
 true),

-- ── TANGER ──
((SELECT id FROM pseo_cities WHERE slug = 'tanger'), NULL, NULL,
 'Agence Digitale à Tanger',
 'Digital Agency in Tangier',
 'Agence Digitale à Tanger | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Tangier | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Tanger. Sites web, SaaS, automatisation et SEO pour les entreprises du nord du Maroc. Audit gratuit.',
 'Diez Agency, digital agency in Tangier. Websites, SaaS, automation and SEO for businesses in northern Morocco. Free audit.',
 'Tanger est en pleine transformation. Avec le port Tanger Med, les zones franches industrielles et un afflux d''investissements internationaux, la ville du détroit est devenue un pôle économique majeur.

Les entreprises tangéroises — qu''elles soient dans la logistique, l''industrie, le commerce ou les services — ont besoin d''une présence digitale qui reflète ce dynamisme. Diez Agency vous accompagne avec des solutions web modernes, des applications SaaS performantes et des automatisations IA qui font gagner du temps et de l''argent.

Notre approche : devis fixe, délais garantis, sprints de 2 semaines. Pas de jargon, pas de surprises.',
 'Tangier is in full transformation. With the Tanger Med port, industrial free zones, and a surge of international investment, the strait city has become a major economic hub.

Tangier businesses — whether in logistics, industry, commerce, or services — need a digital presence that reflects this dynamism. Diez Agency supports you with modern web solutions, high-performance SaaS applications, and AI automations that save time and money.

Our approach: fixed quote, guaranteed deadlines, 2-week sprints. No jargon, no surprises.',
 '[{"question":"Diez Agency est-elle basée à Tanger ?","answer":"Nous travaillons avec des clients dans tout le Maroc, dont de nombreuses entreprises tangéroises. Notre modèle 100% digital nous permet de collaborer efficacement à distance avec des résultats identiques."},{"question":"Quels types d''entreprises accompagnez-vous à Tanger ?","answer":"Des entreprises de logistique, des sociétés industrielles des zones franches, des commerces, des startups et des professions libérales. Tous les secteurs qui veulent se digitaliser."},{"question":"Proposez-vous des solutions pour l''import-export à Tanger ?","answer":"Oui, nous créons des plateformes B2B, des catalogues en ligne et des outils de suivi logistique adaptés aux besoins des entreprises d''import-export de la région."}]',
 '[{"question":"Is Diez Agency based in Tangier?","answer":"We work with clients across Morocco, including many Tangier-based businesses. Our 100% digital model allows us to collaborate effectively remotely with identical results."},{"question":"What types of businesses do you work with in Tangier?","answer":"Logistics companies, industrial firms in free zones, retail businesses, startups, and professionals. All sectors looking to go digital."},{"question":"Do you offer solutions for import-export in Tangier?","answer":"Yes, we create B2B platforms, online catalogs, and logistics tracking tools tailored to the needs of import-export businesses in the region."}]',
 true),

-- ── AGADIR ──
((SELECT id FROM pseo_cities WHERE slug = 'agadir'), NULL, NULL,
 'Agence Digitale à Agadir',
 'Digital Agency in Agadir',
 'Agence Digitale à Agadir | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Agadir | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Agadir. Sites web pour hôtels, tourisme et agriculture. Automatisation IA et SEO local. Audit gratuit.',
 'Diez Agency, digital agency in Agadir. Websites for hotels, tourism and agriculture. AI automation and local SEO. Free audit.',
 'Agadir est une ville aux multiples facettes : tourisme balnéaire, agriculture d''export, pêche et commerce. Chacun de ces secteurs peut bénéficier d''une présence digitale forte et d''outils modernes pour gagner en efficacité.

Diez Agency conçoit des solutions digitales adaptées au tissu économique gadiri. Sites de réservation pour hôtels et résidences, plateformes e-commerce pour les produits du terroir, outils d''automatisation pour les exploitations agricoles — nous livrons des outils qui génèrent un retour sur investissement concret.

Notre promesse : un audit gratuit pour comprendre vos besoins, un devis fixe sans surprise, et une livraison dans les délais garantis par contrat.',
 'Agadir is a multifaceted city: beach tourism, export agriculture, fishing, and commerce. Each of these sectors can benefit from a strong digital presence and modern tools to boost efficiency.

Diez Agency designs digital solutions tailored to Agadir''s economic fabric. Booking sites for hotels and resorts, e-commerce platforms for local products, automation tools for agricultural businesses — we deliver tools that generate concrete ROI.

Our promise: a free audit to understand your needs, a fixed quote with no surprises, and delivery within contractually guaranteed deadlines.',
 '[{"question":"Créez-vous des sites pour les hôtels et riads à Agadir ?","answer":"Oui, nous concevons des sites de réservation directe optimisés pour le SEO local, avec un design qui met en valeur votre établissement et réduit votre dépendance aux plateformes de réservation."},{"question":"Pouvez-vous aider les entreprises agricoles à se digitaliser ?","answer":"Absolument. Nous créons des sites vitrines, des plateformes B2B de mise en relation et des outils d''automatisation adaptés aux spécificités du secteur agricole."},{"question":"Combien coûtent vos services à Agadir ?","answer":"Nos projets démarrent à 8 000€. Le prix dépend de la complexité de votre besoin. Audit gratuit et devis détaillé en 24h."}]',
 '[{"question":"Do you create websites for hotels and riads in Agadir?","answer":"Yes, we design direct booking websites optimized for local SEO, with a design that showcases your property and reduces your dependency on booking platforms."},{"question":"Can you help agricultural businesses go digital?","answer":"Absolutely. We create showcase websites, B2B matchmaking platforms, and automation tools tailored to the specifics of the agricultural sector."},{"question":"How much do your services cost in Agadir?","answer":"Our projects start from €8,000. The price depends on the complexity of your needs. Free audit and detailed quote within 24h."}]',
 true),

-- ── MEKNES ──
((SELECT id FROM pseo_cities WHERE slug = 'meknes'), NULL, NULL,
 'Agence Digitale à Meknès',
 'Digital Agency in Meknes',
 'Agence Digitale à Meknès | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Meknes | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Meknès. Création de sites web, e-commerce et automatisation pour PME et commerces meknassis.',
 'Diez Agency, digital agency in Meknes. Website creation, e-commerce and automation for Meknes-based SMEs and businesses.',
 'Meknès, ville impériale au cœur du Maroc, vit une transformation économique portée par l''agriculture, le commerce et les services. Les PME meknassies qui adoptent le digital prennent une longueur d''avance sur leurs concurrents.

Diez Agency accompagne les entreprises de Meknès dans cette transition. Sites vitrines professionnels, boutiques en ligne, automatisation des tâches répétitives avec l''IA — nous construisons des outils simples et efficaces qui font la différence au quotidien.

Pas de jargon, pas de complexité inutile. Juste des solutions digitales qui marchent, livrées dans les délais et au prix convenu.',
 'Meknes, an imperial city in the heart of Morocco, is undergoing an economic transformation driven by agriculture, commerce, and services. Meknes SMEs that adopt digital take a step ahead of their competitors.

Diez Agency supports Meknes businesses through this transition. Professional showcase websites, online stores, AI-powered task automation — we build simple, effective tools that make a daily difference.

No jargon, no unnecessary complexity. Just digital solutions that work, delivered on time and at the agreed price.',
 '[{"question":"Diez Agency travaille-t-elle avec des PME à Meknès ?","answer":"Oui, les PME sont au cœur de notre clientèle. Nous comprenons les contraintes budgétaires et les besoins concrets des petites et moyennes entreprises."},{"question":"Quel type de site web pour un commerce à Meknès ?","answer":"Un site vitrine professionnel avec SEO local, fiche Google optimisée et design moderne. Livraison en 4 semaines, à partir de 8 000€."},{"question":"L''automatisation IA est-elle adaptée aux PME ?","answer":"Oui. Nos solutions d''automatisation sont conçues pour être simples et rentables. Par exemple, automatiser les relances clients ou la gestion des stocks ne nécessite pas un budget conséquent."}]',
 '[{"question":"Does Diez Agency work with SMEs in Meknes?","answer":"Yes, SMEs are at the heart of our clientele. We understand the budget constraints and concrete needs of small and medium businesses."},{"question":"What type of website for a Meknes business?","answer":"A professional showcase website with local SEO, optimized Google listing, and modern design. Delivered in 4 weeks, starting from €8,000."},{"question":"Is AI automation suitable for SMEs?","answer":"Yes. Our automation solutions are designed to be simple and cost-effective. For example, automating customer follow-ups or inventory management doesn''t require a large budget."}]',
 true),

-- ── OUJDA ──
((SELECT id FROM pseo_cities WHERE slug = 'oujda'), NULL, NULL,
 'Agence Digitale à Oujda',
 'Digital Agency in Oujda',
 'Agence Digitale à Oujda | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Oujda | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Oujda. Sites web, e-commerce et automatisation pour les entreprises de l''Oriental marocain.',
 'Diez Agency, digital agency in Oujda. Websites, e-commerce and automation for businesses in Morocco''s Oriental region.',
 'Oujda, capitale de l''Oriental, est un carrefour stratégique entre le Maroc, l''Algérie et l''Europe. Les entreprises oujdies — commerce, import-export, services — ont tout à gagner à se digitaliser pour conquérir des marchés au-delà de la région.

Diez Agency vous accompagne dans cette ambition. Sites web professionnels qui inspirent confiance, plateformes e-commerce qui vendent 24h/24, automatisations IA qui libèrent votre temps — nous construisons les outils qui accélèrent votre croissance.

Notre modèle 100% digital nous permet de travailler avec vous aussi efficacement qu''une agence locale, avec l''expertise d''une agence nationale.',
 'Oujda, capital of the Oriental region, is a strategic crossroads between Morocco, Algeria, and Europe. Oujda businesses — commerce, import-export, services — have everything to gain from going digital to conquer markets beyond the region.

Diez Agency supports you in this ambition. Professional websites that inspire trust, e-commerce platforms that sell 24/7, AI automations that free up your time — we build the tools that accelerate your growth.

Our 100% digital model allows us to work with you as effectively as a local agency, with the expertise of a national one.',
 '[{"question":"Travaillez-vous avec des entreprises à Oujda ?","answer":"Oui, notre modèle de travail 100% digital nous permet de collaborer avec des entreprises dans tout le Maroc, y compris à Oujda et dans toute la région de l''Oriental."},{"question":"Quels services proposez-vous aux entreprises d''Oujda ?","answer":"Création de sites web, boutiques e-commerce, automatisation des processus avec l''IA, et optimisation SEO pour améliorer votre visibilité en ligne."},{"question":"Comment se passe la communication à distance ?","answer":"Nous utilisons des outils collaboratifs modernes et travaillons en sprints de 2 semaines avec démos régulières. Vous voyez l''avancement de votre projet en temps réel."}]',
 '[{"question":"Do you work with businesses in Oujda?","answer":"Yes, our 100% digital work model allows us to collaborate with businesses across Morocco, including Oujda and the entire Oriental region."},{"question":"What services do you offer to Oujda businesses?","answer":"Website creation, e-commerce shops, AI-powered process automation, and SEO optimization to improve your online visibility."},{"question":"How does remote communication work?","answer":"We use modern collaborative tools and work in 2-week sprints with regular demos. You see your project''s progress in real time."}]',
 true),

-- ── KENITRA ──
((SELECT id FROM pseo_cities WHERE slug = 'kenitra'), NULL, NULL,
 'Agence Digitale à Kénitra',
 'Digital Agency in Kenitra',
 'Agence Digitale à Kénitra | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Kenitra | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Kénitra. Sites web, SaaS et automatisation pour les entreprises et industries de Kénitra. Audit gratuit.',
 'Diez Agency, digital agency in Kenitra. Websites, SaaS and automation for Kenitra businesses and industries. Free audit.',
 'Kénitra vit un boom industriel avec l''Atlantic Free Zone et l''arrivée de grands groupes internationaux. Cette croissance crée un besoin massif en solutions digitales — des sites web corporate aux applications métier, en passant par l''automatisation des processus.

Diez Agency est le partenaire digital des entreprises kénitranes. Nous concevons des sites web qui convertissent, des outils internes qui simplifient vos opérations, et des stratégies SEO qui vous rendent visible face à la concurrence.

Rejoignez les entreprises de Kénitra qui ont déjà choisi l''efficacité digitale.',
 'Kenitra is experiencing an industrial boom with the Atlantic Free Zone and the arrival of major international groups. This growth creates a massive need for digital solutions — from corporate websites to business applications to process automation.

Diez Agency is the digital partner for Kenitra businesses. We design websites that convert, internal tools that simplify your operations, and SEO strategies that make you visible against the competition.

Join the Kenitra businesses that have already chosen digital efficiency.',
 '[{"question":"Travaillez-vous avec les entreprises de l''Atlantic Free Zone ?","answer":"Oui, nous accompagnons des entreprises industrielles et de services dans leurs besoins digitaux : sites corporate, applications internes, automatisation de workflows."},{"question":"Quel est votre délai de livraison pour un site web ?","answer":"Un site vitrine professionnel est livré en 4-6 semaines. Délais garantis par contrat."},{"question":"Proposez-vous un audit gratuit ?","answer":"Oui, nous proposons un audit gratuit et sans engagement de votre présence digitale. Vous recevez un rapport détaillé avec des recommandations concrètes en 24h."}]',
 '[{"question":"Do you work with Atlantic Free Zone businesses?","answer":"Yes, we support industrial and service companies with their digital needs: corporate websites, internal applications, workflow automation."},{"question":"What is your delivery timeline for a website?","answer":"A professional showcase website is delivered in 4-6 weeks. Deadlines guaranteed by contract."},{"question":"Do you offer a free audit?","answer":"Yes, we offer a free, no-commitment audit of your digital presence. You receive a detailed report with concrete recommendations within 24h."}]',
 true),

-- ── TETOUAN ──
((SELECT id FROM pseo_cities WHERE slug = 'tetouan'), NULL, NULL,
 'Agence Digitale à Tétouan',
 'Digital Agency in Tetouan',
 'Agence Digitale à Tétouan | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Tetouan | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Tétouan. Création de sites web, e-commerce et SEO pour artisans, commerces et PME du nord du Maroc.',
 'Diez Agency, digital agency in Tetouan. Website creation, e-commerce and SEO for artisans, businesses and SMEs in northern Morocco.',
 'Tétouan, perle blanche du nord marocain, est une ville où tradition et modernité se côtoient. Les commerçants, artisans et entrepreneurs tétouanais sont de plus en plus nombreux à miser sur le digital pour développer leur activité.

Diez Agency vous accompagne dans cette transition. Sites vitrines élégants, boutiques en ligne pour vendre vos produits au-delà de la région, stratégie SEO pour être trouvé sur Google — nous livrons des résultats concrets.

Notre engagement : des délais respectés, un budget fixe et transparent, et un accompagnement humain à chaque étape.',
 'Tetouan, the white pearl of northern Morocco, is a city where tradition and modernity coexist. Tetouan merchants, artisans, and entrepreneurs are increasingly turning to digital to grow their business.

Diez Agency supports you through this transition. Elegant showcase websites, online stores to sell your products beyond the region, SEO strategy to be found on Google — we deliver concrete results.

Our commitment: respected deadlines, a fixed and transparent budget, and human support at every step.',
 '[{"question":"Pouvez-vous créer un site pour un artisan à Tétouan ?","answer":"Oui, nous créons des sites vitrines et des boutiques en ligne qui mettent en valeur le savoir-faire artisanal tétouanais, avec paiement en ligne et livraison internationale."},{"question":"Le SEO est-il utile pour les petits commerces ?","answer":"Très utile. Quand quelqu''un cherche un produit ou service à Tétouan, être en première page Google signifie plus de clients. Nous optimisons votre visibilité locale."},{"question":"Comment démarrer un projet avec vous ?","answer":"Simple : contactez-nous pour un audit gratuit. Nous analysons votre situation, proposons un devis fixe, et démarrons le projet dès validation."}]',
 '[{"question":"Can you create a website for a Tetouan artisan?","answer":"Yes, we create showcase websites and online stores that highlight Tetouan artisanal craftsmanship, with online payments and international shipping."},{"question":"Is SEO useful for small businesses?","answer":"Very useful. When someone searches for a product or service in Tetouan, being on the first page of Google means more customers. We optimize your local visibility."},{"question":"How do I start a project with you?","answer":"Simple: contact us for a free audit. We analyze your situation, propose a fixed quote, and start the project once validated."}]',
 true),

-- ── SALE ──
((SELECT id FROM pseo_cities WHERE slug = 'sale'), NULL, NULL,
 'Agence Digitale à Salé',
 'Digital Agency in Sale',
 'Agence Digitale à Salé | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Sale | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Salé. Sites web, applications et automatisation IA pour les entreprises et commerces de Salé.',
 'Diez Agency, digital agency in Sale. Websites, applications and AI automation for Sale businesses and shops.',
 'Salé, ville jumelle de Rabat, bénéficie de la dynamique de la capitale tout en conservant un tissu économique propre, fait de commerces, de PME et d''entreprises de services. La proximité du Technopolis crée un environnement favorable à l''innovation digitale.

Diez Agency aide les entreprises de Salé à tirer parti de cet écosystème. Sites web modernes qui inspirent confiance, applications métier qui simplifient vos opérations, automatisations qui vous font gagner des heures chaque semaine.

Rejoignez les entrepreneurs de Salé qui ont déjà fait le choix du digital avec Diez Agency.',
 'Sale, Rabat''s twin city, benefits from the capital''s momentum while maintaining its own economic fabric of shops, SMEs, and service companies. The proximity to Technopolis creates a favorable environment for digital innovation.

Diez Agency helps Sale businesses leverage this ecosystem. Modern websites that inspire trust, business applications that simplify your operations, automations that save you hours every week.

Join the Sale entrepreneurs who have already chosen digital with Diez Agency.',
 '[{"question":"Salé et Rabat sont-elles couvertes par les mêmes services ?","answer":"Oui, nous proposons exactement les mêmes services à Salé et Rabat. Notre expertise couvre toute la région Rabat-Salé-Kénitra."},{"question":"Quel type de projet pour une PME à Salé ?","answer":"Un site vitrine professionnel est le point de départ idéal. Ensuite, selon vos besoins : e-commerce, automatisation, application métier. Nous adaptons notre offre à votre budget."},{"question":"Travaillez-vous avec des entreprises de toutes tailles ?","answer":"Oui, des auto-entrepreneurs aux PME structurées. Nos solutions s''adaptent à chaque taille et chaque budget, à partir de 8 000€."}]',
 '[{"question":"Are Sale and Rabat covered by the same services?","answer":"Yes, we offer exactly the same services in Sale and Rabat. Our expertise covers the entire Rabat-Sale-Kenitra region."},{"question":"What type of project for a Sale SME?","answer":"A professional showcase website is the ideal starting point. Then, depending on your needs: e-commerce, automation, business application. We adapt our offer to your budget."},{"question":"Do you work with businesses of all sizes?","answer":"Yes, from solo entrepreneurs to structured SMEs. Our solutions adapt to every size and budget, starting from €8,000."}]',
 true),

-- ── NADOR ──
((SELECT id FROM pseo_cities WHERE slug = 'nador'), NULL, NULL,
 'Agence Digitale à Nador',
 'Digital Agency in Nador',
 'Agence Digitale à Nador | Diez Agency — Sites Web, SaaS & Automatisation IA',
 'Digital Agency in Nador | Diez Agency — Websites, SaaS & AI Automation',
 'Diez Agency, agence digitale à Nador. Sites web, e-commerce et automatisation pour les entreprises et commerçants du Rif.',
 'Diez Agency, digital agency in Nador. Websites, e-commerce and automation for businesses and merchants in the Rif region.',
 'Nador, porte du Rif sur la Méditerranée, est un hub commercial dynamique porté par le commerce, l''import-export et une diaspora active. Les entreprises nadories qui se digitalisent accèdent à des marchés bien au-delà de la région.

Diez Agency conçoit des solutions digitales pour les entrepreneurs de Nador. Sites web professionnels qui renforcent votre crédibilité, plateformes e-commerce qui vendent à l''international, outils d''automatisation qui optimisent vos opérations.

Notre modèle 100% digital garantit la même qualité de service que si nous étions à côté de vous. Audit gratuit, devis fixe, livraison garantie.',
 'Nador, the Rif''s gateway to the Mediterranean, is a dynamic commercial hub driven by commerce, import-export, and an active diaspora. Nador businesses that go digital gain access to markets well beyond the region.

Diez Agency designs digital solutions for Nador entrepreneurs. Professional websites that strengthen your credibility, e-commerce platforms that sell internationally, automation tools that optimize your operations.

Our 100% digital model guarantees the same service quality as if we were next door. Free audit, fixed quote, guaranteed delivery.',
 '[{"question":"Pouvez-vous aider une entreprise d''import-export à Nador ?","answer":"Oui, nous créons des plateformes B2B, des catalogues produits en ligne et des outils de suivi logistique adaptés aux entreprises d''import-export."},{"question":"Comment collaborez-vous avec des clients à Nador ?","answer":"100% en ligne : visioconférence, outils collaboratifs, sprints de 2 semaines avec démos. Vous suivez l''avancement en temps réel, comme si nous étions dans le même bureau."},{"question":"Vos prix sont-ils adaptés aux entreprises du Rif ?","answer":"Nos projets démarrent à 8 000€ avec un devis fixe et transparent. Nous proposons des solutions adaptées à chaque budget avec un ROI mesurable."}]',
 '[{"question":"Can you help an import-export business in Nador?","answer":"Yes, we create B2B platforms, online product catalogs, and logistics tracking tools tailored to import-export businesses."},{"question":"How do you collaborate with clients in Nador?","answer":"100% online: video calls, collaborative tools, 2-week sprints with demos. You track progress in real time, as if we were in the same office."},{"question":"Are your prices suitable for Rif businesses?","answer":"Our projects start at €8,000 with a fixed and transparent quote. We offer solutions adapted to every budget with measurable ROI."}]',
 true);

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

-- LLC Creation seed block removed (service discontinued)

-- ============================================================
-- Seed: Pages PSEO ville × service "llm-seo"
-- Exécuter dans Supabase SQL Editor (6ème)
-- ============================================================

INSERT INTO pseo_pages (city_id, service_slug, sector_id, title_fr, title_en, meta_title_fr, meta_title_en, meta_description_fr, meta_description_en, content_fr, content_en, faq_fr, faq_en, published) VALUES

-- Casablanca × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'casablanca'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Casablanca',
 'LLM SEO & AI Optimization in Casablanca',
 'LLM SEO à Casablanca | Diez Agency — Soyez cité par ChatGPT & Google AI',
 'LLM SEO in Casablanca | Diez Agency — Get Cited by ChatGPT & Google AI',
 'Optimisation LLM SEO à Casablanca. Soyez cité par ChatGPT, Perplexity et Google AI Overviews. +3x citations IA en 90 jours.',
 'LLM SEO optimization in Casablanca. Get cited by ChatGPT, Perplexity and Google AI Overviews. +3x AI citations in 90 days.',
 'Le SEO classique ne suffit plus. En 2026, 40% des recherches passent par des IA (ChatGPT, Perplexity, Google AI Overviews). Si votre entreprise casablancaise n''est pas optimisée pour ces nouveaux canaux, vous êtes invisible pour une part croissante de vos clients potentiels.

Diez Agency est pionnière en LLM SEO au Maroc. Nous optimisons votre contenu pour être cité par les modèles d''IA : données structurées (JSON-LD), autorité topique, clustering sémantique et schema markup avancé.

Résultat : +3x citations IA en 90 jours, +40% de trafic organique en 6 mois.',
 'Classic SEO is no longer enough. In 2026, 40% of searches go through AI (ChatGPT, Perplexity, Google AI Overviews). If your Casablanca business isn''t optimized for these new channels, you''re invisible to a growing share of potential customers.

Diez Agency is a pioneer in LLM SEO in Morocco. We optimize your content to be cited by AI models: structured data (JSON-LD), topical authority, semantic clustering, and advanced schema markup.

Result: +3x AI citations in 90 days, +40% organic traffic in 6 months.',
 '[{"question":"Qu''est-ce que le LLM SEO ?","answer":"Le LLM SEO optimise votre contenu pour être cité par les IA (ChatGPT, Perplexity, Google AI Overviews). C''est la nouvelle frontière du SEO en 2026."},{"question":"Combien de temps pour voir des résultats ?","answer":"+3x citations IA en 90 jours et +40% de trafic organique en 6 mois. Les premiers résultats apparaissent dès le premier mois."},{"question":"Le LLM SEO remplace-t-il le SEO classique ?","answer":"Non, il le complète. Nous optimisons à la fois pour Google classique ET pour les IA. Les deux canaux se renforcent mutuellement."}]',
 '[{"question":"What is LLM SEO?","answer":"LLM SEO optimizes your content to be cited by AI (ChatGPT, Perplexity, Google AI Overviews). It''s the new frontier of SEO in 2026."},{"question":"How long to see results?","answer":"+3x AI citations in 90 days and +40% organic traffic in 6 months. First results appear within the first month."},{"question":"Does LLM SEO replace traditional SEO?","answer":"No, it complements it. We optimize for both classic Google AND AI. Both channels reinforce each other."}]',
 true),

-- Rabat × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'rabat'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Rabat',
 'LLM SEO & AI Optimization in Rabat',
 'LLM SEO à Rabat | Diez Agency — Visibilité IA pour entreprises de la capitale',
 'LLM SEO in Rabat | Diez Agency — AI Visibility for Capital City Businesses',
 'LLM SEO à Rabat. Optimisez votre contenu pour ChatGPT et Google AI. Idéal pour startups, cabinets de conseil et institutions.',
 'LLM SEO in Rabat. Optimize your content for ChatGPT and Google AI. Ideal for startups, consulting firms and institutions.',
 'À Rabat, la concurrence digitale entre startups, cabinets de conseil et institutions est intense. Le LLM SEO vous donne un avantage décisif : être cité par les IA quand vos prospects cherchent une solution.

Nous déployons une stratégie complète : audit de votre visibilité IA actuelle, optimisation des données structurées, création de contenu à autorité topique, et suivi des citations ChatGPT/Perplexity.',
 'In Rabat, digital competition between startups, consulting firms, and institutions is intense. LLM SEO gives you a decisive advantage: being cited by AI when your prospects search for a solution.

We deploy a complete strategy: audit of your current AI visibility, structured data optimization, topical authority content creation, and ChatGPT/Perplexity citation tracking.',
 '[{"question":"Le LLM SEO est-il utile pour les institutions à Rabat ?","answer":"Oui. Quand quelqu''un demande à ChatGPT « meilleure agence de conseil à Rabat », vous voulez être dans la réponse. Le LLM SEO rend cela possible."},{"question":"Comment mesurez-vous les résultats ?","answer":"Nous trackons les citations IA (ChatGPT, Perplexity, Google AI Overviews), le trafic organique et les positions sur les mots-clés stratégiques."},{"question":"Quel budget pour le LLM SEO ?","answer":"Nos audits démarrent gratuitement. La stratégie complète est sur-mesure selon votre secteur et vos objectifs. Contactez-nous pour un devis."}]',
 '[{"question":"Is LLM SEO useful for Rabat institutions?","answer":"Yes. When someone asks ChatGPT ''best consulting agency in Rabat'', you want to be in the answer. LLM SEO makes this possible."},{"question":"How do you measure results?","answer":"We track AI citations (ChatGPT, Perplexity, Google AI Overviews), organic traffic, and positions on strategic keywords."},{"question":"What budget for LLM SEO?","answer":"Our audits start free. The full strategy is customized to your sector and goals. Contact us for a quote."}]',
 true),

-- Marrakech × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'marrakech'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Marrakech',
 'LLM SEO & AI Optimization in Marrakech',
 'LLM SEO à Marrakech | Diez Agency — Soyez recommandé par les IA aux touristes',
 'LLM SEO in Marrakech | Diez Agency — Get Recommended by AI to Tourists',
 'LLM SEO à Marrakech. Soyez recommandé par ChatGPT quand les touristes cherchent « meilleur riad Marrakech ». +3x citations IA.',
 'LLM SEO in Marrakech. Get recommended by ChatGPT when tourists search ''best riad Marrakech''. +3x AI citations.',
 'Imaginez : un touriste demande à ChatGPT « meilleur restaurant à Marrakech » et votre établissement est dans la réponse. C''est ça, le LLM SEO.

À Marrakech, où le tourisme est roi, être cité par les IA est un avantage compétitif massif. Nous optimisons votre présence pour que ChatGPT, Perplexity et Google AI vous recommandent naturellement.',
 'Imagine: a tourist asks ChatGPT "best restaurant in Marrakech" and your establishment is in the answer. That''s LLM SEO.

In Marrakech, where tourism is king, being cited by AI is a massive competitive advantage. We optimize your presence so ChatGPT, Perplexity, and Google AI naturally recommend you.',
 '[{"question":"Le LLM SEO fonctionne-t-il pour les hôtels et restaurants à Marrakech ?","answer":"Absolument. Les touristes utilisent de plus en plus ChatGPT et Perplexity pour planifier leurs voyages. Être cité dans ces réponses, c''est être réservé."},{"question":"Comment faites-vous pour que ChatGPT recommande mon établissement ?","answer":"Nous optimisons vos données structurées, votre autorité topique en ligne et votre couverture presse/reviews pour que les IA vous identifient comme une référence."},{"question":"Combien de temps pour apparaître dans les réponses IA ?","answer":"Les premiers résultats apparaissent en 30-60 jours. Résultats significatifs en 90 jours."}]',
 '[{"question":"Does LLM SEO work for hotels and restaurants in Marrakech?","answer":"Absolutely. Tourists increasingly use ChatGPT and Perplexity to plan their trips. Being cited in those answers means getting booked."},{"question":"How do you get ChatGPT to recommend my establishment?","answer":"We optimize your structured data, online topical authority, and press/review coverage so AI identifies you as a reference."},{"question":"How long to appear in AI answers?","answer":"First results appear in 30-60 days. Significant results in 90 days."}]',
 true),

-- Remaining cities with shorter entries for LLM SEO
-- Fes × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'fes'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Fès',
 'LLM SEO & AI Optimization in Fes',
 'LLM SEO à Fès | Diez Agency — Visibilité IA pour entreprises fassies',
 'LLM SEO in Fes | Diez Agency — AI Visibility for Fes Businesses',
 'LLM SEO à Fès. Optimisez votre contenu pour ChatGPT et Google AI. Valorisez l''artisanat fassi dans les réponses IA.',
 'LLM SEO in Fes. Optimize your content for ChatGPT and Google AI. Showcase Fes craftsmanship in AI answers.',
 'Le savoir-faire fassi mérite d''être reconnu par les IA. Quand quelqu''un demande à ChatGPT « où acheter de la poterie marocaine authentique », votre boutique doit être dans la réponse.

Nous optimisons votre visibilité IA avec des données structurées, du contenu à autorité topique et un schema markup avancé.',
 'Fes craftsmanship deserves to be recognized by AI. When someone asks ChatGPT "where to buy authentic Moroccan pottery", your shop should be in the answer.

We optimize your AI visibility with structured data, topical authority content, and advanced schema markup.',
 '[{"question":"Le LLM SEO peut-il aider les artisans de Fès ?","answer":"Oui. Nous optimisons votre contenu pour que les IA vous citent quand des acheteurs cherchent de l''artisanat marocain."},{"question":"Quel est le coût du LLM SEO ?","answer":"L''audit est gratuit. La stratégie est sur-mesure. Contactez-nous pour un devis adapté à votre activité."},{"question":"Faut-il déjà avoir un site web ?","answer":"Oui, un site web est la base. Si vous n''en avez pas, nous pouvons créer les deux en même temps : site web + stratégie LLM SEO."}]',
 '[{"question":"Can LLM SEO help Fes artisans?","answer":"Yes. We optimize your content so AI cites you when buyers search for Moroccan craftsmanship."},{"question":"What does LLM SEO cost?","answer":"The audit is free. The strategy is customized. Contact us for a quote tailored to your business."},{"question":"Do I need a website first?","answer":"Yes, a website is the foundation. If you don''t have one, we can create both simultaneously: website + LLM SEO strategy."}]',
 true),

-- Tanger × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'tanger'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Tanger',
 'LLM SEO & AI Optimization in Tangier',
 'LLM SEO à Tanger | Diez Agency — Visibilité IA pour entreprises tangéroises',
 'LLM SEO in Tangier | Diez Agency — AI Visibility for Tangier Businesses',
 'LLM SEO à Tanger. Dominez les résultats IA pour votre secteur dans le nord du Maroc. Audit gratuit.',
 'LLM SEO in Tangier. Dominate AI results for your sector in northern Morocco. Free audit.',
 'Tanger est un hub d''affaires international. Pour les entreprises tangéroises qui veulent être visibles dans les recherches IA, le LLM SEO est la stratégie gagnante.

Nous optimisons votre présence pour ChatGPT, Perplexity et Google AI Overviews avec une approche sur-mesure.',
 'Tangier is an international business hub. For Tangier businesses wanting to be visible in AI searches, LLM SEO is the winning strategy.

We optimize your presence for ChatGPT, Perplexity, and Google AI Overviews with a customized approach.',
 '[{"question":"Le LLM SEO fonctionne-t-il pour les entreprises B2B à Tanger ?","answer":"Oui, particulièrement. Les décideurs B2B utilisent de plus en plus les IA pour rechercher des fournisseurs et prestataires."},{"question":"Quels résultats attendre ?","answer":"+3x citations IA en 90 jours, +40% de trafic organique en 6 mois."},{"question":"Proposez-vous un audit gratuit ?","answer":"Oui, nous analysons gratuitement votre visibilité IA actuelle et vous proposons une stratégie sur-mesure."}]',
 '[{"question":"Does LLM SEO work for B2B businesses in Tangier?","answer":"Yes, particularly. B2B decision-makers increasingly use AI to search for suppliers and service providers."},{"question":"What results to expect?","answer":"+3x AI citations in 90 days, +40% organic traffic in 6 months."},{"question":"Do you offer a free audit?","answer":"Yes, we analyze your current AI visibility for free and propose a customized strategy."}]',
 true),

-- Agadir × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'agadir'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Agadir', 'LLM SEO & AI Optimization in Agadir',
 'LLM SEO à Agadir | Diez Agency', 'LLM SEO in Agadir | Diez Agency',
 'LLM SEO à Agadir. Soyez recommandé par ChatGPT pour le tourisme et les produits du terroir. Audit gratuit.',
 'LLM SEO in Agadir. Get recommended by ChatGPT for tourism and local products. Free audit.',
 'Agadir vit du tourisme et de l''agriculture. Quand un touriste ou un acheteur international demande une recommandation à ChatGPT, votre business doit apparaître. Le LLM SEO rend cela possible.',
 'Agadir thrives on tourism and agriculture. When a tourist or international buyer asks ChatGPT for a recommendation, your business should appear. LLM SEO makes this possible.',
 '[{"question":"Le LLM SEO aide-t-il les hôtels d''Agadir ?","answer":"Oui. Les voyageurs utilisent les IA pour planifier. Être cité = être réservé."},{"question":"Combien de temps pour des résultats ?","answer":"Premiers résultats en 30-60 jours, impact significatif en 90 jours."},{"question":"Faut-il un gros budget ?","answer":"Non, le LLM SEO est accessible. Audit gratuit pour commencer."}]',
 '[{"question":"Does LLM SEO help Agadir hotels?","answer":"Yes. Travelers use AI to plan. Being cited = being booked."},{"question":"How long for results?","answer":"First results in 30-60 days, significant impact in 90 days."},{"question":"Do I need a big budget?","answer":"No, LLM SEO is accessible. Free audit to get started."}]',
 true),

-- Meknes × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'meknes'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Meknès', 'LLM SEO & AI Optimization in Meknes',
 'LLM SEO à Meknès | Diez Agency', 'LLM SEO in Meknes | Diez Agency',
 'LLM SEO à Meknès. Rendez votre entreprise visible dans les réponses IA. Audit gratuit, résultats en 90 jours.',
 'LLM SEO in Meknes. Make your business visible in AI answers. Free audit, results in 90 days.',
 'Les PME de Meknès qui investissent dans le LLM SEO prennent de l''avance. Quand vos prospects interrogent ChatGPT sur votre secteur, vous devez être dans la réponse.',
 'Meknes SMEs investing in LLM SEO are getting ahead. When your prospects ask ChatGPT about your industry, you need to be in the answer.',
 '[{"question":"Le LLM SEO est-il adapté aux PME de Meknès ?","answer":"Oui, c''est même un avantage compétitif majeur pour les PME qui investissent tôt."},{"question":"Par où commencer ?","answer":"Par un audit gratuit de votre visibilité IA actuelle. Nous vous proposons ensuite une stratégie concrète."},{"question":"Quels résultats concrets ?","answer":"+3x citations IA en 90 jours. Le trafic organique suit dans les 6 mois."}]',
 '[{"question":"Is LLM SEO suitable for Meknes SMEs?","answer":"Yes, it''s a major competitive advantage for SMEs that invest early."},{"question":"Where to start?","answer":"With a free audit of your current AI visibility. We then propose a concrete strategy."},{"question":"What concrete results?","answer":"+3x AI citations in 90 days. Organic traffic follows within 6 months."}]',
 true),

-- Oujda × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'oujda'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Oujda', 'LLM SEO & AI Optimization in Oujda',
 'LLM SEO à Oujda | Diez Agency', 'LLM SEO in Oujda | Diez Agency',
 'LLM SEO à Oujda. Dominez les résultats IA dans l''Oriental marocain. Audit gratuit.',
 'LLM SEO in Oujda. Dominate AI results in Morocco''s Oriental region. Free audit.',
 'Les entreprises d''Oujda qui veulent être visibles au-delà de la région ont besoin du LLM SEO. Nous optimisons votre contenu pour les IA et Google.',
 'Oujda businesses wanting visibility beyond the region need LLM SEO. We optimize your content for AI and Google.',
 '[{"question":"Le LLM SEO fonctionne-t-il à Oujda ?","answer":"Oui, le LLM SEO fonctionne partout. Il optimise votre visibilité nationale et internationale, pas seulement locale."},{"question":"Comment ça marche concrètement ?","answer":"Audit → optimisation des données structurées → création de contenu à autorité topique → suivi des citations IA."},{"question":"Quel est le coût ?","answer":"Audit gratuit, stratégie sur-mesure. Contactez-nous pour un devis."}]',
 '[{"question":"Does LLM SEO work in Oujda?","answer":"Yes, LLM SEO works everywhere. It optimizes your national and international visibility, not just local."},{"question":"How does it work concretely?","answer":"Audit → structured data optimization → topical authority content creation → AI citation tracking."},{"question":"What''s the cost?","answer":"Free audit, customized strategy. Contact us for a quote."}]',
 true),

-- Kenitra × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'kenitra'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Kénitra', 'LLM SEO & AI Optimization in Kenitra',
 'LLM SEO à Kénitra | Diez Agency', 'LLM SEO in Kenitra | Diez Agency',
 'LLM SEO à Kénitra. Rendez votre entreprise visible dans ChatGPT et Google AI. Audit gratuit.',
 'LLM SEO in Kenitra. Make your business visible in ChatGPT and Google AI. Free audit.',
 'L''écosystème industriel de Kénitra gagne en maturité digitale. Le LLM SEO positionne vos entreprises dans les réponses IA des décideurs B2B.',
 'Kenitra''s industrial ecosystem is gaining digital maturity. LLM SEO positions your businesses in B2B decision-maker AI answers.',
 '[{"question":"Le LLM SEO est-il utile pour l''industrie ?","answer":"Très. Les acheteurs B2B utilisent de plus en plus les IA pour trouver des fournisseurs. Être cité = être contacté."},{"question":"Proposez-vous un audit ?","answer":"Oui, audit gratuit de votre visibilité IA en 24h."},{"question":"Quand verrai-je les résultats ?","answer":"Premiers résultats en 30-60 jours. Impact significatif en 90 jours."}]',
 '[{"question":"Is LLM SEO useful for industry?","answer":"Very. B2B buyers increasingly use AI to find suppliers. Being cited = being contacted."},{"question":"Do you offer an audit?","answer":"Yes, free AI visibility audit within 24h."},{"question":"When will I see results?","answer":"First results in 30-60 days. Significant impact in 90 days."}]',
 true),

-- Tetouan × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'tetouan'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Tétouan', 'LLM SEO & AI Optimization in Tetouan',
 'LLM SEO à Tétouan | Diez Agency', 'LLM SEO in Tetouan | Diez Agency',
 'LLM SEO à Tétouan. Soyez cité par ChatGPT pour vos produits et services. Audit gratuit.',
 'LLM SEO in Tetouan. Get cited by ChatGPT for your products and services. Free audit.',
 'Les artisans et commerces de Tétouan gagnent en visibilité grâce au LLM SEO. Optimisez votre présence pour les IA et touchez des clients au-delà du nord du Maroc.',
 'Tetouan artisans and businesses gain visibility through LLM SEO. Optimize your presence for AI and reach customers beyond northern Morocco.',
 '[{"question":"Comment le LLM SEO aide-t-il les artisans ?","answer":"En optimisant votre contenu pour que les IA vous citent quand des acheteurs cherchent de l''artisanat marocain."},{"question":"Faut-il un site web ?","answer":"Oui, c''est la base. Nous pouvons créer votre site et votre stratégie LLM SEO en même temps."},{"question":"Quel budget prévoir ?","answer":"Audit gratuit. Stratégie sur-mesure adaptée à votre budget."}]',
 '[{"question":"How does LLM SEO help artisans?","answer":"By optimizing your content so AI cites you when buyers search for Moroccan craftsmanship."},{"question":"Do I need a website?","answer":"Yes, it''s the foundation. We can create your website and LLM SEO strategy simultaneously."},{"question":"What budget to plan?","answer":"Free audit. Customized strategy adapted to your budget."}]',
 true),

-- Sale × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'sale'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Salé', 'LLM SEO & AI Optimization in Sale',
 'LLM SEO à Salé | Diez Agency', 'LLM SEO in Sale | Diez Agency',
 'LLM SEO à Salé. Optimisez votre visibilité IA dans la région Rabat-Salé. Audit gratuit.',
 'LLM SEO in Sale. Optimize your AI visibility in the Rabat-Sale region. Free audit.',
 'Les entreprises de Salé bénéficient de la proximité de Rabat pour le LLM SEO. Nous optimisons votre contenu pour dominer les réponses IA dans toute la région.',
 'Sale businesses benefit from Rabat''s proximity for LLM SEO. We optimize your content to dominate AI answers across the region.',
 '[{"question":"Le LLM SEO couvre-t-il Salé et Rabat ?","answer":"Oui, notre stratégie couvre toute la région. Être visible à Salé signifie être visible à Rabat et Kénitra aussi."},{"question":"Par où commencer ?","answer":"Un audit gratuit de votre visibilité IA. En 24h, vous savez où vous en êtes."},{"question":"Quels résultats attendre ?","answer":"+3x citations IA en 90 jours, +40% de trafic organique en 6 mois."}]',
 '[{"question":"Does LLM SEO cover Sale and Rabat?","answer":"Yes, our strategy covers the entire region. Being visible in Sale means being visible in Rabat and Kenitra too."},{"question":"Where to start?","answer":"A free audit of your AI visibility. Within 24h, you know where you stand."},{"question":"What results to expect?","answer":"+3x AI citations in 90 days, +40% organic traffic in 6 months."}]',
 true),

-- Nador × LLM SEO
((SELECT id FROM pseo_cities WHERE slug = 'nador'), 'llm-seo', NULL,
 'LLM SEO & Optimisation IA à Nador', 'LLM SEO & AI Optimization in Nador',
 'LLM SEO à Nador | Diez Agency', 'LLM SEO in Nador | Diez Agency',
 'LLM SEO à Nador. Rendez votre business du Rif visible dans les réponses IA. Audit gratuit.',
 'LLM SEO in Nador. Make your Rif business visible in AI answers. Free audit.',
 'Les entrepreneurs de Nador qui veulent rayonner au-delà du Rif ont besoin du LLM SEO. Nous optimisons votre présence pour que les IA vous recommandent.',
 'Nador entrepreneurs wanting to shine beyond the Rif need LLM SEO. We optimize your presence so AI recommends you.',
 '[{"question":"Le LLM SEO aide-t-il à l''export ?","answer":"Oui, en rendant votre entreprise visible dans les recherches IA internationales, vous attirez des clients au-delà du Maroc."},{"question":"Comment démarrer ?","answer":"Audit gratuit en 24h. Nous analysons votre visibilité IA et proposons un plan d''action concret."},{"question":"Quel budget ?","answer":"Stratégie sur-mesure adaptée à votre budget. L''audit est gratuit et sans engagement."}]',
 '[{"question":"Does LLM SEO help with exports?","answer":"Yes, by making your business visible in international AI searches, you attract clients beyond Morocco."},{"question":"How to get started?","answer":"Free audit within 24h. We analyze your AI visibility and propose a concrete action plan."},{"question":"What budget?","answer":"Customized strategy adapted to your budget. The audit is free and non-binding."}]',
 true);

-- ============================================================
-- Seed: Pages PSEO ville × service "agent-automation"
-- Exécuter dans Supabase SQL Editor (7ème)
-- ============================================================

INSERT INTO pseo_pages (city_id, service_slug, sector_id, title_fr, title_en, meta_title_fr, meta_title_en, meta_description_fr, meta_description_en, content_fr, content_en, faq_fr, faq_en, published) VALUES

-- Casablanca × Automation
((SELECT id FROM pseo_cities WHERE slug = 'casablanca'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Casablanca',
 'AI Automation & Intelligent Agents in Casablanca',
 'Automatisation IA à Casablanca | Diez Agency — Agents IA pour automatiser votre business',
 'AI Automation in Casablanca | Diez Agency — AI Agents to Automate Your Business',
 'Automatisation IA à Casablanca. Agents intelligents pour vos processus métier : qualification leads, emails, reporting. -80% de tâches manuelles.',
 'AI automation in Casablanca. Intelligent agents for your business processes: lead qualification, emails, reporting. -80% manual tasks.',
 'Les entreprises casablancaises perdent des heures chaque jour sur des tâches répétitives : qualification de leads, envoi d''emails, saisie de données, génération de rapports. L''automatisation IA change la donne.

Diez Agency déploie des agents IA autonomes qui prennent en charge ces tâches 24h/24. Vos équipes se concentrent sur ce qui compte : la stratégie, la relation client, la croissance.

Nos outils : Make (Integromat), n8n, LangChain, OpenAI API. ROI moyen : 3 mois. Temps économisé : -80% sur les tâches manuelles.',
 'Casablanca businesses waste hours every day on repetitive tasks: lead qualification, sending emails, data entry, report generation. AI automation changes the game.

Diez Agency deploys autonomous AI agents that handle these tasks 24/7. Your teams focus on what matters: strategy, client relationships, growth.

Our tools: Make (Integromat), n8n, LangChain, OpenAI API. Average ROI: 3 months. Time saved: -80% on manual tasks.',
 '[{"question":"Quels processus peut-on automatiser à Casablanca ?","answer":"Qualification de leads, relances email, saisie CRM, génération de rapports, suivi de commandes, support client niveau 1 — pratiquement toute tâche répétitive."},{"question":"Combien de temps pour déployer une automatisation ?","answer":"Les premières automatisations sont opérationnelles en 2-4 semaines. Les projets complexes en 6-8 semaines."},{"question":"Quel est le ROI de l''automatisation IA ?","answer":"En moyenne, le ROI est atteint en 3 mois. Les équipes commerciales récupèrent 40% de leur temps sur les tâches admin."}]',
 '[{"question":"What processes can be automated in Casablanca?","answer":"Lead qualification, email follow-ups, CRM data entry, report generation, order tracking, level 1 customer support — virtually any repetitive task."},{"question":"How long to deploy an automation?","answer":"First automations are operational in 2-4 weeks. Complex projects in 6-8 weeks."},{"question":"What''s the ROI of AI automation?","answer":"On average, ROI is achieved in 3 months. Sales teams reclaim 40% of their time from admin tasks."}]',
 true),

-- Rabat × Automation
((SELECT id FROM pseo_cities WHERE slug = 'rabat'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Rabat',
 'AI Automation & Intelligent Agents in Rabat',
 'Automatisation IA à Rabat | Diez Agency — Agents IA pour startups et institutions',
 'AI Automation in Rabat | Diez Agency — AI Agents for Startups and Institutions',
 'Automatisation IA à Rabat. Agents intelligents pour startups, institutions et entreprises. Workflows automatisés, -80% de tâches manuelles.',
 'AI automation in Rabat. Intelligent agents for startups, institutions and businesses. Automated workflows, -80% manual tasks.',
 'Rabat est le cœur administratif du Maroc. Les institutions, startups et entreprises de la capitale traitent des volumes massifs de données et de workflows manuels. L''automatisation IA transforme ces goulots d''étranglement en processus fluides.

Nous déployons des agents IA qui automatisent la qualification de leads, le traitement des demandes, la génération de documents et le reporting. Résultat : vos équipes sont 40% plus productives.',
 'Rabat is Morocco''s administrative heart. Institutions, startups, and capital-city businesses handle massive volumes of data and manual workflows. AI automation transforms these bottlenecks into smooth processes.

We deploy AI agents that automate lead qualification, request processing, document generation, and reporting. Result: your teams are 40% more productive.',
 '[{"question":"L''automatisation IA est-elle adaptée aux institutions de Rabat ?","answer":"Oui. Traitement automatique des demandes, classification de documents, génération de rapports — l''IA excelle sur les tâches administratives à haut volume."},{"question":"Quels outils utilisez-vous ?","answer":"Make (Integromat), n8n, LangChain et les API OpenAI. Nous choisissons les outils en fonction de vos contraintes de sécurité et d''intégration."},{"question":"Faut-il des compétences techniques pour maintenir les automatisations ?","answer":"Non, nous concevons des workflows faciles à comprendre et à maintenir. Et nous proposons un support continu."}]',
 '[{"question":"Is AI automation suitable for Rabat institutions?","answer":"Yes. Automatic request processing, document classification, report generation — AI excels at high-volume administrative tasks."},{"question":"What tools do you use?","answer":"Make (Integromat), n8n, LangChain, and OpenAI APIs. We choose tools based on your security and integration requirements."},{"question":"Do I need technical skills to maintain automations?","answer":"No, we design workflows that are easy to understand and maintain. And we offer ongoing support."}]',
 true),

-- Marrakech × Automation
((SELECT id FROM pseo_cities WHERE slug = 'marrakech'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Marrakech',
 'AI Automation & Intelligent Agents in Marrakech',
 'Automatisation IA à Marrakech | Diez Agency — Automatisez votre hôtel ou restaurant',
 'AI Automation in Marrakech | Diez Agency — Automate Your Hotel or Restaurant',
 'Automatisation IA à Marrakech. Agents IA pour hôtels, restaurants et commerce : réservations, relances clients, reporting automatique.',
 'AI automation in Marrakech. AI agents for hotels, restaurants and retail: bookings, client follow-ups, automatic reporting.',
 'À Marrakech, les hôtels, restaurants et commerces gèrent des flux constants de clients et de demandes. L''automatisation IA prend en charge les tâches répétitives pour que vos équipes se concentrent sur l''expérience client.

Réponses automatiques aux demandes de réservation, relances clients post-séjour, gestion des avis en ligne, reporting quotidien — tout peut être automatisé.',
 'In Marrakech, hotels, restaurants, and shops handle constant flows of customers and requests. AI automation handles repetitive tasks so your teams focus on the customer experience.

Automatic responses to booking requests, post-stay client follow-ups, online review management, daily reporting — everything can be automated.',
 '[{"question":"Quelles tâches hôtelières peut-on automatiser ?","answer":"Réponses aux demandes de réservation, emails de confirmation et de relance, gestion des avis TripAdvisor/Google, reporting d''occupation, facturation."},{"question":"L''automatisation remplace-t-elle le personnel ?","answer":"Non, elle libère votre personnel des tâches admin pour qu''il se concentre sur l''accueil et l''expérience client — ce qui compte vraiment dans l''hôtellerie."},{"question":"Quel est le coût ?","answer":"Les premières automatisations sont déployées en 2-4 semaines. Le ROI est atteint en 3 mois grâce au temps économisé."}]',
 '[{"question":"What hotel tasks can be automated?","answer":"Booking request responses, confirmation and follow-up emails, TripAdvisor/Google review management, occupancy reporting, invoicing."},{"question":"Does automation replace staff?","answer":"No, it frees your staff from admin tasks to focus on hospitality and guest experience — what truly matters in the hotel industry."},{"question":"What''s the cost?","answer":"First automations are deployed in 2-4 weeks. ROI is achieved in 3 months through time saved."}]',
 true),

-- Fes × Automation
((SELECT id FROM pseo_cities WHERE slug = 'fes'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Fès',
 'AI Automation & Intelligent Agents in Fes',
 'Automatisation IA à Fès | Diez Agency', 'AI Automation in Fes | Diez Agency',
 'Automatisation IA à Fès. Agents intelligents pour PME fassies : gestion des commandes, relances, reporting automatique.',
 'AI automation in Fes. Intelligent agents for Fes SMEs: order management, follow-ups, automatic reporting.',
 'Les PME de Fès qui adoptent l''automatisation IA gagnent un avantage compétitif décisif. Fini les heures perdues en saisie manuelle, relances oubliées et rapports laborieux.

Nos agents IA prennent en charge vos tâches répétitives : gestion de stock, relances clients, suivi de commandes, reporting. Simple, efficace, rentable en 3 mois.',
 'Fes SMEs adopting AI automation gain a decisive competitive advantage. No more hours lost to manual data entry, forgotten follow-ups, and laborious reports.

Our AI agents handle your repetitive tasks: inventory management, client follow-ups, order tracking, reporting. Simple, effective, profitable in 3 months.',
 '[{"question":"L''automatisation est-elle adaptée aux PME de Fès ?","answer":"Oui, nos solutions sont conçues pour être simples et rentables, même avec un budget limité."},{"question":"Quelles tâches automatiser en priorité ?","answer":"Les relances clients, la saisie de données et le reporting. Ce sont les tâches qui consomment le plus de temps pour le moins de valeur ajoutée."},{"question":"Le ROI est-il rapide ?","answer":"Oui, en moyenne 3 mois. Les premières économies de temps sont visibles dès les premières semaines."}]',
 '[{"question":"Is automation suitable for Fes SMEs?","answer":"Yes, our solutions are designed to be simple and cost-effective, even with a limited budget."},{"question":"What tasks to automate first?","answer":"Client follow-ups, data entry, and reporting. These are the tasks that consume the most time for the least added value."},{"question":"Is ROI quick?","answer":"Yes, on average 3 months. First time savings are visible within the first weeks."}]',
 true),

-- Tanger × Automation
((SELECT id FROM pseo_cities WHERE slug = 'tanger'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Tanger',
 'AI Automation & Intelligent Agents in Tangier',
 'Automatisation IA à Tanger | Diez Agency', 'AI Automation in Tangier | Diez Agency',
 'Automatisation IA à Tanger. Agents intelligents pour logistique, industrie et commerce. Workflows automatisés, ROI en 3 mois.',
 'AI automation in Tangier. Intelligent agents for logistics, industry and commerce. Automated workflows, ROI in 3 months.',
 'Tanger, hub logistique et industriel, génère des volumes massifs de données et de processus. L''automatisation IA optimise vos opérations : suivi logistique, qualification de leads, reporting automatique, gestion des commandes.

Nous déployons des agents IA adaptés aux besoins des entreprises tangéroises — industrie, logistique, import-export.',
 'Tangier, a logistics and industrial hub, generates massive volumes of data and processes. AI automation optimizes your operations: logistics tracking, lead qualification, automatic reporting, order management.

We deploy AI agents adapted to the needs of Tangier businesses — industry, logistics, import-export.',
 '[{"question":"L''automatisation aide-t-elle la logistique à Tanger ?","answer":"Absolument. Suivi de colis, alertes de stock, reporting automatique — l''IA gère les flux en temps réel."},{"question":"Quels outils utilisez-vous ?","answer":"Make, n8n, LangChain et les API OpenAI. Nous intégrons avec vos outils existants (ERP, CRM, email)."},{"question":"Combien de temps pour le déploiement ?","answer":"2-4 semaines pour les premières automatisations. Projets complexes en 6-8 semaines."}]',
 '[{"question":"Does automation help logistics in Tangier?","answer":"Absolutely. Package tracking, stock alerts, automatic reporting — AI manages flows in real time."},{"question":"What tools do you use?","answer":"Make, n8n, LangChain, and OpenAI APIs. We integrate with your existing tools (ERP, CRM, email)."},{"question":"How long for deployment?","answer":"2-4 weeks for first automations. Complex projects in 6-8 weeks."}]',
 true),

-- Agadir × Automation
((SELECT id FROM pseo_cities WHERE slug = 'agadir'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Agadir',
 'AI Automation & Intelligent Agents in Agadir',
 'Automatisation IA à Agadir | Diez Agency', 'AI Automation in Agadir | Diez Agency',
 'Automatisation IA à Agadir. Agents intelligents pour tourisme, agriculture et commerce. -80% de tâches manuelles.',
 'AI automation in Agadir. Intelligent agents for tourism, agriculture and commerce. -80% manual tasks.',
 'Les entreprises d''Agadir — hôtels, exploitations agricoles, exportateurs — gèrent des processus manuels chronophages. L''automatisation IA libère du temps et réduit les erreurs.

Réservations automatisées, suivi des commandes export, reporting agricole, relances clients — nos agents IA travaillent 24h/24.',
 'Agadir businesses — hotels, farms, exporters — manage time-consuming manual processes. AI automation frees up time and reduces errors.

Automated bookings, export order tracking, agricultural reporting, client follow-ups — our AI agents work 24/7.',
 '[{"question":"L''automatisation aide-t-elle l''agriculture à Agadir ?","answer":"Oui. Suivi des commandes, reporting de production, relances fournisseurs — tout peut être automatisé."},{"question":"Faut-il des outils spécifiques ?","answer":"Non, nous intégrons avec vos outils existants. Si vous n''en avez pas, nous recommandons des solutions simples et abordables."},{"question":"Quel est le ROI ?","answer":"3 mois en moyenne. Les premières économies sont visibles dès les premières semaines."}]',
 '[{"question":"Does automation help agriculture in Agadir?","answer":"Yes. Order tracking, production reporting, supplier follow-ups — everything can be automated."},{"question":"Do I need specific tools?","answer":"No, we integrate with your existing tools. If you don''t have any, we recommend simple and affordable solutions."},{"question":"What''s the ROI?","answer":"3 months on average. First savings are visible within the first weeks."}]',
 true),

-- Meknes × Automation
((SELECT id FROM pseo_cities WHERE slug = 'meknes'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Meknès',
 'AI Automation & Intelligent Agents in Meknes',
 'Automatisation IA à Meknès | Diez Agency', 'AI Automation in Meknes | Diez Agency',
 'Automatisation IA à Meknès. Agents intelligents pour PME meknassies. Simplifiez vos opérations, gagnez du temps.',
 'AI automation in Meknes. Intelligent agents for Meknes SMEs. Simplify operations, save time.',
 'Les PME de Meknès peuvent se libérer des tâches répétitives grâce à l''automatisation IA. Relances, saisie, reporting — laissez les agents IA s''en occuper.',
 'Meknes SMEs can free themselves from repetitive tasks through AI automation. Follow-ups, data entry, reporting — let AI agents handle it.',
 '[{"question":"C''est adapté à une petite PME ?","answer":"Oui, nos solutions démarrent simple et évoluent avec vous. Pas besoin d''un gros budget."},{"question":"Quels processus automatiser ?","answer":"Commencez par les relances clients et le reporting. Ce sont les quick wins les plus rentables."},{"question":"Combien ça coûte ?","answer":"Les premières automatisations sont accessibles. Contactez-nous pour un audit gratuit de vos processus."}]',
 '[{"question":"Is it suitable for a small SME?","answer":"Yes, our solutions start simple and scale with you. No large budget needed."},{"question":"What processes to automate?","answer":"Start with client follow-ups and reporting. These are the most profitable quick wins."},{"question":"How much does it cost?","answer":"First automations are accessible. Contact us for a free process audit."}]',
 true),

-- Oujda × Automation
((SELECT id FROM pseo_cities WHERE slug = 'oujda'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Oujda',
 'AI Automation & Intelligent Agents in Oujda',
 'Automatisation IA à Oujda | Diez Agency', 'AI Automation in Oujda | Diez Agency',
 'Automatisation IA à Oujda. Agents intelligents pour commerce et import-export dans l''Oriental.',
 'AI automation in Oujda. Intelligent agents for commerce and import-export in the Oriental region.',
 'Les entreprises d''Oujda, notamment dans l''import-export et le commerce, gèrent des workflows complexes. L''automatisation IA simplifie ces processus et vous fait gagner un temps précieux.',
 'Oujda businesses, especially in import-export and commerce, manage complex workflows. AI automation simplifies these processes and saves you valuable time.',
 '[{"question":"L''automatisation aide-t-elle l''import-export ?","answer":"Oui. Suivi de commandes, alertes douanières, relances fournisseurs, reporting — tout peut être automatisé."},{"question":"Travaillez-vous à distance ?","answer":"Oui, 100% en ligne. Le déploiement et le support se font entièrement à distance."},{"question":"Par où commencer ?","answer":"Un audit gratuit de vos processus. Nous identifions les tâches à automatiser en priorité."}]',
 '[{"question":"Does automation help import-export?","answer":"Yes. Order tracking, customs alerts, supplier follow-ups, reporting — everything can be automated."},{"question":"Do you work remotely?","answer":"Yes, 100% online. Deployment and support are entirely remote."},{"question":"Where to start?","answer":"A free audit of your processes. We identify priority tasks to automate."}]',
 true),

-- Kenitra × Automation
((SELECT id FROM pseo_cities WHERE slug = 'kenitra'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Kénitra',
 'AI Automation & Intelligent Agents in Kenitra',
 'Automatisation IA à Kénitra | Diez Agency', 'AI Automation in Kenitra | Diez Agency',
 'Automatisation IA à Kénitra. Agents intelligents pour l''industrie et les entreprises de l''Atlantic Free Zone.',
 'AI automation in Kenitra. Intelligent agents for industry and Atlantic Free Zone businesses.',
 'L''écosystème industriel de Kénitra génère des processus complexes et des volumes de données importants. L''automatisation IA optimise ces opérations à grande échelle.',
 'Kenitra''s industrial ecosystem generates complex processes and significant data volumes. AI automation optimizes these operations at scale.',
 '[{"question":"L''automatisation est-elle utile pour l''industrie ?","answer":"Oui, particulièrement pour le suivi de production, le contrôle qualité, le reporting et la gestion des workflows inter-équipes."},{"question":"Intégrez-vous avec les ERP existants ?","answer":"Oui, nous connectons nos agents IA avec vos outils existants (SAP, Odoo, etc.) via des API."},{"question":"Quel délai de déploiement ?","answer":"2-4 semaines pour les premières automatisations. Projets industriels complexes en 6-8 semaines."}]',
 '[{"question":"Is automation useful for industry?","answer":"Yes, particularly for production tracking, quality control, reporting, and cross-team workflow management."},{"question":"Do you integrate with existing ERPs?","answer":"Yes, we connect our AI agents with your existing tools (SAP, Odoo, etc.) via APIs."},{"question":"What deployment timeline?","answer":"2-4 weeks for first automations. Complex industrial projects in 6-8 weeks."}]',
 true),

-- Tetouan × Automation
((SELECT id FROM pseo_cities WHERE slug = 'tetouan'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Tétouan',
 'AI Automation & Intelligent Agents in Tetouan',
 'Automatisation IA à Tétouan | Diez Agency', 'AI Automation in Tetouan | Diez Agency',
 'Automatisation IA à Tétouan. Simplifiez les processus de votre PME avec des agents intelligents.',
 'AI automation in Tetouan. Simplify your SME processes with intelligent agents.',
 'Les commerces et PME de Tétouan gagnent en efficacité grâce à l''automatisation IA. Relances, gestion de stock, reporting — les agents IA s''en occupent.',
 'Tetouan shops and SMEs gain efficiency through AI automation. Follow-ups, inventory management, reporting — AI agents handle it.',
 '[{"question":"Quels commerces bénéficient de l''automatisation ?","answer":"Tous. Relances clients, suivi de stock, emails de promotion, reporting de ventes — l''IA gère les tâches répétitives."},{"question":"C''est compliqué à mettre en place ?","answer":"Non, nous gérons tout le déploiement. Vos équipes reçoivent une formation simple pour utiliser les automatisations."},{"question":"Quel budget ?","answer":"Solutions accessibles aux PME. Audit gratuit pour identifier vos besoins."}]',
 '[{"question":"What businesses benefit from automation?","answer":"All of them. Client follow-ups, stock tracking, promotional emails, sales reporting — AI handles repetitive tasks."},{"question":"Is it complicated to set up?","answer":"No, we handle all deployment. Your teams receive simple training to use the automations."},{"question":"What budget?","answer":"SME-accessible solutions. Free audit to identify your needs."}]',
 true),

-- Sale × Automation
((SELECT id FROM pseo_cities WHERE slug = 'sale'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Salé',
 'AI Automation & Intelligent Agents in Sale',
 'Automatisation IA à Salé | Diez Agency', 'AI Automation in Sale | Diez Agency',
 'Automatisation IA à Salé. Agents intelligents pour les entreprises de la région Rabat-Salé.',
 'AI automation in Sale. Intelligent agents for Rabat-Sale region businesses.',
 'Les entreprises de Salé bénéficient de l''automatisation IA pour gagner en productivité. Nos agents IA remplacent les tâches manuelles par des workflows intelligents.',
 'Sale businesses benefit from AI automation to boost productivity. Our AI agents replace manual tasks with intelligent workflows.',
 '[{"question":"Les solutions couvrent-elles Salé et Rabat ?","answer":"Oui, nous travaillons avec des clients dans toute la région. Même qualité, même support."},{"question":"Quels sont les quick wins ?","answer":"Automatiser les relances email et le reporting. Résultats visibles en 2 semaines."},{"question":"Comment démarrer ?","answer":"Audit gratuit de vos processus. Nous identifions les gains rapides et construisons un plan d''action."}]',
 '[{"question":"Do solutions cover Sale and Rabat?","answer":"Yes, we work with clients across the region. Same quality, same support."},{"question":"What are the quick wins?","answer":"Automating email follow-ups and reporting. Results visible in 2 weeks."},{"question":"How to get started?","answer":"Free process audit. We identify quick wins and build an action plan."}]',
 true),

-- Nador × Automation
((SELECT id FROM pseo_cities WHERE slug = 'nador'), 'agent-automation', NULL,
 'Automatisation IA & Agents Intelligents à Nador',
 'AI Automation & Intelligent Agents in Nador',
 'Automatisation IA à Nador | Diez Agency', 'AI Automation in Nador | Diez Agency',
 'Automatisation IA à Nador. Agents intelligents pour le commerce et l''import-export du Rif.',
 'AI automation in Nador. Intelligent agents for Rif commerce and import-export.',
 'Les entrepreneurs de Nador automatisent leurs processus pour gagner en compétitivité. Suivi de commandes, relances, reporting — les agents IA travaillent pour vous 24h/24.',
 'Nador entrepreneurs automate their processes to gain competitiveness. Order tracking, follow-ups, reporting — AI agents work for you 24/7.',
 '[{"question":"L''automatisation est-elle utile pour le commerce à Nador ?","answer":"Très. Suivi de commandes, relances clients, gestion de stock automatique — vous gagnez des heures chaque jour."},{"question":"Tout se fait à distance ?","answer":"Oui, déploiement et support 100% en ligne. La qualité est identique."},{"question":"Quel est le premier pas ?","answer":"Un audit gratuit de vos processus. En 24h, nous identifions les tâches à automatiser en priorité."}]',
 '[{"question":"Is automation useful for commerce in Nador?","answer":"Very. Order tracking, client follow-ups, automatic inventory management — you save hours every day."},{"question":"Is everything done remotely?","answer":"Yes, deployment and support 100% online. Quality is identical."},{"question":"What''s the first step?","answer":"A free audit of your processes. Within 24h, we identify priority tasks to automate."}]',
 true);
