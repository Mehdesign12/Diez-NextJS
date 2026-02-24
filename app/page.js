"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { HOME_MARKUP } from "./home-markup";
import { DEFAULT_PROJECTS, normalizeProjects } from "./lib/projects";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const scrollSlider = (id) => {
      const slider = document.getElementById(id);
      if (slider) {
        const scrollAmount = window.innerWidth * 0.85;
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    window.scrollSlider = scrollSlider;

    const toggleMobileMenu = () => {
      const overlay = document.getElementById("mobile-menu-overlay");
      const icon = document.getElementById("mobile-menu-icon");
      const links = document.querySelectorAll(".mobile-link");

      if (!overlay || !icon) return;

      const isOpen = !overlay.classList.contains("translate-x-full");

      if (isOpen) {
        overlay.classList.add("translate-x-full");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        document.body.style.overflow = "auto";

        links.forEach((link) => {
          link.classList.add("translate-y-8", "opacity-0");
          link.classList.remove("translate-y-0", "opacity-100");
        });
      } else {
        overlay.classList.remove("translate-x-full");
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        document.body.style.overflow = "hidden";

        links.forEach((link, index) => {
          setTimeout(() => {
            link.classList.remove("translate-y-8", "opacity-0");
            link.classList.add("translate-y-0", "opacity-100");
          }, 100 + index * 100);
        });
      }
    };

    window.toggleMobileMenu = toggleMobileMenu;

    const translations = {
      fr: {
        "txt-nav-home": "Accueil",
        "txt-nav-services": "Expertise",
        "txt-nav-process": "Process",
        "txt-nav-portfolio": "Réalisations",
        "txt-nav-testimonials": "Avis",
        "txt-nav-contact": "Contact",
        "txt-hero-badge": "Agence Mieux Notée 2025",
        "txt-hero-float-1-title": "Croissance +120%",
        "txt-hero-float-1-desc": "Rapport Analytics",
        "txt-hero-float-2-title": "Utilisateurs Actifs",
        "txt-partners-title": "Ils nous font confiance",
        "txt-bento-label": "Notre Expertise",
        "txt-bento-title": "Tout ce qu'il faut pour Automatiser",
        "txt-bento-subtitle":
          "De l'analyse de vos processus jusqu'au déploiement final, nous couvrons tous les aspects techniques et créatifs.",
        "txt-bento-1-title": "Interfaces & Ergonomie",
        "txt-bento-1-desc":
          "Nous concevons des outils internes intuitifs que vos équipes prendront plaisir à utiliser au quotidien. Fini les logiciels complexes.",
        "txt-bento-2-title": "Développement Sur-Mesure",
        "txt-bento-2-desc": "Des systèmes robustes pour digitaliser votre métier.",
        "txt-bento-3-title": "Automatisation",
        "txt-bento-3-desc": "Connexions API & CRM.",
        "txt-bento-4-title": "Accessibilité",
        "txt-bento-4-desc": "Vos outils sur mobile & tablette.",
        "txt-steps-label": "Notre Processus",
        "txt-steps-title": "De l'Audit à l'Action",
        "txt-step-1-title": "Audit & Compréhension",
        "txt-step-1-desc":
          "Nous commençons par comprendre votre métier. Nous analysons vos goulots d'étranglement et vos pertes de temps pour définir où l'automatisation aura le plus d'impact ROI.",
        "txt-step-2-title": "Construction Agile",
        "txt-step-2-desc":
          "Pas d'effet tunnel. Nous développons vos outils étape par étape. Vous validez chaque fonctionnalité toutes les deux semaines. Vous gardez le contrôle total sur le budget et la direction.",
        "txt-step-3-title": "Déploiement & Formation",
        "txt-step-3-desc":
          "La technique n'est rien sans adoption. Nous installons les outils et formons vos équipes pour qu'elles gagnent du temps dès le premier jour. Zéro rupture d'activité.",
        "txt-testim-title": "Ils nous font confiance",
        "txt-testim-subtitle": "Des résultats concrets, pas de promesses en l'air.",
        "txt-testim-1":
          '"On perdait 2 jours par semaine sur Excel. Diez a créé un outil sur-mesure qui a tout automatisé. L\'investissement a été rentabilisé en 3 mois."',
        "txt-testim-2":
          '"J\'avais peur que ce soit trop technique pour nous. L\'équipe a été ultra-pédagogue et l\'outil est hyper simple à utiliser. Je recommande."',
        "txt-testim-3":
          '"Enfin une agence qui respecte les délais ! Outil livré à la date prévue, budget respecté à l\'euro près. Ça change tout."',
        "txt-work-title": "Projets Sélectionnés",
        "txt-work-subtitle":
          "Nous ne faisons pas que du design; nous construisons des écosystèmes digitaux qui scalent.",
        "txt-work-link": "Voir tous les projets",
        "txt-work-link-mobile": "Voir tous les projets",
        "txt-proj-1-title": "Dashboard Fintech",
        "txt-proj-1-desc": "Design Produit • Développement",
        "txt-proj-2-title": "App Santé",
        "txt-proj-2-desc": "App Mobile • Stratégie UX",
        "txt-proj-3-title": "Refonte E-Commerce",
        "txt-proj-3-desc": "Branding • Shopify",
        "txt-proj-4-title": "Architecture SaaS",
        "txt-proj-4-desc": "Backend • Infrastructure",
        "txt-pricing-title": "Prix Simples, Grande Valeur",
        "txt-pricing-subtitle":
          "Choisissez le plan adapté à votre stade. Pas de frais cachés, juste des résultats.",
        "txt-price-1-title": "Démarrage",
        "txt-price-1-period": "/mois",
        "txt-price-1-desc": "Parfait pour les MVPs et la validation rapide.",
        "txt-price-1-f1": "Système de Design",
        "txt-price-1-f2": "5 Pages Frontend",
        "txt-price-1-f3": "SEO de base",
        "txt-price-1-f4": "Support Backend",
        "txt-price-1-btn": "Commencer",
        "txt-price-2-badge": "Populaire",
        "txt-price-2-title": "Croissance",
        "txt-price-2-period": "/mois",
        "txt-price-2-desc": "Pour les équipes en croissance nécessitant un partenaire produit.",
        "txt-price-2-f1": "Suite UI/UX Complète",
        "txt-price-2-f2": "App React/Next.js",
        "txt-price-2-f3": "Intégration API",
        "txt-price-2-f4": "Sprints Hebdomadaires",
        "txt-price-2-btn": "Choisir Pro",
        "txt-price-3-title": "Entreprise",
        "txt-price-3-period": "/devis",
        "txt-price-3-desc":
          "Transformation digitale complète pour organisations établies.",
        "txt-price-3-f1": "Équipe Dédiée (5+)",
        "txt-price-3-f2": "Support 24/7",
        "txt-price-3-f3": "Architecture Cloud",
        "txt-price-3-f4": "Sécurité Avancée",
        "txt-price-3-btn": "Contacter Ventes",
        "txt-faq-title": "Questions Fréquentes",
        "txt-faq-q1": "Combien de temps dure un projet typique ?",
        "txt-faq-a1":
          "Les délais varient selon la complexité. Une landing page peut prendre 2 semaines, un SaaS complet 8-12 semaines. Nous travaillons en sprints de 2 semaines pour montrer des progrès constants.",
        "txt-faq-q2": "Assurez-vous le support après lancement ?",
        "txt-faq-a2":
          "Absolument. Nous proposons plusieurs forfaits de maintenance pour garder votre produit sécurisé et à jour.",
        "txt-faq-q3": "Quelles technologies utilisez-vous ?",
        "txt-faq-a3":
          "Nous sommes experts de la stack Javascript moderne : React, Next.js, Node.js et Tailwind CSS pour le frontend et le backend.",
        "txt-footer-desc":
          "Nous construisons des produits digitaux qui définissent des catégories et stimulent la croissance.",
        "txt-footer-h-services": "Services",
        "txt-footer-l-web": "Développement Web",
        "txt-footer-l-mob": "Apps Mobiles",
        "txt-footer-l-ui": "Design UI/UX",
        "txt-footer-l-consult": "Consulting",
        "txt-footer-h-company": "Agence",
        "txt-footer-l-about": "À Propos",
        "txt-footer-l-careers": "Carrières",
        "txt-footer-l-blog": "Blog",
        "txt-footer-l-contact": "Contact",
        "txt-footer-h-newsletter": "Newsletter",
        "txt-footer-news-text": "Recevez les dernières tendances.",
        "txt-footer-email-ph": "Votre email",
        "txt-hero-title": `
                    <!-- Line 1 -->
                    <div class="flex flex-wrap justify-center gap-x-3 md:gap-x-6">
                        <span class="word-mask"><span class="word-animate delay-100">Votre</span></span>
                        <span class="word-mask"><span class="word-animate delay-200">Transformation</span></span>
                        <span class="word-mask"><span class="word-animate delay-300">Digitale,</span></span>
                    </div>
                    <!-- Line 2 -->
                    <div class="flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-6">
                        <span class="word-mask pb-2" style="overflow: hidden;">
                            <span class="word-animate delay-400 block relative">
                                <span class="text-gradient-orange animate-shimmer relative inline-block pb-2">
                                    Sereine
                                    <svg class="absolute w-full h-4 -bottom-1 left-0 text-diez-orange opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
                                    </svg>
                                </span>
                            </span>
                        </span>
                        <span class="word-mask"><span class="word-animate delay-500">&</span></span>
                        <span class="word-mask"><span class="word-animate delay-500">Maîtrisée</span></span>
                    </div>`,
        "txt-hero-subtitle":
          "Nous créons les outils sur-mesure qui automatisent votre activité.<br class=\"hidden md:block\"><strong>Délais garantis. Budget respecté. Zéro jargon technique.</strong>",
        "txt-hero-cta1": "Auditer mon Business",
        "txt-hero-cta2": "Nos Réalisations",
      },
      en: {
        "txt-nav-home": "Home",
        "txt-nav-services": "Expertise",
        "txt-nav-process": "Process",
        "txt-nav-portfolio": "Portfolio",
        "txt-nav-testimonials": "Reviews",
        "txt-nav-contact": "Contact",
        "txt-hero-badge": "Top Rated Agency 2025",
        "txt-hero-float-1-title": "Growth +120%",
        "txt-hero-float-1-desc": "Analytics Report",
        "txt-hero-float-2-title": "Active Users",
        "txt-partners-title": "Trusted by Innovative Companies",
        "txt-bento-label": "Our Expertise",
        "txt-bento-title": "Everything you need to Automate",
        "txt-bento-subtitle":
          "From process analysis to final deployment, we cover all technical and creative aspects.",
        "txt-bento-1-title": "Interfaces & Ergonomics",
        "txt-bento-1-desc":
          "We design intuitive internal tools that your teams will enjoy using every day. No more complex software.",
        "txt-bento-2-title": "Custom Development",
        "txt-bento-2-desc": "Robust systems to digitize your business.",
        "txt-bento-3-title": "Automation",
        "txt-bento-3-desc": "API & CRM Connections.",
        "txt-bento-4-title": "Accessibility",
        "txt-bento-4-desc": "Your tools on mobile & tablet.",
        "txt-steps-label": "Our Process",
        "txt-steps-title": "From Audit to Action",
        "txt-step-1-title": "Audit & Understanding",
        "txt-step-1-desc":
          "We start by understanding your business. We analyze your bottlenecks and time losses to define where automation will have the most ROI impact.",
        "txt-step-2-title": "Agile Construction",
        "txt-step-2-desc":
          "No tunnel effect. We develop your tools step by step. You validate each feature every two weeks. You keep full control over budget and direction.",
        "txt-step-3-title": "Deployment & Training",
        "txt-step-3-desc":
          "Technology is nothing without adoption. We install the tools and train your teams so they save time from day one. Zero business disruption.",
        "txt-testim-title": "They Trust Us",
        "txt-testim-subtitle": "Concrete results, no empty promises.",
        "txt-testim-1":
          '"We were losing 2 days a week on Excel. Diez created a custom tool that automated everything. The investment paid off in 3 months."',
        "txt-testim-2":
          '"I was afraid it would be too technical for us. The team was super educational and the tool is super simple to use. I recommend."',
        "txt-testim-3":
          '"Finally an agency that respects deadlines! Tool delivered on the scheduled date, budget respected to the euro. It changes everything."',
        "txt-work-title": "Selected Work",
        "txt-work-subtitle": "We don't just design; we build digital ecosystems that scale.",
        "txt-work-link": "View all projects",
        "txt-work-link-mobile": "View all projects",
        "txt-proj-1-title": "Fintech Dashboard",
        "txt-proj-1-desc": "Product Design • Development",
        "txt-proj-2-title": "HealthCare App",
        "txt-proj-2-desc": "Mobile App • UX Strategy",
        "txt-proj-3-title": "E-Commerce Redesign",
        "txt-proj-3-desc": "Branding • Shopify",
        "txt-proj-4-title": "SaaS Architecture",
        "txt-proj-4-desc": "Backend • Infrastructure",
        "txt-pricing-title": "Simple Pricing, Big Value",
        "txt-pricing-subtitle":
          "Choose the plan that fits your stage. No hidden fees, just results.",
        "txt-price-1-title": "Starter",
        "txt-price-1-period": "/mo",
        "txt-price-1-desc": "Perfect for MVPs and small startups needing quick validation.",
        "txt-price-1-f1": "Design System",
        "txt-price-1-f2": "5 Pages Frontend",
        "txt-price-1-f3": "Basic SEO",
        "txt-price-1-f4": "Backend Support",
        "txt-price-1-btn": "Get Started",
        "txt-price-2-badge": "Most Popular",
        "txt-price-2-title": "Scale Up",
        "txt-price-2-period": "/mo",
        "txt-price-2-desc": "For growing teams that need a dedicated product partner.",
        "txt-price-2-f1": "Full UI/UX Suite",
        "txt-price-2-f2": "React/Next.js App",
        "txt-price-2-f3": "API Integration",
        "txt-price-2-f4": "Weekly Sprints",
        "txt-price-2-btn": "Choose Professional",
        "txt-price-3-title": "Enterprise",
        "txt-price-3-period": "/quote",
        "txt-price-3-desc": "Full digital transformation for established organizations.",
        "txt-price-3-f1": "Dedicated Team (5+)",
        "txt-price-3-f2": "24/7 Support",
        "txt-price-3-f3": "Cloud Architecture",
        "txt-price-3-f4": "Advanced Security",
        "txt-price-3-btn": "Contact Sales",
        "txt-faq-title": "Frequently Asked Questions",
        "txt-faq-q1": "How long does a typical project take?",
        "txt-faq-a1":
          "Timelines vary depending on complexity. A simple landing page might take 2 weeks, while a full SaaS MVP usually takes 8-12 weeks. We work in 2-week sprints to show consistent progress.",
        "txt-faq-q2": "Do you provide post-launch support?",
        "txt-faq-a2":
          "Absolutely. We offer various maintenance packages to ensure your product stays secure, updated, and bug-free after launch.",
        "txt-faq-q3": "What technologies do you use?",
        "txt-faq-a3":
          "We specialize in the modern Javascript stack: React, Next.js, Node.js, and Tailwind CSS on the frontend/backend. For mobile, we use React Native.",
        "txt-footer-desc":
          "We build digital products that define categories and drive business growth.",
        "txt-footer-h-services": "Services",
        "txt-footer-l-web": "Web Development",
        "txt-footer-l-mob": "Mobile Apps",
        "txt-footer-l-ui": "UI/UX Design",
        "txt-footer-l-consult": "Consulting",
        "txt-footer-h-company": "Company",
        "txt-footer-l-about": "About Us",
        "txt-footer-l-careers": "Careers",
        "txt-footer-l-blog": "Blog",
        "txt-footer-l-contact": "Contact",
        "txt-footer-h-newsletter": "Newsletter",
        "txt-footer-news-text": "Get the latest trends in your inbox.",
        "txt-footer-email-ph": "Enter email",
        "txt-hero-title": `
                    <!-- Line 1 -->
                    <div class="flex flex-wrap justify-center gap-x-3 md:gap-x-6">
                        <span class="word-mask"><span class="word-animate delay-100">Your</span></span>
                        <span class="word-mask"><span class="word-animate delay-200">Digital</span></span>
                        <span class="word-mask"><span class="word-animate delay-300">Transformation,</span></span>
                    </div>
                    <!-- Line 2 -->
                    <div class="flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-6">
                        <span class="word-mask pb-2" style="overflow: hidden;">
                            <span class="word-animate delay-400 block relative">
                                <span class="text-gradient-orange animate-shimmer relative inline-block pb-2">
                                    Serene
                                    <svg class="absolute w-full h-4 -bottom-1 left-0 text-diez-orange opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
                                    </svg>
                                </span>
                            </span>
                        </span>
                        <span class="word-mask"><span class="word-animate delay-500">&</span></span>
                        <span class="word-mask"><span class="word-animate delay-500">Controlled</span></span>
                    </div>`,
        "txt-hero-subtitle":
          "We build custom tools that automate your business.<br class=\"hidden md:block\"><strong>Guaranteed deadlines. Respected budget. No technical jargon.</strong>",
        "txt-hero-cta1": "Audit My Business",
        "txt-hero-cta2": "Our Work",
      },
    };

    let currentLang = "fr";

    const updateContent = () => {
      const langData = translations[currentLang];

      Object.entries(langData).forEach(([id, content]) => {
        const element = document.getElementById(id);
        if (element) {
          if (element.tagName === "INPUT" && element.hasAttribute("placeholder")) {
            element.placeholder = content;
          } else {
            element.innerHTML = content;
          }
        }
      });

      const words = document.querySelectorAll(".word-animate");
      words.forEach((word) => {
        word.style.animation = "none";
        void word.offsetHeight;
        word.style.animation = null;
      });
    };

    const updateSwitcherUI = () => {
      const flagImg = document.getElementById("lang-flag");
      const langCode = document.getElementById("lang-code");
      const mobileFlag = document.getElementById("mobile-lang-flag-header");

      if (currentLang === "fr") {
        if (flagImg) flagImg.src = "https://flagcdn.com/w40/fr.png";
        if (mobileFlag) mobileFlag.src = "https://flagcdn.com/w40/fr.png";
        if (langCode) langCode.innerText = "FR";
      } else {
        if (flagImg) flagImg.src = "https://flagcdn.com/w40/gb.png";
        if (mobileFlag) mobileFlag.src = "https://flagcdn.com/w40/gb.png";
        if (langCode) langCode.innerText = "EN";
      }
    };

    window.toggleLanguage = () => {
      currentLang = currentLang === "fr" ? "en" : "fr";
      updateContent();
      updateSwitcherUI();
    };

    updateContent();
    updateSwitcherUI();

    const navbar = document.getElementById("navbar");
    const navbarInner = document.getElementById("navbar-inner");
    const navbarContainer = document.getElementById("navbar-container");

    const handleNavbarScroll = () => {
      if (!navbar || !navbarInner || !navbarContainer) return;

      if (window.scrollY > 50) {
        navbarInner.classList.remove("h-16", "md:h-20");
        navbarInner.classList.add("h-14", "md:h-16");

        navbar.classList.add("shadow-xl");
        navbar.classList.replace("max-w-5xl", "max-w-4xl");

        navbarContainer.classList.replace("top-6", "top-4");
      } else {
        navbarInner.classList.add("h-16", "md:h-20");
        navbarInner.classList.remove("h-14", "md:h-16");

        navbar.classList.remove("shadow-xl");
        navbar.classList.replace("max-w-4xl", "max-w-5xl");

        navbarContainer.classList.replace("top-4", "top-6");
      }
    };

    window.addEventListener("scroll", handleNavbarScroll);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    const highlightContainers = document.querySelectorAll(
      ".highlight-text-container"
    );

    highlightContainers.forEach((container) => {
      const text = container.innerText;
      const isDarkBg = container.closest(".bg-diez-dark") !== null;
      const inactiveColor = isDarkBg ? "text-gray-600" : "text-gray-300";
      const activeColor = isDarkBg ? "text-white" : "text-diez-dark";

      container.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="highlight-word ${inactiveColor} transition-colors duration-300" data-active="${activeColor}" data-inactive="${inactiveColor}">${word} </span>`
        )
        .join("");
    });

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const centerLine = windowHeight / 2;

      const words = document.querySelectorAll(".highlight-word");
      words.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const activeColor = word.dataset.active;
        const inactiveColor = word.dataset.inactive;
        const distanceFromCenter = Math.abs(rect.top - centerLine + 50);

        if (distanceFromCenter < 150) {
          const cleanWord = word.innerText
            .trim()
            .toLowerCase()
            .replace(/[.,]/g, "");
          if (
            [
              "software",
              "growth",
              "futures",
              "scale",
              "technical",
              "creative",
              "features",
              "engine",
              "technologie",
              "métier",
              "croissance",
              "potentiel",
              "performance",
              "sérénité",
              "outils",
            ].includes(cleanWord)
          ) {
            word.classList.remove(inactiveColor, activeColor);
            word.classList.add("text-diez-orange");
          } else {
            word.classList.remove(inactiveColor, "text-diez-orange");
            word.classList.add(activeColor);
          }
        } else {
          word.classList.remove(activeColor, "text-diez-orange");
          word.classList.add(inactiveColor);
        }
      });

      const bentoVisuals = document.querySelectorAll(".bento-visual");
      bentoVisuals.forEach((visual) => {
        const card = visual.closest(".bento-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();

        if (rect.top < windowHeight && rect.bottom > 0) {
          const speed = parseFloat(visual.dataset.speed) || 0.1;
          const yPos = (rect.top - windowHeight / 2) * speed;
          visual.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    const container = document.getElementById("slider-work");
    if (container) {
      let allProjects = [];
      try {
        const stored = localStorage.getItem("diez_projects");
        allProjects = stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
      } catch {
        allProjects = DEFAULT_PROJECTS;
      }

      const normalizedProjects = normalizeProjects(allProjects);
      const featuredProjects = normalizedProjects
        .filter((project) => project.isFeatured)
        .slice(0, 4);

      container.innerHTML = featuredProjects
        .map((project, index) => {
          const marginTopClass = index % 2 !== 0 ? "md:mt-16" : "";
          let bgContent = "";

          if (project.mediaUrl && project.mediaUrl.startsWith("data:")) {
            bgContent = `<img src="${project.mediaUrl}" class="absolute inset-0 w-full h-full object-cover">`;
          } else {
            bgContent = `
                        <div class="parallax-bg absolute inset-0 ${
                          project.colorClass || "bg-gray-200"
                        } w-full h-[120%] -top-[10%] flex items-center justify-center">
                            <i class="${
                              project.icon || "fas fa-image"
                            } text-9xl text-black/10 transform scale-90 group-hover:scale-100 transition-transform duration-700"></i>
                        </div>
                    `;
          }

          const isDark =
            project.colorClass?.includes("gray-800") ||
            project.colorClass?.includes("diez-dark") ||
            (project.mediaUrl && project.mediaUrl.startsWith("data:"));
          const titleColor = isDark ? "text-white" : "text-gray-900";
          const descColor = isDark ? "text-gray-300" : "text-gray-600";

          return `
                    <div class="min-w-[85vw] md:min-w-0 snap-center group cursor-pointer ${marginTopClass} reveal delay-100 parallax-card overflow-hidden rounded-3xl shadow-lg mb-0 md:mb-6 aspect-[4/3] relative active:scale-95 transition-transform duration-300">
                        ${bgContent}
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 class="text-2xl font-bold ${titleColor} mb-1">${project.title}</h3>
                            <p class="text-sm ${descColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">${project.subtitle}</p>
                        </div>
                    </div>
                `;
        })
        .join("");

      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const backToTop = document.getElementById("back-to-top");
    const handleBackToTop = () => {
      if (!backToTop) return;
      if (window.scrollY > 500) {
        backToTop.classList.remove(
          "opacity-0",
          "translate-y-10",
          "pointer-events-none"
        );
      } else {
        backToTop.classList.add(
          "opacity-0",
          "translate-y-10",
          "pointer-events-none"
        );
      }
    };

    window.addEventListener("scroll", handleBackToTop);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function handleAnchor(e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#" || !targetId) return;

        if (document.querySelector(targetId)) {
          e.preventDefault();
          lenis.scrollTo(targetId);
        }
      });
    });

    handleNavbarScroll();
    handleBackToTop();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleNavbarScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleBackToTop);
      if (window.toggleMobileMenu) delete window.toggleMobileMenu;
      if (window.toggleLanguage) delete window.toggleLanguage;
      if (window.scrollSlider) delete window.scrollSlider;
      if (window.lenis) delete window.lenis;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HOME_MARKUP }} />;
}
