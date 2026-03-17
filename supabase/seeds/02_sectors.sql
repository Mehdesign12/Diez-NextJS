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
