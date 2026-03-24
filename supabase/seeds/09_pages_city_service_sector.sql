-- ============================================================
-- Seed: 360 pages PSEO ville × service × secteur
-- (12 villes × 3 services × 10 secteurs)
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
