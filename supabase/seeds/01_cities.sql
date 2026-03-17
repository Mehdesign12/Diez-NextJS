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
