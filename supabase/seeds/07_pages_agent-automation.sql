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
