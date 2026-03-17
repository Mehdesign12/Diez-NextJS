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
