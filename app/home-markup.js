export const HOME_MARKUP = String.raw`<!-- Noise Texture -->
    <div class="bg-noise"></div>

    <!-- Navigation -->
    <div class="fixed w-full z-50 top-6 transition-all duration-300" id="navbar-container">
        <nav class="relative z-50 mx-4 md:mx-auto max-w-5xl px-4 sm:px-4 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full" id="navbar">
            <div class="flex justify-between items-center h-16 md:h-20 transition-all duration-300" id="navbar-inner">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer pl-2 md:pl-4">
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden hover:scale-105 transition-transform">
                        <img src="/images/logo_clean.png" alt="Diez Agency Logo" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <a href="#" class="text-sm font-bold text-diez-orange transition-colors" id="txt-nav-home">Accueil</a>
                    <a href="#services" class="text-sm font-medium text-gray-600 hover:text-diez-orange transition-colors" id="txt-nav-services">Expertise</a>
                    <a href="#how-we-work" class="text-sm font-medium text-gray-600 hover:text-diez-orange transition-colors" id="txt-nav-process">Process</a>
                    <a href="#work" class="text-sm font-medium text-gray-600 hover:text-diez-orange transition-colors" id="txt-nav-portfolio">Réalisations</a>
                    <a href="/blog" class="text-sm font-medium text-gray-600 hover:text-diez-orange transition-colors">Blog</a>
                    <a href="#testimonials" class="text-sm font-medium text-gray-600 hover:text-diez-orange transition-colors" id="txt-nav-testimonials">Avis</a>
                </div>

                <!-- CTA & Mobile Toggle -->
                <div class="flex items-center gap-4 pr-2 md:pr-4">
                    <!-- Modern Flag Switcher -->
                    <button onclick="toggleLanguage()" class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white border border-gray-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group active:scale-95 mr-2">
                        <!-- Flag Image -->
                        <img id="lang-flag" src="https://flagcdn.com/w40/fr.png" alt="Lang" class="w-5 h-5 rounded-full object-cover shadow-sm border border-gray-100">
                        <!-- Code -->
                        <span id="lang-code" class="text-xs font-extrabold text-gray-600 group-hover:text-diez-orange transition-colors">FR</span>
                        <!-- Chevron -->
                        <i class="fas fa-chevron-down text-[8px] text-gray-400 group-hover:text-diez-dark transition-colors"></i>
                    </button>

                    <a href="#contact" class="hidden md:block px-6 py-2.5 bg-diez-orange text-white text-sm font-bold rounded-full shadow-lg shadow-diez-orange/20 hover:bg-orange-600 hover:shadow-diez-orange/40 transition-all duration-300 transform hover:-translate-y-0.5">
                        <span id="txt-nav-contact">Contact</span>
                    </a>
                    
                    <!-- MOBILE HEADER ACTIONS (New) -->
                    <div class="flex md:hidden items-center gap-2 mr-1">
                        <button onclick="toggleLanguage()" class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-diez-dark active:scale-95 transition-all">
                            <img id="mobile-lang-flag-header" src="https://flagcdn.com/w40/fr.png" alt="FR" class="w-5 h-5 rounded-full object-cover">
                        </button>
                        <a href="#contact" class="w-9 h-9 flex items-center justify-center rounded-full bg-diez-orange text-white shadow-md active:scale-95 transition-all">
                            <i class="fas fa-paper-plane text-xs"></i>
                        </a>
                    </div>
                    
                    <!-- Mobile menu button -->
                    <button onclick="toggleMobileMenu()" class="md:hidden p-2 z-50 relative text-gray-600 hover:text-diez-orange focus:outline-none transition-colors">
                        <i id="mobile-menu-icon" class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- MOBILE MENU OVERLAY (New Premium Mobile Nav) -->
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-diez-base/95 backdrop-blur-xl z-40 transform translate-x-full transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1) flex flex-col justify-center px-8">
            <div class="flex flex-col space-y-6 text-center">
                <a href="#" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link">Accueil</a>
                <a href="#services" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link delay-100">Expertise</a>
                <a href="#how-we-work" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link delay-200">Process</a>
                <a href="#work" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link delay-300">Projets</a>
                <a href="/blog" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link delay-350">Blog</a>
                <a href="#testimonials" onclick="toggleMobileMenu()" class="text-4xl font-bold text-diez-dark hover:text-diez-orange transition-colors translate-y-8 opacity-0 mobile-link delay-400">Avis</a>
                
                <div class="pt-8 translate-y-8 opacity-0 mobile-link delay-500">
                    <a href="#contact" onclick="toggleMobileMenu()" class="inline-block w-full px-8 py-4 bg-diez-orange text-white text-lg font-bold rounded-full shadow-lg shadow-diez-orange/30 active:scale-95 transition-transform">
                        Contact
                    </a>
                </div>

                <!-- Mobile Lang Switcher -->
                <div class="pt-4 flex justify-center gap-4 translate-y-8 opacity-0 mobile-link delay-600">
                     <button onclick="toggleLanguage(); toggleMobileMenu()" class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm active:scale-95 transition-transform">
                        <img src="https://flagcdn.com/w40/fr.png" class="w-5 h-5 rounded-full object-cover">
                        <span class="font-bold text-gray-600">FR</span>
                    </button>
                     <button onclick="toggleLanguage(); toggleMobileMenu()" class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm active:scale-95 transition-transform">
                        <img src="https://flagcdn.com/w40/gb.png" class="w-5 h-5 rounded-full object-cover">
                        <span class="font-bold text-gray-600">EN</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- MAIN CONTENT WRAPPER (Fixes Footer Overlay Bug) -->
    <main class="relative z-10 bg-diez-base">

    <!-- Hero Section -->
    <header class="relative pt-36 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
            <div class="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-diez-orange/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob"></div>
            <div class="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-300/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <!-- Floating Avatars (Collaboration Style) -->
        <!-- Avatar 1: Top Left of Text -->
        <div class="absolute top-32 left-[10%] md:left-[20%] lg:left-[25%] animate-hover-card z-20 hidden md:block" style="animation-delay: 0s;">
            <div class="relative">
                <img src="https://i.pravatar.cc/150?img=32" alt="Collaborator" class="w-12 h-12 rounded-full border-2 border-white shadow-lg">
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-[10px]">
                    <i class="fas fa-mouse-pointer transform -rotate-12"></i>
                </div>
            </div>
        </div>

        <!-- Avatar 2: Right side near 'Strategically' -->
        <div class="absolute top-48 right-[5%] md:right-[15%] lg:right-[22%] animate-hover-card z-20 hidden md:block" style="animation-delay: 1.5s;">
             <div class="relative">
                <img src="https://i.pravatar.cc/150?img=11" alt="Collaborator" class="w-14 h-14 rounded-full border-2 border-white shadow-lg">
                 <div class="absolute -bottom-1 -left-2 w-7 h-7 bg-diez-orange text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-xs">
                    <i class="fas fa-pen"></i>
                </div>
            </div>
        </div>

        <!-- Avatar 3: Bottom Left near 'Experts' -->
        <div class="absolute bottom-48 left-[15%] md:left-[25%] animate-hover-card z-20 hidden md:block" style="animation-delay: 2.5s;">
             <div class="relative">
                <img src="https://i.pravatar.cc/150?img=5" alt="Collaborator" class="w-10 h-10 rounded-full border-2 border-white shadow-lg">
                <div class="absolute -top-2 -right-2 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm text-[8px]">
                    <i class="fas fa-check"></i>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-soft mb-8 animate-fade-in-up">
                <span class="w-2 h-2 rounded-full bg-diez-orange animate-pulse"></span>
                <span id="txt-hero-badge" class="text-xs font-semibold uppercase tracking-wider text-gray-500">Agence Mieux Notée 2025</span>
            </div>

            <!-- Main Headline with Magnificent Animation (Fixed Alignment) -->
            <h1 id="txt-hero-title" class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.2] mb-6 md:mb-8 max-w-6xl mx-auto flex flex-col items-center gap-1 md:gap-3">
                <!-- Line 1 -->
                <div class="flex flex-wrap justify-center gap-x-2 md:gap-x-6">
                    <span class="word-mask"><span class="word-animate delay-100">Votre</span></span>
                    <span class="word-mask"><span class="word-animate delay-200">Transformation</span></span>
                    <span class="word-mask"><span class="word-animate delay-300">Digitale,</span></span>
                </div>
                <!-- Line 2 -->
                <div class="flex flex-wrap justify-center items-baseline gap-x-2 md:gap-x-6">
                    <span class="word-mask pb-2" style="overflow: hidden;">
                        <span class="word-animate delay-400 block relative">
                            <span class="text-gradient-orange animate-shimmer relative inline-block pb-1 md:pb-2">
                                Sereine
                                <svg class="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-diez-orange opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
                                </svg>
                            </span>
                        </span>
                    </span>
                    <span class="word-mask"><span class="word-animate delay-500">&</span></span>
                    <span class="word-mask"><span class="word-animate delay-500">Maîtrisée</span></span>
                </div>
            </h1>

            <!-- Subtitle -->
            <p id="txt-hero-subtitle" class="text-sm sm:text-base md:text-xl text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                Nous créons les outils sur-mesure qui automatisent votre activité.
                <br class="hidden md:block">
                <strong>Délais garantis. Budget respecté. Zéro jargon technique.</strong>
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-20 w-full px-4">
                <a href="#contact" class="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-diez-orange text-white rounded-full font-bold text-base md:text-lg shadow-lg shadow-diez-orange/30 hover:shadow-diez-orange/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                    <span id="txt-hero-cta1">Auditer mon Business</span> <i class="fas fa-arrow-right text-sm"></i>
                </a>
                <a href="#work" class="w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-white text-diez-dark border border-gray-200 rounded-full font-bold text-base md:text-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-95 text-center">
                    <span id="txt-hero-cta2">Nos Réalisations</span>
                </a>
            </div>

            <!-- Hero Visual / Mockup Placeholder -->
            <div class="relative max-w-6xl mx-auto mt-10">
                <div class="relative rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gray-900 aspect-[16/9] group">
                    <!-- Placeholder for the main dashboard visual seen in original image -->
                    <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
                        <!-- Abstract UI representation -->
                        <div class="w-full h-full relative opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out">
                            <!-- Sidebar -->
                            <div class="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-700/50 hidden md:block">
                                <div class="h-12 w-32 bg-gray-800 rounded-lg m-6"></div>
                                <div class="space-y-4 px-6 mt-10">
                                    <div class="h-4 w-3/4 bg-gray-800 rounded"></div>
                                    <div class="h-4 w-1/2 bg-gray-800 rounded"></div>
                                    <div class="h-4 w-5/6 bg-gray-800 rounded"></div>
                                </div>
                            </div>
                            <!-- Header -->
                            <div class="absolute top-0 left-0 md:left-64 right-0 h-20 bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-md flex items-center px-8 justify-between">
                                <div class="h-8 w-48 bg-gray-700 rounded"></div>
                                <div class="flex gap-3">
                                    <div class="h-10 w-10 rounded-full bg-diez-orange"></div>
                                </div>
                            </div>
                            <!-- Content -->
                            <div class="absolute top-20 left-0 md:left-64 right-0 bottom-0 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                                <div class="col-span-2 h-64 bg-gray-800/50 rounded-2xl border border-gray-700/30 relative overflow-hidden">
                                    <div class="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-diez-orange/20 to-transparent"></div>
                                </div>
                                <div class="h-64 bg-gray-800/50 rounded-2xl border border-gray-700/30"></div>
                                <div class="col-span-3 h-48 bg-gray-800/50 rounded-2xl border border-gray-700/30"></div>
                            </div>
                        </div>
                        
                        <!-- Floating Elements -->
                        <div class="absolute -right-10 top-20 w-64 h-40 bg-white rounded-xl shadow-xl p-4 transform rotate-6 hidden lg:block animate-float">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><i class="fas fa-check"></i></div>
                                <div>
                                    <div id="txt-hero-float-1-title" class="text-sm font-bold text-gray-900">Croissance +120%</div>
                                    <div id="txt-hero-float-1-desc" class="text-xs text-gray-500">Rapport Analytics</div>
                                </div>
                            </div>
                            <div class="h-2 w-full bg-gray-100 rounded-full mb-2 overflow-hidden">
                                <div class="h-full w-3/4 bg-green-500 rounded-full"></div>
                            </div>
                        </div>

                         <div class="absolute -left-10 bottom-20 w-56 h-auto bg-diez-dark rounded-xl shadow-xl p-5 transform -rotate-3 hidden lg:block animate-float-delayed">
                             <div class="flex justify-between items-center mb-2">
                                <div id="txt-hero-float-2-title" class="text-xs font-medium text-gray-400">Utilisateurs Actifs</div>
                                <div class="text-xs font-bold text-diez-orange">+24%</div>
                             </div>
                             <div class="text-3xl font-bold text-white">42.5k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Partners / Stack Strip (Marquee) -->
    <section class="py-12 border-y border-gray-200/60 bg-white/50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 mb-8">
            <p id="txt-partners-title" class="text-center text-xs font-bold text-diez-orange uppercase tracking-[0.2em]">Ils nous font confiance</p>
        </div>
        
        <!-- Marquee Container -->
        <div class="relative flex overflow-x-hidden group">
            <!-- Gradient Masks for smooth edges -->
            <div class="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#FFF8F3] to-transparent z-10"></div>
            <div class="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#FFF8F3] to-transparent z-10"></div>

            <!-- Inner Moving Part (Duplicated for seamless loop) -->
            <div class="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-12">
                <!-- Original Set -->
                <i class="fab fa-aws text-4xl md:text-5xl text-gray-300 hover:text-[#FF9900] transition-colors cursor-pointer"></i>
                <i class="fab fa-google text-3xl md:text-4xl text-gray-300 hover:text-blue-500 transition-colors cursor-pointer"></i>
                <i class="fab fa-stripe text-5xl md:text-6xl text-gray-300 hover:text-[#635BFF] transition-colors cursor-pointer"></i>
                <i class="fab fa-spotify text-4xl md:text-5xl text-gray-300 hover:text-[#1DB954] transition-colors cursor-pointer"></i>
                <i class="fab fa-airbnb text-4xl md:text-5xl text-gray-300 hover:text-[#FF5A5F] transition-colors cursor-pointer"></i>
                <i class="fab fa-microsoft text-4xl md:text-5xl text-gray-300 hover:text-[#00A4EF] transition-colors cursor-pointer"></i>
                <i class="fab fa-uber text-4xl md:text-5xl text-gray-300 hover:text-black transition-colors cursor-pointer"></i>
                
                <!-- Duplicate Set -->
                <i class="fab fa-aws text-4xl md:text-5xl text-gray-300 hover:text-[#FF9900] transition-colors cursor-pointer"></i>
                <i class="fab fa-google text-3xl md:text-4xl text-gray-300 hover:text-blue-500 transition-colors cursor-pointer"></i>
                <i class="fab fa-stripe text-5xl md:text-6xl text-gray-300 hover:text-[#635BFF] transition-colors cursor-pointer"></i>
                <i class="fab fa-spotify text-4xl md:text-5xl text-gray-300 hover:text-[#1DB954] transition-colors cursor-pointer"></i>
                <i class="fab fa-airbnb text-4xl md:text-5xl text-gray-300 hover:text-[#FF5A5F] transition-colors cursor-pointer"></i>
                <i class="fab fa-microsoft text-4xl md:text-5xl text-gray-300 hover:text-[#00A4EF] transition-colors cursor-pointer"></i>
                <i class="fab fa-uber text-4xl md:text-5xl text-gray-300 hover:text-black transition-colors cursor-pointer"></i>
            </div>
        </div>
    </section>

    <!-- Work / Portfolio Section -->
    <section id="work" class="py-24 bg-white relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 reveal text-center md:text-left">
                <div class="max-w-2xl mx-auto md:mx-0">
                    <h2 id="txt-work-title" class="text-4xl md:text-5xl font-bold mb-4 text-diez-dark">Projets Sélectionnés</h2>
                    <p id="txt-work-subtitle" class="text-gray-600 text-lg">Nous ne faisons pas que du design; nous construisons des écosystèmes digitaux qui scalent.</p>
                </div>
                <a href="/projects" class="hidden md:inline-flex items-center gap-2 font-semibold text-diez-orange hover:gap-4 transition-all">
                    <span id="txt-work-link">Voir tous les projets</span> <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- Grid / Mobile Swipe Container -->
            <div class="relative group/slider">
                <div class="flex flex-col md:grid md:grid-cols-2 gap-8 lg:gap-12 mobile-scroll-container md:block">
                    <!-- Mobile Scroll Wrapper for Mobile only -->
                    <div id="slider-work" class="md:contents flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
                        <!-- Projects injected via JS -->
                    </div> <!-- End Mobile Flex Wrapper -->
                    
                    <!-- Modern Floating Arrow (Mobile Only) -->
                    <button onclick="scrollSlider('slider-work')" class="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-diez-dark shadow-lg animate-pulse hover:bg-white transition-all active:scale-95">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            
                <!-- Swipe Indicator (Mobile Only) -->
                <div class="md:hidden flex justify-center gap-2 mt-4 mb-8 opacity-50">
                    <div class="w-2 h-2 rounded-full bg-diez-orange"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>

                <div class="mt-4 text-center md:hidden">
                    <a href="/projects" class="inline-flex items-center gap-2 font-semibold text-diez-orange">
                        <span id="txt-work-link-mobile">Voir tous les projets</span> <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section (Bento Grid - Normal Scroll with Layering) -->
    <section id="services" class="relative z-0 min-h-screen flex flex-col justify-start pt-32 md:pt-48 pb-32 bg-diez-dark text-white">
        <!-- Background Glow -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div class="absolute top-20 left-20 w-96 h-96 bg-diez-orange rounded-full blur-[120px]"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div class="text-center max-w-3xl mx-auto mb-20 reveal">
                <span id="txt-bento-label" class="text-diez-orange font-bold tracking-wider uppercase text-sm mb-4 block">Notre Expertise</span>
                <h2 id="txt-bento-title" class="text-4xl md:text-5xl font-bold mb-6">Tout ce qu'il faut pour Automatiser</h2>
                <!-- Text Highlight applied here -->
                <p id="txt-bento-subtitle" class="text-xl text-gray-400 leading-relaxed highlight-text-container">
                    De l'analyse de vos processus jusqu'au déploiement final, nous couvrons tous les aspects techniques et créatifs.
                </p>
            </div>

            <!-- BENTO GRID -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                
                <!-- 1. Product Design (Large Landscape) -->
                <div class="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-100 relative overflow-hidden bento-card">
                    <div class="relative z-10">
                        <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl mb-6">
                            <i class="fas fa-pen-ruler"></i>
                        </div>
                        <h3 id="txt-bento-1-title" class="text-2xl font-bold mb-2">Interfaces & Ergonomie</h3>
                        <p id="txt-bento-1-desc" class="text-gray-400 max-w-sm">Nous concevons des outils internes intuitifs que vos équipes prendront plaisir à utiliser au quotidien. Fini les logiciels complexes.</p>
                    </div>
                    <!-- Abstract Visual (Parallax Movement) -->
                    <div class="absolute -right-10 -bottom-10 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bento-visual" data-speed="0.1">
                        <div class="flex gap-4">
                            <div class="w-32 h-32 rounded-full border-4 border-white/20"></div>
                            <div class="w-32 h-32 rounded-full bg-blue-500/30 blur-xl"></div>
                        </div>
                    </div>
                </div>

                <!-- 2. Engineering (Tall Vertical) -->
                <div class="md:row-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-200 relative overflow-hidden flex flex-col bento-card">
                    <div class="w-12 h-12 rounded-xl bg-diez-orange/20 flex items-center justify-center text-diez-orange text-xl mb-6">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3 id="txt-bento-2-title" class="text-2xl font-bold mb-2">Développement Sur-Mesure</h3>
                    <p id="txt-bento-2-desc" class="text-gray-400 mb-8">Des systèmes robustes pour digitaliser votre métier.</p>
                    
                    <!-- Fake Terminal Visual (Parallax Movement) -->
                    <div class="mt-auto bg-black/50 rounded-xl p-4 font-mono text-xs text-green-400 border border-white/5 shadow-2xl bento-visual" data-speed="-0.15">
                        <div class="flex gap-1.5 mb-3 opacity-50">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <p><span class="text-purple-400">const</span> <span class="text-yellow-300">process</span> = <span class="text-blue-300">async</span> () => {</p>
                        <p class="pl-4"><span class="text-purple-400">await</span> automatiser(<span class="text-orange-300">'Facturation'</span>);</p>
                        <p class="pl-4"><span class="text-purple-400">return</span> <span class="text-green-300">"Temps Gagné"</span>;</p>
                        <p>}</p>
                    </div>
                </div>

                <!-- 3. Growth (Square) -->
                <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-300 relative overflow-hidden bento-card">
                    <div class="relative z-10">
                         <div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 text-xl mb-6">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 id="txt-bento-3-title" class="text-xl font-bold mb-2">Automatisation</h3>
                        <p id="txt-bento-3-desc" class="text-gray-400 text-sm">Connexions API & CRM.</p>
                    </div>
                    <!-- Chart Visual (Parallax Scale/Move) -->
                     <div class="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-8 pb-6 opacity-20 group-hover:opacity-40 transition-opacity bento-visual" data-speed="0.2">
                         <div class="w-2 bg-green-400 h-4 rounded-t"></div>
                         <div class="w-2 bg-green-400 h-8 rounded-t"></div>
                         <div class="w-2 bg-green-400 h-6 rounded-t"></div>
                         <div class="w-2 bg-green-400 h-12 rounded-t"></div>
                         <div class="w-2 bg-green-400 h-10 rounded-t"></div>
                     </div>
                </div>

                <!-- 4. Mobile (Square) -->
                <div class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group reveal delay-400 relative overflow-hidden bento-card">
                    <div class="relative z-10">
                         <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl mb-6">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <h3 id="txt-bento-4-title" class="text-xl font-bold mb-2">Accessibilité</h3>
                        <p id="txt-bento-4-desc" class="text-gray-400 text-sm">Vos outils sur mobile & tablette.</p>
                    </div>
                    <i class="fas fa-wifi absolute -bottom-4 -right-4 text-8xl text-white/5 group-hover:text-white/10 transition-colors rotate-[-15deg] bento-visual" data-speed="0.15"></i>
                </div>

            </div>
        </div>
    </section>

    <!-- SOLID CURTAIN WRAPPER (Fixes overlapping bugs) -->
    <div class="relative z-20 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.3)] -mt-10 rounded-t-[3rem] md:rounded-t-[5rem]">

    <!-- How We Work Section (Vertical Timeline) - Curtain Cover -->
    <section id="how-we-work" class="py-32 bg-white relative z-10 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-24 reveal">
                <span id="txt-steps-label" class="text-diez-orange font-bold tracking-wider uppercase text-sm mb-4 block">Notre Processus</span>
                <h2 id="txt-steps-title" class="text-4xl md:text-5xl font-bold text-diez-dark">De l'Audit à l'Action</h2>
            </div>

            <div class="relative max-w-4xl mx-auto" id="timeline-container">
                <!-- Vertical Line (Background) -->
                <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2"></div>
                
                <!-- Vertical Line (Progress - Orange) -->
                <div id="timeline-progress" class="absolute left-6 md:left-1/2 top-0 w-0.5 bg-diez-orange -translate-x-1/2 transition-all duration-75 ease-linear" style="height: 0%;"></div>

                <!-- Steps Container -->
                <div class="space-y-16 md:space-y-24 pt-4">
                    
                    <!-- Step 1 -->
                    <div class="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group timeline-step">
                        <!-- Mobile: Content is right of the line. Desktop: Left side -->
                        <div class="pl-16 md:pl-0 md:w-1/2 md:pr-16 md:text-right order-1 reveal delay-100">
                            <h3 id="txt-step-1-title" class="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-diez-dark">Audit & Compréhension</h3>
                            <p id="txt-step-1-desc" class="text-gray-500 text-sm md:text-base leading-relaxed">Nous commençons par comprendre votre métier. Nous analysons vos goulots d'étranglement et vos pertes de temps pour définir où l'automatisation aura le plus d'impact ROI.</p>
                        </div>
                        <!-- Dot -->
                        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full z-10 flex items-center justify-center font-bold text-sm md:text-base text-gray-300 transition-all duration-500 timeline-dot shadow-sm top-0 md:top-auto">1</div>
                        <div class="hidden md:block md:w-1/2 md:pl-16 order-3"></div>
                    </div>

                    <!-- Step 2 -->
                    <div class="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group timeline-step">
                        <div class="hidden md:block md:w-1/2 md:pr-16 order-1"></div>
                        <!-- Dot -->
                        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full z-10 flex items-center justify-center font-bold text-sm md:text-base text-gray-300 transition-all duration-500 timeline-dot shadow-sm top-0 md:top-auto">2</div>
                        <div class="pl-16 md:pl-16 md:w-1/2 md:text-left order-1 reveal delay-100">
                            <h3 id="txt-step-2-title" class="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-diez-dark">Construction Agile</h3>
                            <p id="txt-step-2-desc" class="text-gray-500 text-sm md:text-base leading-relaxed">Pas d'effet tunnel. Nous développons vos outils étape par étape. Vous validez chaque fonctionnalité toutes les deux semaines. Vous gardez le contrôle total sur le budget et la direction.</p>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group timeline-step">
                        <div class="pl-16 md:pl-0 md:w-1/2 md:pr-16 md:text-right order-1 reveal delay-100">
                            <h3 id="txt-step-3-title" class="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-diez-dark">Déploiement & Formation</h3>
                            <p id="txt-step-3-desc" class="text-gray-500 text-sm md:text-base leading-relaxed">La technique n'est rien sans adoption. Nous installons les outils et formons vos équipes pour qu'elles gagnent du temps dès le premier jour. Zéro rupture d'activité.</p>
                        </div>
                        <!-- Dot -->
                        <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full z-10 flex items-center justify-center font-bold text-sm md:text-base text-gray-300 transition-all duration-500 timeline-dot shadow-sm top-0 md:top-auto">3</div>
                        <div class="hidden md:block md:w-1/2 md:pl-16 order-3"></div>
                    </div>

                </div>
            </div>
        </div>
        
        <!-- Script specific for Timeline Animation -->
        
    </section>

    <!-- Testimonials (Wall of Love) - NEW -->
    <section id="testimonials" class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 reveal text-center md:text-left">
                <div class="mx-auto md:mx-0">
                    <h2 id="txt-testim-title" class="text-4xl font-bold text-diez-dark mb-4">Ils nous font confiance</h2>
                    <p id="txt-testim-subtitle" class="text-gray-600">Des résultats concrets, pas de promesses en l'air.</p>
                </div>
            </div>

            <div class="relative group/slider">
                <div id="slider-testimonials" class="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
                    <!-- Review 1 -->
                    <div class="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm reveal delay-100 border border-gray-100">
                    <div class="flex text-diez-orange mb-4 text-xs gap-1">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p id="txt-testim-1" class="text-gray-700 mb-6 leading-relaxed">"On perdait 2 jours par semaine sur Excel. Diez a créé un outil sur-mesure qui a tout automatisé. L'investissement a été rentabilisé en 3 mois."</p>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden"><img src="https://i.pravatar.cc/150?img=68" alt="User"></div>
                        <div>
                            <div class="font-bold text-sm text-diez-dark">Marc D.</div>
                            <div class="text-xs text-gray-400">Dirigeant, LogiTrans</div>
                        </div>
                    </div>
                </div>

                <!-- Review 2 -->
                <div class="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm reveal delay-200 border border-gray-100">
                     <div class="flex text-diez-orange mb-4 text-xs gap-1">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p id="txt-testim-2" class="text-gray-700 mb-6 leading-relaxed">"J'avais peur que ce soit trop technique pour nous. L'équipe a été ultra-pédagogue et l'outil est hyper simple à utiliser. Je recommande."</p>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden"><img src="https://i.pravatar.cc/150?img=44" alt="User"></div>
                        <div>
                            <div class="font-bold text-sm text-diez-dark">Sophie L.</div>
                            <div class="text-xs text-gray-400">Fondatrice, Cabinet Conseil</div>
                        </div>
                    </div>
                </div>

                <!-- Review 3 -->
                    <div class="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm reveal delay-300 border border-gray-100">
                         <div class="flex text-diez-orange mb-4 text-xs gap-1">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                        <p id="txt-testim-3" class="text-gray-700 mb-6 leading-relaxed">"Enfin une agence qui respecte les délais ! Outil livré à la date prévue, budget respecté à l'euro près. Ça change tout."</p>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden"><img src="https://i.pravatar.cc/150?img=12" alt="User"></div>
                            <div>
                                <div class="font-bold text-sm text-diez-dark">Thomas B.</div>
                                <div class="text-xs text-gray-400">Directeur, BatiPro</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Modern Floating Arrow (Mobile Only) -->
                <button onclick="scrollSlider('slider-testimonials')" class="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-diez-dark shadow-lg animate-pulse hover:bg-white transition-all active:scale-95">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 bg-diez-base">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 reveal">
                <h2 id="txt-pricing-title" class="text-4xl md:text-5xl font-bold text-diez-dark mb-6">Prix Simples, Grande Valeur</h2>
                <p id="txt-pricing-subtitle" class="text-gray-600 text-lg max-w-2xl mx-auto">Choisissez le plan adapté à votre stade. Pas de frais cachés, juste des résultats.</p>
            </div>

            <div class="relative group/slider">
                <div id="slider-pricing" class="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-8 items-center pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
                    <!-- Starter -->
                <div class="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 reveal delay-100">
                    <h3 id="txt-price-1-title" class="text-xl font-bold text-gray-900 mb-2">Démarrage</h3>
                    <div class="text-4xl font-bold mb-6">2 900€<span id="txt-price-1-period" class="text-base font-normal text-gray-500">/mois</span></div>
                    <p id="txt-price-1-desc" class="text-gray-500 mb-8 text-sm">Parfait pour les MVPs et la validation rapide.</p>
                    <ul class="space-y-4 mb-8 text-gray-600">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-1-f1">Système de Design</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-1-f2">5 Pages Frontend</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-1-f3">SEO de base</span></li>
                        <li class="flex items-center gap-3 text-gray-300"><i class="fas fa-times"></i> <span id="txt-price-1-f4">Support Backend</span></li>
                    </ul>
                    <a href="#" id="txt-price-1-btn" class="block w-full py-3 px-6 text-center rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors">Commencer</a>
                </div>

                <!-- Pro (Featured) -->
                <div class="min-w-[85vw] md:min-w-0 snap-center bg-diez-dark p-8 rounded-3xl shadow-2xl border border-gray-800 transform scale-100 md:scale-105 relative z-10 reveal delay-200">
                    <div id="txt-price-2-badge" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-diez-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Populaire</div>
                    <h3 id="txt-price-2-title" class="text-xl font-bold text-white mb-2">Croissance</h3>
                    <div class="text-4xl font-bold text-white mb-6">5 500€<span id="txt-price-2-period" class="text-base font-normal text-gray-400">/mois</span></div>
                    <p id="txt-price-2-desc" class="text-gray-400 mb-8 text-sm">Pour les équipes en croissance nécessitant un partenaire produit.</p>
                    <ul class="space-y-4 mb-8 text-gray-300">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-diez-orange"></i> <span id="txt-price-2-f1">Suite UI/UX Complète</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-diez-orange"></i> <span id="txt-price-2-f2">App React/Next.js</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-diez-orange"></i> <span id="txt-price-2-f3">Intégration API</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-diez-orange"></i> <span id="txt-price-2-f4">Sprints Hebdomadaires</span></li>
                    </ul>
                    <a href="#" id="txt-price-2-btn" class="block w-full py-3 px-6 text-center rounded-xl bg-diez-orange text-white font-bold hover:bg-white hover:text-diez-orange transition-colors">Choisir Pro</a>
                </div>

                <!-- Enterprise -->
                <div class="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 reveal delay-300">
                    <h3 id="txt-price-3-title" class="text-xl font-bold text-gray-900 mb-2">Entreprise</h3>
                    <div class="text-4xl font-bold mb-6">Sur mesure<span id="txt-price-3-period" class="text-base font-normal text-gray-500">/devis</span></div>
                    <p id="txt-price-3-desc" class="text-gray-500 mb-8 text-sm">Transformation digitale complète pour organisations établies.</p>
                    <ul class="space-y-4 mb-8 text-gray-600">
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-3-f1">Équipe Dédiée (5+)</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-3-f2">Support 24/7</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-3-f3">Architecture Cloud</span></li>
                        <li class="flex items-center gap-3"><i class="fas fa-check text-green-500"></i> <span id="txt-price-3-f4">Sécurité Avancée</span></li>
                    </ul>
                    <a href="#" id="txt-price-3-btn" class="block w-full py-3 px-6 text-center rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors">Contacter Ventes</a>
                    </div>
                </div>
                
                <!-- Modern Floating Arrow (Mobile Only) -->
                <button onclick="scrollSlider('slider-pricing')" class="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-diez-orange/80 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse hover:bg-diez-orange transition-all active:scale-95">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            
            <!-- Swipe Indicator (Mobile Only - Pricing) -->
            <div class="md:hidden flex justify-center gap-2 mt-4 opacity-50">
                <div class="w-2 h-2 rounded-full bg-diez-orange"></div>
                <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                <div class="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-white">
         <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="txt-faq-title" class="text-3xl md:text-4xl font-bold text-center mb-12">Questions Fréquentes</h2>
            
            <div class="space-y-4">
                <!-- Item 1 -->
                <details class="group p-6 bg-gray-50 rounded-2xl open:bg-white open:shadow-lg transition-all duration-300">
                    <summary class="flex justify-between items-center font-bold cursor-pointer list-none text-lg text-diez-dark">
                        <span id="txt-faq-q1">Combien de temps dure un projet typique ?</span>
                        <span class="transition group-open:rotate-180">
                            <i class="fas fa-chevron-down text-diez-orange"></i>
                        </span>
                    </summary>
                    <div id="txt-faq-a1" class="text-gray-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                        Les délais varient selon la complexité. Une landing page peut prendre 2 semaines, un SaaS complet 8-12 semaines. Nous travaillons en sprints de 2 semaines pour montrer des progrès constants.
                    </div>
                </details>

                <!-- Item 2 -->
                <details class="group p-6 bg-gray-50 rounded-2xl open:bg-white open:shadow-lg transition-all duration-300">
                    <summary class="flex justify-between items-center font-bold cursor-pointer list-none text-lg text-diez-dark">
                        <span id="txt-faq-q2">Assurez-vous le support après lancement ?</span>
                        <span class="transition group-open:rotate-180">
                            <i class="fas fa-chevron-down text-diez-orange"></i>
                        </span>
                    </summary>
                    <div id="txt-faq-a2" class="text-gray-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                        Absolument. Nous proposons plusieurs forfaits de maintenance pour garder votre produit sécurisé et à jour.
                    </div>
                </details>

                <!-- Item 3 -->
                <details class="group p-6 bg-gray-50 rounded-2xl open:bg-white open:shadow-lg transition-all duration-300">
                    <summary class="flex justify-between items-center font-bold cursor-pointer list-none text-lg text-diez-dark">
                        <span id="txt-faq-q3">Quelles technologies utilisez-vous ?</span>
                        <span class="transition group-open:rotate-180">
                            <i class="fas fa-chevron-down text-diez-orange"></i>
                        </span>
                    </summary>
                    <div id="txt-faq-a3" class="text-gray-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                        Nous sommes experts de la stack Javascript moderne : React, Next.js, Node.js et Tailwind CSS pour le frontend et le backend.
                    </div>
                </details>
            </div>
         </div>
    </section>

    <!-- Manifesto Section (Text Highlight Effect) -->
    <section class="py-32 bg-white relative z-10">
        <div class="max-w-4xl mx-auto px-6 md:px-12">
            <p class="text-sm font-bold text-diez-orange uppercase tracking-widest mb-8 text-center">Notre Philosophie</p>
            <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center highlight-text-container">
                <!-- Text is split by JS for animation -->
                Nous croyons que la technologie doit servir votre métier, pas le complexifier. Un mauvais logiciel tue la croissance. Un bon outil libère le potentiel de vos équipes. Nous ne vendons pas des lignes de code, nous vendons de la sérénité et de la performance.
            </h2>
        </div>
    </section>

    <!-- CTA / Footer Top (Redesigned Mesh Gradient) -->
    <section class="py-12 md:py-24 px-4 relative overflow-hidden z-30 bg-white rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl mb-0 md:mb-[400px]"> <!-- Reset margin on mobile -->
        <div class="max-w-6xl mx-auto relative">
            <!-- Main Card -->
            <div class="bg-diez-dark rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl reveal border border-white/5">
                
                <!-- Background Glow (Same as Services Section) -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
                    <div class="absolute -top-20 -right-20 w-96 h-96 bg-diez-orange rounded-full blur-[100px]"></div>
                    <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 pb-4">
                    <h2 class="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight">
                        Prêt à passer à la <br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-diez-orange to-white">vitesse supérieure ?</span>
                    </h2>
                    <p class="text-base md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto font-light">
                        Rejoignez les dirigeants qui ont choisi l'efficacité. Transformons vos processus manuels en avantages compétitifs.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#contact" class="px-8 py-4 md:px-10 md:py-5 bg-white text-diez-dark rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2 group active:scale-95">
                            Lancer l'Audit Gratuit 
                            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                        </a>
                        <a href="#" class="px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-base md:text-lg hover:bg-white/20 transition-all flex items-center justify-center active:scale-95">
                            Voir les Cas Clients
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

    </div> <!-- End of Solid Curtain Wrapper -->
    </main>

    <!-- Footer (Hybrid: Relative on Mobile, Fixed on Desktop) -->
    <footer class="bg-diez-dark text-white pt-16 pb-12 md:pt-12 md:pb-8 relative md:fixed bottom-auto md:bottom-0 left-0 right-0 w-full z-0 md:-z-10 h-auto md:h-[400px] flex flex-col justify-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
                <div class="col-span-2 md:col-span-1">
                    <div class="flex items-center gap-3 mb-4 md:mb-6">
                        <div class="w-8 h-8 rounded-full bg-white overflow-hidden">
                            <img src="/images/logo.png" alt="Diez Logo" class="w-full h-full object-cover">
                        </div>
                        <span class="font-bold text-xl">Diez Agency</span>
                    </div>
                    <p id="txt-footer-desc" class="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs">
                        Nous construisons des produits digitaux qui définissent des catégories et stimulent la croissance.
                    </p>
                </div>
                
                <div>
                    <h4 id="txt-footer-h-services" class="font-bold mb-4 md:mb-6">Services</h4>
                    <ul class="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
                        <li><a href="#" id="txt-footer-l-web" class="hover:text-diez-orange transition-colors">Développement Web</a></li>
                        <li><a href="#" id="txt-footer-l-mob" class="hover:text-diez-orange transition-colors">Apps Mobiles</a></li>
                        <li><a href="#" id="txt-footer-l-ui" class="hover:text-diez-orange transition-colors">Design UI/UX</a></li>
                        <li><a href="#" id="txt-footer-l-consult" class="hover:text-diez-orange transition-colors">Consulting</a></li>
                        <li><a href="/blog" class="hover:text-diez-orange transition-colors">Blog & Actualités</a></li>
                    </ul>
                </div>

                <div>
                    <h4 id="txt-footer-h-company" class="font-bold mb-4 md:mb-6">Agence</h4>
                    <ul class="space-y-2 md:space-y-3 text-gray-400 text-xs md:text-sm">
                        <li><a href="#" id="txt-footer-l-about" class="hover:text-diez-orange transition-colors">À Propos</a></li>
                        <li><a href="#" id="txt-footer-l-careers" class="hover:text-diez-orange transition-colors">Carrières</a></li>
                        <li><a href="#" id="txt-footer-l-blog" class="hover:text-diez-orange transition-colors">Blog</a></li>
                        <li><a href="#" id="txt-footer-l-contact" class="hover:text-diez-orange transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div class="col-span-2 md:col-span-1">
                    <h4 id="txt-footer-h-newsletter" class="font-bold mb-4 md:mb-6">Newsletter</h4>
                    <p id="txt-footer-news-text" class="text-gray-400 text-xs md:text-sm mb-4">Recevez les dernières tendances.</p>
                    <div class="flex">
                        <input id="txt-footer-email-ph" type="email" placeholder="Votre email" class="bg-white/10 border border-white/10 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-diez-orange">
                        <button class="bg-diez-orange px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>

            <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-gray-500 text-xs md:text-sm text-center md:text-left">© 2025 Diez Agency. Tous droits réservés.</div>
                <div class="flex space-x-6 text-gray-400">
                    <a href="#" class="hover:text-white transition-colors"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-white transition-colors"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="hover:text-white transition-colors"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="hover:text-white transition-colors"><i class="fab fa-dribbble"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts for simple interactions -->
    
    <!-- Back to Top Button -->
    <button id="back-to-top" onclick="lenis.scrollTo(0)" class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-diez-orange text-white rounded-full shadow-lg shadow-diez-orange/40 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-10 pointer-events-none hover:scale-110 hover:shadow-diez-orange/60 active:scale-95">
        <i class="fas fa-arrow-up text-lg"></i>
    </button>

    <!-- Scripts for simple interactions -->
    <!-- Lenis Smooth Scroll (Premium Inertia) -->`;
