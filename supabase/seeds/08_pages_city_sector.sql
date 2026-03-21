-- ============================================================
-- Seed: 120 pages PSEO ville × secteur (12 villes × 10 secteurs)
-- Exécuter dans Supabase SQL Editor (8ème)
-- Requiert: 01_cities.sql + 02_sectors.sql exécutés en premier
-- ============================================================
-- service_slug = NULL → page ville + secteur (pas de service)

DO $$
DECLARE
  c RECORD;
  s RECORD;
BEGIN
  FOR c IN SELECT id, slug, name_fr, name_en, region FROM pseo_cities ORDER BY population DESC LOOP
    FOR s IN SELECT id, slug, name_fr, name_en, description_fr, description_en FROM pseo_sectors ORDER BY name_fr LOOP

      INSERT INTO pseo_pages (
        city_id, service_slug, sector_id,
        title_fr, title_en,
        meta_title_fr, meta_title_en,
        meta_description_fr, meta_description_en,
        content_fr, content_en,
        faq_fr, faq_en,
        published
      ) VALUES (
        c.id, NULL, s.id,

        -- title
        'Agence Digitale ' || s.name_fr || ' à ' || c.name_fr,
        s.name_en || ' Digital Agency in ' || c.name_en,

        -- meta_title
        'Agence Digitale ' || s.name_fr || ' à ' || c.name_fr || ' | Diez Agency',
        s.name_en || ' Digital Agency in ' || c.name_en || ' | Diez Agency',

        -- meta_description
        'Solutions digitales pour le secteur ' || s.name_fr || ' à ' || c.name_fr || '. Sites web, applications, automatisation IA et SEO par Diez Agency. Audit gratuit en 24h.',
        'Digital solutions for the ' || s.name_en || ' sector in ' || c.name_en || '. Websites, applications, AI automation and SEO by Diez Agency. Free audit within 24h.',

        -- content_fr
        'Le secteur ' || s.name_fr || ' à ' || c.name_fr || ' est en pleine transformation digitale. Les professionnels du ' || s.name_fr || ' qui investissent dans leur présence en ligne captent plus de clients, automatisent leurs processus et augmentent leur chiffre d''affaires.' || E'\n\n' ||
        'Chez Diez Agency, nous comprenons les besoins spécifiques du secteur ' || s.name_fr || '. ' || COALESCE(s.description_fr, '') || E'\n\n' ||
        'Notre approche est sur-mesure : nous analysons votre marché local à ' || c.name_fr || ', identifions les opportunités digitales de votre secteur, et livrons des solutions qui génèrent un ROI mesurable. Délais garantis par contrat, devis fixe, zéro surprise.' || E'\n\n' ||
        'Que vous soyez un professionnel du ' || s.name_fr || ' établi ou en création, nous avons les compétences pour accélérer votre croissance digitale à ' || c.name_fr || ' et dans toute la région de ' || COALESCE(c.region, c.name_fr) || '.',

        -- content_en
        'The ' || s.name_en || ' sector in ' || c.name_en || ' is undergoing a full digital transformation. ' || s.name_en || ' professionals who invest in their online presence capture more clients, automate their processes, and increase their revenue.' || E'\n\n' ||
        'At Diez Agency, we understand the specific needs of the ' || s.name_en || ' sector. ' || COALESCE(s.description_en, '') || E'\n\n' ||
        'Our approach is tailored: we analyze your local market in ' || c.name_en || ', identify digital opportunities in your sector, and deliver solutions that generate measurable ROI. Deadlines guaranteed by contract, fixed quote, zero surprises.' || E'\n\n' ||
        'Whether you''re an established ' || s.name_en || ' professional or just starting out, we have the skills to accelerate your digital growth in ' || c.name_en || ' and throughout the ' || COALESCE(c.region, c.name_en) || ' region.',

        -- faq_fr (JSON array)
        '[' ||
          '{"question":"Combien coûte un site web pour ' || s.name_fr || ' à ' || c.name_fr || ' ?","answer":"Nos projets démarrent à partir de 8 000€ pour un site professionnel adapté au secteur ' || s.name_fr || '. Le prix dépend de la complexité et des fonctionnalités spécifiques. Audit gratuit pour un devis transparent."},' ||
          '{"question":"Avez-vous de l''expérience dans le secteur ' || s.name_fr || ' ?","answer":"Oui, nous accompagnons des professionnels du ' || s.name_fr || ' dans tout le Maroc. Notre expertise sectorielle nous permet de livrer des solutions adaptées aux besoins réels de votre activité."},' ||
          '{"question":"En combien de temps livrez-vous un projet ' || s.name_fr || ' ?","answer":"Un site vitrine est livré en 4-6 semaines, une application métier en 6-10 semaines. Les délais sont garantis par contrat — c''est notre engagement."}' ||
        ']',

        -- faq_en (JSON array)
        '[' ||
          '{"question":"How much does a website cost for ' || s.name_en || ' in ' || c.name_en || '?","answer":"Our projects start from €8,000 for a professional website tailored to the ' || s.name_en || ' sector. The price depends on complexity and specific features. Free audit for a transparent quote."},' ||
          '{"question":"Do you have experience in the ' || s.name_en || ' sector?","answer":"Yes, we support ' || s.name_en || ' professionals across Morocco. Our sector expertise allows us to deliver solutions tailored to the real needs of your business."},' ||
          '{"question":"How fast do you deliver a ' || s.name_en || ' project?","answer":"A showcase website is delivered in 4-6 weeks, a business application in 6-10 weeks. Deadlines are guaranteed by contract — that''s our commitment."}' ||
        ']',

        true
      )
      ON CONFLICT DO NOTHING;

    END LOOP;
  END LOOP;
END $$;
