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
