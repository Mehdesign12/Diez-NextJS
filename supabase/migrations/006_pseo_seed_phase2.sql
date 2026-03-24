-- ============================================================
-- Migration 006 : Seed PSEO Phase 2
-- Pages ville×secteur (120) + Pages ville×service×secteur (480)
-- Total: 600 nouvelles pages PSEO
-- ============================================================

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

-- ============================================================
-- Seed: 480 pages PSEO ville × service × secteur
-- (12 villes × 4 services × 10 secteurs)
-- Exécuter dans Supabase SQL Editor (9ème)
-- Requiert: 01_cities.sql + 02_sectors.sql exécutés en premier
-- ============================================================

DO $$
DECLARE
  c RECORD;
  s RECORD;
  srv RECORD;
  srv_name_fr TEXT;
  srv_name_en TEXT;
BEGIN
  FOR c IN SELECT id, slug, name_fr, name_en, region FROM pseo_cities ORDER BY population DESC LOOP
    FOR s IN SELECT id, slug, name_fr, name_en FROM pseo_sectors ORDER BY name_fr LOOP

      -- Loop over the 3 services
      FOR srv IN
        SELECT * FROM (VALUES
          ('saas-web-app', 'SaaS, Sites Web & Applications', 'SaaS, Websites & Applications'),
          ('llm-seo', 'LLM SEO Optimisation', 'LLM SEO Optimization'),
          ('agent-automation', 'Agent Automation Process', 'Agent Automation Process')
        ) AS t(slug, label_fr, label_en)
      LOOP
        srv_name_fr := srv.label_fr;
        srv_name_en := srv.label_en;

        INSERT INTO pseo_pages (
          city_id, service_slug, sector_id,
          title_fr, title_en,
          meta_title_fr, meta_title_en,
          meta_description_fr, meta_description_en,
          content_fr, content_en,
          faq_fr, faq_en,
          published
        ) VALUES (
          c.id, srv.slug, s.id,

          -- title
          srv_name_fr || ' pour ' || s.name_fr || ' à ' || c.name_fr,
          srv_name_en || ' for ' || s.name_en || ' in ' || c.name_en,

          -- meta_title
          srv_name_fr || ' pour ' || s.name_fr || ' à ' || c.name_fr || ' | Diez Agency',
          srv_name_en || ' for ' || s.name_en || ' in ' || c.name_en || ' | Diez Agency',

          -- meta_description
          srv_name_fr || ' adapté au secteur ' || s.name_fr || ' à ' || c.name_fr || '. Solutions sur-mesure par Diez Agency. Délais garantis, audit gratuit.',
          srv_name_en || ' tailored to the ' || s.name_en || ' sector in ' || c.name_en || '. Custom solutions by Diez Agency. Guaranteed deadlines, free audit.',

          -- content_fr
          'Vous êtes un professionnel du ' || s.name_fr || ' à ' || c.name_fr || ' et vous cherchez une solution de ' || srv_name_fr || ' adaptée à votre secteur ? Diez Agency est votre partenaire idéal.' || E'\n\n' ||
          'Notre expertise en ' || srv_name_fr || ' combinée à notre connaissance du secteur ' || s.name_fr || ' nous permet de livrer des solutions qui répondent aux vrais besoins de votre activité. Pas de template générique — chaque projet est conçu sur-mesure pour maximiser votre ROI.' || E'\n\n' ||
          'À ' || c.name_fr || ', le marché du ' || s.name_fr || ' est compétitif. Pour vous démarquer, vous avez besoin d''outils digitaux performants : un site qui convertit, une automatisation qui fait gagner du temps, et une visibilité en ligne qui attire les bons clients.' || E'\n\n' ||
          'Nous livrons en 4-8 semaines, au prix annoncé, avec des résultats mesurables dès le premier mois.',

          -- content_en
          'Are you a ' || s.name_en || ' professional in ' || c.name_en || ' looking for a ' || srv_name_en || ' solution tailored to your sector? Diez Agency is your ideal partner.' || E'\n\n' ||
          'Our expertise in ' || srv_name_en || ' combined with our knowledge of the ' || s.name_en || ' sector allows us to deliver solutions that address the real needs of your business. No generic templates — every project is custom-built to maximize your ROI.' || E'\n\n' ||
          'In ' || c.name_en || ', the ' || s.name_en || ' market is competitive. To stand out, you need high-performance digital tools: a website that converts, automation that saves time, and online visibility that attracts the right clients.' || E'\n\n' ||
          'We deliver in 4-8 weeks, at the quoted price, with measurable results from month one.',

          -- faq_fr
          '[' ||
            '{"question":"Proposez-vous du ' || srv_name_fr || ' pour ' || s.name_fr || ' à ' || c.name_fr || ' ?","answer":"Oui, c''est exactement notre spécialité. Nous combinons notre expertise en ' || srv_name_fr || ' avec une connaissance approfondie du secteur ' || s.name_fr || ' pour livrer des solutions sur-mesure."},' ||
            '{"question":"Quel est le prix d''un projet ' || srv_name_fr || ' pour ' || s.name_fr || ' ?","answer":"Les prix varient selon la complexité du projet. Contactez-nous pour un audit gratuit et un devis fixe, transparent et sans engagement."},' ||
            '{"question":"Combien de temps pour livrer ?","answer":"En moyenne 4-8 semaines selon le projet. Tous nos délais sont garantis par contrat."}' ||
          ']',

          -- faq_en
          '[' ||
            '{"question":"Do you offer ' || srv_name_en || ' for ' || s.name_en || ' in ' || c.name_en || '?","answer":"Yes, that''s exactly our specialty. We combine our ' || srv_name_en || ' expertise with deep knowledge of the ' || s.name_en || ' sector to deliver tailored solutions."},' ||
            '{"question":"What is the price of a ' || srv_name_en || ' project for ' || s.name_en || '?","answer":"Prices vary depending on project complexity. Contact us for a free audit and a fixed, transparent, no-commitment quote."},' ||
            '{"question":"How long does delivery take?","answer":"On average 4-8 weeks depending on the project. All our deadlines are guaranteed by contract."}' ||
          ']',

          true
        )
        ON CONFLICT DO NOTHING;

      END LOOP;
    END LOOP;
  END LOOP;
END $$;
