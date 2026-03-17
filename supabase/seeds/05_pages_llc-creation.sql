-- ============================================================
-- Seed: Pages PSEO ville × service "llc-creation"
-- Exécuter dans Supabase SQL Editor (5ème)
-- ============================================================

INSERT INTO pseo_pages (city_id, service_slug, sector_id, title_fr, title_en, meta_title_fr, meta_title_en, meta_description_fr, meta_description_en, content_fr, content_en, faq_fr, faq_en, published) VALUES

-- Casablanca × LLC
((SELECT id FROM pseo_cities WHERE slug = 'casablanca'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Casablanca',
 'US LLC Creation from Casablanca',
 'Création de LLC Américaine depuis Casablanca | Diez Agency',
 'US LLC Creation from Casablanca | Diez Agency',
 'Créez votre LLC américaine depuis Casablanca en 72h. Formation complète, EIN, compte bancaire US et Stripe. 100% en ligne, zéro déplacement.',
 'Create your US LLC from Casablanca in 72h. Full formation, EIN, US bank account and Stripe. 100% online, zero travel.',
 'Casablanca est le hub entrepreneurial du Maroc. De plus en plus d''entrepreneurs casablancais cherchent à créer une structure aux États-Unis pour accéder à Stripe, PayPal US et aux marchés internationaux.

Diez Agency vous accompagne dans la création complète de votre LLC américaine, 100% en ligne depuis Casablanca. En 72 heures, vous avez : l''enregistrement dans l''État de votre choix (Wyoming, Delaware), votre EIN (numéro fiscal), un compte bancaire US et l''accès à Stripe US.

Pas de voyage, pas de paperasse complexe. Nous gérons tout de A à Z.',
 'Casablanca is Morocco''s entrepreneurial hub. More and more Casablanca entrepreneurs are looking to create a US business structure to access Stripe, PayPal US, and international markets.

Diez Agency supports you through the complete creation of your US LLC, 100% online from Casablanca. In 72 hours, you have: state registration (Wyoming, Delaware), your EIN (tax number), a US bank account, and access to Stripe US.

No travel, no complex paperwork. We handle everything from A to Z.',
 '[{"question":"Puis-je créer une LLC américaine depuis Casablanca ?","answer":"Oui, 100%. Le processus est entièrement en ligne. Nous gérons l''enregistrement, l''EIN, le compte bancaire US et le registered agent. Vous n''avez pas besoin de quitter Casablanca."},{"question":"Combien de temps faut-il ?","answer":"72 heures pour l''enregistrement complet de la LLC. L''EIN et le compte bancaire prennent 1-2 semaines supplémentaires selon la banque."},{"question":"Quel est l''avantage d''une LLC pour un entrepreneur marocain ?","answer":"Accès à Stripe US (pas de restrictions), PayPal US, crédibilité internationale, et optimisation fiscale légale. C''est indispensable pour vendre des services SaaS ou digitaux à l''international."}]',
 '[{"question":"Can I create a US LLC from Casablanca?","answer":"Yes, 100%. The process is entirely online. We handle registration, EIN, US bank account, and registered agent. You don''t need to leave Casablanca."},{"question":"How long does it take?","answer":"72 hours for full LLC registration. The EIN and bank account take 1-2 additional weeks depending on the bank."},{"question":"What''s the advantage of an LLC for a Moroccan entrepreneur?","answer":"Access to Stripe US (no restrictions), PayPal US, international credibility, and legal tax optimization. It''s essential for selling SaaS or digital services internationally."}]',
 true),

-- Rabat × LLC
((SELECT id FROM pseo_cities WHERE slug = 'rabat'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Rabat',
 'US LLC Creation from Rabat',
 'Création de LLC Américaine depuis Rabat | Diez Agency',
 'US LLC Creation from Rabat | Diez Agency',
 'Créez votre LLC américaine depuis Rabat en 72h. Formation, EIN, compte bancaire US. Idéal pour freelances et startups de la capitale.',
 'Create your US LLC from Rabat in 72h. Formation, EIN, US bank account. Ideal for freelancers and capital-city startups.',
 'Les freelances et startups de Rabat qui vendent des services digitaux à l''international ont souvent besoin d''une structure américaine pour accéder aux outils de paiement US et gagner en crédibilité.

Nous créons votre LLC en 72h, avec tout ce qu''il faut : enregistrement officiel, EIN, compte bancaire US, Operating Agreement. Vous pouvez ensuite accepter des paiements via Stripe US, PayPal US et facturer en dollars.',
 'Rabat freelancers and startups selling digital services internationally often need a US business structure to access US payment tools and gain credibility.

We create your LLC in 72h, with everything included: official registration, EIN, US bank account, Operating Agreement. You can then accept payments via Stripe US, PayPal US, and invoice in dollars.',
 '[{"question":"Une LLC est-elle utile pour un freelance à Rabat ?","answer":"Oui, si vous vendez des services à des clients internationaux. Une LLC US vous donne accès à Stripe US, crédibilité internationale et facturation en dollars."},{"question":"Quel État choisir pour ma LLC ?","answer":"Wyoming pour la simplicité et les coûts bas, Delaware pour la crédibilité corporate. Nous vous conseillons selon votre situation."},{"question":"Combien ça coûte ?","answer":"Notre forfait tout compris inclut l''enregistrement, l''EIN, le registered agent et l''accompagnement. Contactez-nous pour un devis détaillé."}]',
 '[{"question":"Is an LLC useful for a Rabat freelancer?","answer":"Yes, if you sell services to international clients. A US LLC gives you access to Stripe US, international credibility, and dollar invoicing."},{"question":"Which state should I choose for my LLC?","answer":"Wyoming for simplicity and low costs, Delaware for corporate credibility. We advise based on your situation."},{"question":"How much does it cost?","answer":"Our all-inclusive package covers registration, EIN, registered agent, and full support. Contact us for a detailed quote."}]',
 true),

-- Marrakech × LLC
((SELECT id FROM pseo_cities WHERE slug = 'marrakech'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Marrakech',
 'US LLC Creation from Marrakech',
 'Création de LLC Américaine depuis Marrakech | Diez Agency',
 'US LLC Creation from Marrakech | Diez Agency',
 'LLC américaine depuis Marrakech en 72h. Idéal pour les entrepreneurs du tourisme, e-commerce et services digitaux. 100% en ligne.',
 'US LLC from Marrakech in 72h. Ideal for tourism, e-commerce and digital service entrepreneurs. 100% online.',
 'Marrakech attire des entrepreneurs du monde entier. Que vous gériez un riad, vendiez de l''artisanat en ligne ou offriez des services digitaux, une LLC américaine vous ouvre les portes des marchés internationaux.

Créez votre LLC depuis Marrakech en 72h. Accédez à Stripe US pour encaisser vos clients internationaux sans friction, facturez en dollars, et gagnez en crédibilité sur la scène mondiale.',
 'Marrakech attracts entrepreneurs from around the world. Whether you manage a riad, sell crafts online, or offer digital services, a US LLC opens the doors to international markets.

Create your LLC from Marrakech in 72h. Access Stripe US to collect from international clients without friction, invoice in dollars, and gain credibility on the world stage.',
 '[{"question":"Pourquoi créer une LLC depuis Marrakech ?","answer":"Pour accéder à Stripe US, PayPal US et facturer en dollars. Indispensable si vous vendez de l''artisanat en ligne, des services touristiques ou des prestations digitales à l''international."},{"question":"Le processus est-il compliqué ?","answer":"Non, nous gérons tout. Vous nous fournissez vos informations, et en 72h votre LLC est créée avec EIN et registered agent."},{"question":"Faut-il se déplacer aux États-Unis ?","answer":"Non, tout est 100% en ligne. Aucun déplacement nécessaire."}]',
 '[{"question":"Why create an LLC from Marrakech?","answer":"To access Stripe US, PayPal US, and invoice in dollars. Essential if you sell crafts online, tourism services, or digital services internationally."},{"question":"Is the process complicated?","answer":"No, we handle everything. You provide your information, and in 72h your LLC is created with EIN and registered agent."},{"question":"Do I need to travel to the US?","answer":"No, everything is 100% online. No travel required."}]',
 true),

-- Fes × LLC
((SELECT id FROM pseo_cities WHERE slug = 'fes'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Fès',
 'US LLC Creation from Fes',
 'Création de LLC Américaine depuis Fès | Diez Agency',
 'US LLC Creation from Fes | Diez Agency',
 'LLC américaine depuis Fès en 72h. Vendez votre artisanat en ligne à l''international avec Stripe US. 100% en ligne.',
 'US LLC from Fes in 72h. Sell your crafts online internationally with Stripe US. 100% online.',
 'Les artisans et entrepreneurs de Fès qui veulent vendre à l''international se heurtent souvent aux limitations des solutions de paiement marocaines. Une LLC américaine résout ce problème.

Avec votre LLC, vous accédez à Stripe US, vous facturez en dollars et vous gagnez la confiance des clients internationaux. Nous créons tout en 72h depuis Fès.',
 'Fes artisans and entrepreneurs wanting to sell internationally often face limitations with Moroccan payment solutions. A US LLC solves this problem.

With your LLC, you access Stripe US, invoice in dollars, and gain the trust of international clients. We create everything in 72h from Fes.',
 '[{"question":"Une LLC aide-t-elle les artisans de Fès à vendre à l''international ?","answer":"Oui, c''est le meilleur moyen. Avec Stripe US, vous acceptez les paiements par carte du monde entier, sans les restrictions des solutions de paiement marocaines."},{"question":"Combien de temps pour créer ma LLC ?","answer":"72 heures pour l''enregistrement. 1-2 semaines pour l''EIN et le compte bancaire US."},{"question":"Est-ce légal ?","answer":"Oui, totalement légal. Des milliers d''entrepreneurs non-américains créent des LLC aux États-Unis chaque année. Nous vous guidons dans la conformité fiscale."}]',
 '[{"question":"Does an LLC help Fes artisans sell internationally?","answer":"Yes, it''s the best way. With Stripe US, you accept card payments from around the world, without the restrictions of Moroccan payment solutions."},{"question":"How long to create my LLC?","answer":"72 hours for registration. 1-2 weeks for the EIN and US bank account."},{"question":"Is it legal?","answer":"Yes, completely legal. Thousands of non-US entrepreneurs create US LLCs every year. We guide you through tax compliance."}]',
 true),

-- Tanger × LLC
((SELECT id FROM pseo_cities WHERE slug = 'tanger'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Tanger',
 'US LLC Creation from Tangier',
 'Création de LLC Américaine depuis Tanger | Diez Agency',
 'US LLC Creation from Tangier | Diez Agency',
 'LLC américaine depuis Tanger en 72h. Accédez aux marchés internationaux depuis la porte de l''Afrique vers l''Europe.',
 'US LLC from Tangier in 72h. Access international markets from Africa''s gateway to Europe.',
 'Tanger est un carrefour international. Les entrepreneurs tangérois qui travaillent avec l''Europe et le reste du monde ont tout intérêt à disposer d''une structure américaine pour fluidifier leurs transactions et renforcer leur crédibilité.

LLC créée en 72h, EIN, compte bancaire US, Stripe US — tout est inclus. Zéro déplacement, zéro paperasse complexe.',
 'Tangier is an international crossroads. Tangier entrepreneurs working with Europe and the rest of the world benefit greatly from a US business structure to streamline transactions and strengthen credibility.

LLC created in 72h, EIN, US bank account, Stripe US — everything included. Zero travel, zero complex paperwork.',
 '[{"question":"Pourquoi une LLC pour un entrepreneur de Tanger ?","answer":"Tanger est à la croisée de l''Afrique et de l''Europe. Une LLC US vous donne une crédibilité internationale et un accès aux outils de paiement les plus utilisés au monde."},{"question":"Gérez-vous le registered agent ?","answer":"Oui, un registered agent est inclus dans notre forfait. C''est obligatoire pour maintenir votre LLC en règle."},{"question":"Puis-je ouvrir un compte Stripe US ensuite ?","answer":"Oui, c''est l''un des principaux avantages. Avec votre LLC et votre EIN, vous pouvez ouvrir un compte Stripe US en quelques jours."}]',
 '[{"question":"Why an LLC for a Tangier entrepreneur?","answer":"Tangier is at the crossroads of Africa and Europe. A US LLC gives you international credibility and access to the world''s most widely used payment tools."},{"question":"Do you manage the registered agent?","answer":"Yes, a registered agent is included in our package. It''s mandatory to keep your LLC in good standing."},{"question":"Can I open a Stripe US account afterward?","answer":"Yes, that''s one of the main benefits. With your LLC and EIN, you can open a Stripe US account within days."}]',
 true),

-- Agadir × LLC
((SELECT id FROM pseo_cities WHERE slug = 'agadir'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Agadir',
 'US LLC Creation from Agadir',
 'Création de LLC Américaine depuis Agadir | Diez Agency',
 'US LLC Creation from Agadir | Diez Agency',
 'LLC américaine depuis Agadir en 72h. Exportez vos produits et services à l''international avec une structure US. 100% en ligne.',
 'US LLC from Agadir in 72h. Export your products and services internationally with a US structure. 100% online.',
 'Les entrepreneurs d''Agadir — exportateurs de produits du terroir, prestataires touristiques, freelances digitaux — gagnent à disposer d''une LLC américaine pour accéder aux marchés internationaux sans friction.

Nous créons votre LLC en 72h avec EIN, compte bancaire US et Stripe. Vendez vos produits d''argan, vos services ou votre expertise au monde entier.',
 'Agadir entrepreneurs — local product exporters, tourism providers, digital freelancers — benefit from a US LLC to access international markets without friction.

We create your LLC in 72h with EIN, US bank account, and Stripe. Sell your argan products, services, or expertise to the entire world.',
 '[{"question":"Une LLC est-elle utile pour un exportateur d''Agadir ?","answer":"Oui, elle vous permet de facturer en dollars, d''accepter les paiements internationaux via Stripe et de renforcer votre crédibilité auprès des acheteurs étrangers."},{"question":"Tout est vraiment en ligne ?","answer":"Oui, 100%. Nous gérons l''intégralité du processus à distance. Vous recevez vos documents par email."},{"question":"Que comprend votre forfait ?","answer":"Enregistrement LLC, EIN, Operating Agreement, registered agent annuel et accompagnement pour l''ouverture du compte bancaire US."}]',
 '[{"question":"Is an LLC useful for an Agadir exporter?","answer":"Yes, it allows you to invoice in dollars, accept international payments via Stripe, and strengthen your credibility with foreign buyers."},{"question":"Is everything really online?","answer":"Yes, 100%. We handle the entire process remotely. You receive your documents by email."},{"question":"What does your package include?","answer":"LLC registration, EIN, Operating Agreement, annual registered agent, and support for opening a US bank account."}]',
 true),

-- Meknes × LLC
((SELECT id FROM pseo_cities WHERE slug = 'meknes'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Meknès',
 'US LLC Creation from Meknes',
 'Création de LLC Américaine depuis Meknès | Diez Agency',
 'US LLC Creation from Meknes | Diez Agency',
 'LLC américaine depuis Meknès en 72h. Accédez à Stripe US et aux marchés internationaux. 100% en ligne, accompagnement complet.',
 'US LLC from Meknes in 72h. Access Stripe US and international markets. 100% online, full support.',
 'Les entrepreneurs meknassis qui vendent des services ou produits à l''international ont besoin d''une structure adaptée. Une LLC américaine vous donne les outils pour opérer à l''échelle mondiale.

Création complète en 72h depuis Meknès : enregistrement, EIN, compte bancaire US, Stripe. Nous gérons toute la paperasse.',
 'Meknes entrepreneurs selling services or products internationally need an appropriate structure. A US LLC gives you the tools to operate on a global scale.

Full creation in 72h from Meknes: registration, EIN, US bank account, Stripe. We handle all the paperwork.',
 '[{"question":"Faut-il des compétences juridiques pour créer une LLC ?","answer":"Non, nous gérons tout le processus administratif et juridique. Vous n''avez besoin d''aucune connaissance préalable."},{"question":"Combien coûte le maintien annuel d''une LLC ?","answer":"Les frais annuels dépendent de l''État choisi. Wyoming : environ $50/an + registered agent. Nous vous conseillons sur l''option la plus économique."},{"question":"Puis-je utiliser ma LLC pour du e-commerce ?","answer":"Oui, c''est idéal. Vous accédez à Stripe US, Shopify Payments US et tous les outils de paiement américains."}]',
 '[{"question":"Do I need legal expertise to create an LLC?","answer":"No, we handle the entire administrative and legal process. You don''t need any prior knowledge."},{"question":"How much does annual LLC maintenance cost?","answer":"Annual fees depend on the chosen state. Wyoming: about $50/year + registered agent. We advise on the most economical option."},{"question":"Can I use my LLC for e-commerce?","answer":"Yes, it''s ideal. You get access to Stripe US, Shopify Payments US, and all American payment tools."}]',
 true),

-- Oujda × LLC
((SELECT id FROM pseo_cities WHERE slug = 'oujda'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Oujda',
 'US LLC Creation from Oujda',
 'Création de LLC Américaine depuis Oujda | Diez Agency',
 'US LLC Creation from Oujda | Diez Agency',
 'LLC américaine depuis Oujda en 72h. Connectez votre business de l''Oriental aux marchés internationaux. 100% en ligne.',
 'US LLC from Oujda in 72h. Connect your Oriental region business to international markets. 100% online.',
 'Oujda est un carrefour commercial entre le Maroc, l''Algérie et l''Europe. Une LLC américaine permet aux entrepreneurs oujdis de facturer en dollars, d''accéder à Stripe et de gagner en crédibilité internationale.

Tout est en ligne, tout est géré par nos soins. En 72h, votre LLC est opérationnelle.',
 'Oujda is a commercial crossroads between Morocco, Algeria, and Europe. A US LLC allows Oujda entrepreneurs to invoice in dollars, access Stripe, and gain international credibility.

Everything is online, everything is handled by our team. In 72h, your LLC is operational.',
 '[{"question":"Une LLC est-elle adaptée aux entreprises de l''Oriental ?","answer":"Oui, particulièrement pour l''import-export, le e-commerce et les services digitaux. Elle ouvre l''accès aux marchés internationaux sans friction."},{"question":"Le processus fonctionne-t-il à distance depuis Oujda ?","answer":"Oui, 100% en ligne. Nous travaillons avec des clients dans tout le Maroc, y compris Oujda."},{"question":"Quels documents dois-je fournir ?","answer":"Pièce d''identité, adresse et informations de base sur votre activité. Nous nous occupons de tout le reste."}]',
 '[{"question":"Is an LLC suitable for Oriental region businesses?","answer":"Yes, particularly for import-export, e-commerce, and digital services. It opens access to international markets without friction."},{"question":"Does the process work remotely from Oujda?","answer":"Yes, 100% online. We work with clients across Morocco, including Oujda."},{"question":"What documents do I need to provide?","answer":"ID, address, and basic information about your business. We take care of everything else."}]',
 true),

-- Kenitra × LLC
((SELECT id FROM pseo_cities WHERE slug = 'kenitra'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Kénitra',
 'US LLC Creation from Kenitra',
 'Création de LLC Américaine depuis Kénitra | Diez Agency',
 'US LLC Creation from Kenitra | Diez Agency',
 'LLC américaine depuis Kénitra en 72h. Structure US pour entrepreneurs et entreprises industrielles. EIN, Stripe, compte bancaire US.',
 'US LLC from Kenitra in 72h. US structure for entrepreneurs and industrial companies. EIN, Stripe, US bank account.',
 'L''écosystème industriel de Kénitra est de plus en plus connecté aux marchés internationaux. Une LLC américaine est l''outil idéal pour les entrepreneurs kénitrans qui veulent opérer à l''échelle mondiale.

Nous gérons la création complète de votre LLC en 72h : enregistrement, EIN, registered agent, accompagnement bancaire.',
 'Kenitra''s industrial ecosystem is increasingly connected to international markets. A US LLC is the ideal tool for Kenitra entrepreneurs who want to operate on a global scale.

We handle the complete creation of your LLC in 72h: registration, EIN, registered agent, banking support.',
 '[{"question":"Les entreprises industrielles de Kénitra ont-elles besoin d''une LLC ?","answer":"Si elles travaillent avec des clients ou fournisseurs américains, oui. Une LLC facilite les transactions, la facturation en dollars et la crédibilité."},{"question":"Quel État recommandez-vous ?","answer":"Wyoming pour la majorité des entrepreneurs (coûts bas, simplicité). Delaware si vous visez des investisseurs américains."},{"question":"Gérez-vous aussi la comptabilité US ?","answer":"Nous ne faisons pas la comptabilité, mais nous vous orientons vers des partenaires CPA de confiance pour la déclaration fiscale annuelle."}]',
 '[{"question":"Do Kenitra industrial companies need an LLC?","answer":"If they work with US clients or suppliers, yes. An LLC facilitates transactions, dollar invoicing, and credibility."},{"question":"Which state do you recommend?","answer":"Wyoming for most entrepreneurs (low costs, simplicity). Delaware if you''re targeting American investors."},{"question":"Do you also handle US accounting?","answer":"We don''t do accounting, but we refer you to trusted CPA partners for annual tax filing."}]',
 true),

-- Tetouan × LLC
((SELECT id FROM pseo_cities WHERE slug = 'tetouan'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Tétouan',
 'US LLC Creation from Tetouan',
 'Création de LLC Américaine depuis Tétouan | Diez Agency',
 'US LLC Creation from Tetouan | Diez Agency',
 'LLC américaine depuis Tétouan en 72h. Accédez aux marchés internationaux depuis le nord du Maroc. 100% en ligne.',
 'US LLC from Tetouan in 72h. Access international markets from northern Morocco. 100% online.',
 'Les entrepreneurs de Tétouan qui vendent en ligne ou travaillent avec des clients internationaux bénéficient d''une LLC américaine pour fluidifier leurs paiements et renforcer leur crédibilité.

Création complète en 72h, 100% en ligne depuis Tétouan.',
 'Tetouan entrepreneurs selling online or working with international clients benefit from a US LLC to streamline payments and strengthen credibility.

Full creation in 72h, 100% online from Tetouan.',
 '[{"question":"Pourquoi une LLC depuis Tétouan ?","answer":"Pour accéder à Stripe US, PayPal US et facturer en dollars. Idéal si vous vendez de l''artisanat en ligne ou des services digitaux à l''international."},{"question":"Le processus est-il simple ?","answer":"Très simple. Vous nous fournissez vos informations, nous gérons tout le processus. En 72h, votre LLC est prête."},{"question":"Y a-t-il des obligations annuelles ?","answer":"Oui, un renouvellement annuel de l''État et une déclaration fiscale. Nous vous accompagnons sur ces obligations."}]',
 '[{"question":"Why an LLC from Tetouan?","answer":"To access Stripe US, PayPal US, and invoice in dollars. Ideal if you sell crafts online or digital services internationally."},{"question":"Is the process simple?","answer":"Very simple. You provide your information, we handle the entire process. In 72h, your LLC is ready."},{"question":"Are there annual obligations?","answer":"Yes, an annual state renewal and tax filing. We support you with these obligations."}]',
 true),

-- Sale × LLC
((SELECT id FROM pseo_cities WHERE slug = 'sale'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Salé',
 'US LLC Creation from Sale',
 'Création de LLC Américaine depuis Salé | Diez Agency',
 'US LLC Creation from Sale | Diez Agency',
 'LLC américaine depuis Salé en 72h. Rejoignez les entrepreneurs de la région Rabat-Salé qui vendent à l''international.',
 'US LLC from Sale in 72h. Join Rabat-Sale region entrepreneurs selling internationally.',
 'Les entrepreneurs de Salé bénéficient de la proximité de Rabat et de son écosystème tech. Une LLC américaine est le prochain pas logique pour ceux qui veulent scaler à l''international.

Nous créons votre structure US complète en 72h, avec tout l''accompagnement nécessaire.',
 'Sale entrepreneurs benefit from Rabat''s proximity and tech ecosystem. A US LLC is the logical next step for those wanting to scale internationally.

We create your complete US structure in 72h, with all the support you need.',
 '[{"question":"La LLC est-elle adaptée aux freelances de Salé ?","answer":"Oui, c''est même l''une des utilisations les plus fréquentes. Les freelances qui vendent des services digitaux à l''international utilisent une LLC pour accéder à Stripe US."},{"question":"Quel est le coût total ?","answer":"Notre forfait tout compris couvre l''enregistrement, l''EIN, le registered agent et l''accompagnement bancaire. Contactez-nous pour le détail."},{"question":"Puis-je avoir plusieurs associés dans ma LLC ?","answer":"Oui, une LLC peut avoir un ou plusieurs membres. Nous rédigeons l''Operating Agreement en conséquence."}]',
 '[{"question":"Is an LLC suitable for Sale freelancers?","answer":"Yes, it''s one of the most common uses. Freelancers selling digital services internationally use an LLC to access Stripe US."},{"question":"What''s the total cost?","answer":"Our all-inclusive package covers registration, EIN, registered agent, and banking support. Contact us for details."},{"question":"Can I have multiple partners in my LLC?","answer":"Yes, an LLC can have one or multiple members. We draft the Operating Agreement accordingly."}]',
 true),

-- Nador × LLC
((SELECT id FROM pseo_cities WHERE slug = 'nador'), 'llc-creation', NULL,
 'Création de LLC Américaine depuis Nador',
 'US LLC Creation from Nador',
 'Création de LLC Américaine depuis Nador | Diez Agency',
 'US LLC Creation from Nador | Diez Agency',
 'LLC américaine depuis Nador en 72h. Connectez votre business du Rif aux marchés internationaux avec Stripe US.',
 'US LLC from Nador in 72h. Connect your Rif business to international markets with Stripe US.',
 'Nador a une diaspora active et un tissu commercial tourné vers l''international. Une LLC américaine est l''outil parfait pour les entrepreneurs nadoris qui veulent vendre au-delà des frontières.

Création en 72h, 100% en ligne. EIN, compte bancaire US et Stripe inclus.',
 'Nador has an active diaspora and a commercially-oriented international fabric. A US LLC is the perfect tool for Nador entrepreneurs who want to sell beyond borders.

Created in 72h, 100% online. EIN, US bank account, and Stripe included.',
 '[{"question":"La LLC est-elle utile pour l''import-export depuis Nador ?","answer":"Oui, elle facilite les transactions internationales, la facturation en dollars et l''accès aux outils de paiement américains."},{"question":"Tout se fait en ligne ?","answer":"Oui, 100%. Aucun déplacement nécessaire. Nous gérons tout à distance avec la même qualité."},{"question":"Quels sont les avantages fiscaux ?","answer":"Une LLC à membre unique est « transparente » fiscalement aux US. Vous ne payez d''impôts qu''au Maroc. Nous vous orientons vers un CPA pour optimiser votre situation."}]',
 '[{"question":"Is an LLC useful for import-export from Nador?","answer":"Yes, it facilitates international transactions, dollar invoicing, and access to American payment tools."},{"question":"Is everything done online?","answer":"Yes, 100%. No travel required. We handle everything remotely with the same quality."},{"question":"What are the tax benefits?","answer":"A single-member LLC is ''tax transparent'' in the US. You only pay taxes in Morocco. We refer you to a CPA to optimize your situation."}]',
 true);
