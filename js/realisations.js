/**
 * Diez Agency - Système de gestion des réalisations
 * Utilise localStorage pour stocker les données
 */

const STORAGE_KEY = 'diez_realisations';

// Données par défaut (exemples)
const defaultRealisations = [
    {
        id: '1',
        nom: 'Dashboard Fintech',
        description: 'Création d\'un tableau de bord complet pour une startup fintech. Interface moderne avec visualisation de données en temps réel, gestion des transactions et analytics avancés.',
        categorie: 'Design Produit • Développement',
        client: 'FinanceApp',
        annee: '2024',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
        images: [],
        videos: [],
        lien: '',
        couleurFond: '#1f2937',
        couleurTexte: 'white',
        icone: 'fa-chart-line',
        afficherAccueil: true,
        ordre: 1
    },
    {
        id: '2',
        nom: 'App Santé',
        description: 'Application mobile de suivi santé avec intelligence artificielle. Suivi des constantes vitales, rappels de médicaments et conseils personnalisés.',
        categorie: 'App Mobile • Stratégie UX',
        client: 'HealthTech',
        annee: '2024',
        technologies: ['React Native', 'Firebase', 'TensorFlow'],
        images: [],
        videos: [],
        lien: '',
        couleurFond: '#E0E7FF',
        couleurTexte: 'dark',
        icone: 'fa-heartbeat',
        afficherAccueil: true,
        ordre: 2
    },
    {
        id: '3',
        nom: 'Refonte E-Commerce',
        description: 'Refonte complète d\'une boutique en ligne avec nouvelle identité visuelle. Augmentation du taux de conversion de 45% grâce à une UX optimisée.',
        categorie: 'Branding • Shopify',
        client: 'ModaStyle',
        annee: '2023',
        technologies: ['Shopify', 'Liquid', 'JavaScript'],
        images: [],
        videos: [],
        lien: '',
        couleurFond: '#FFF1F2',
        couleurTexte: 'dark',
        icone: 'fa-shopping-bag',
        afficherAccueil: true,
        ordre: 3
    },
    {
        id: '4',
        nom: 'Architecture SaaS',
        description: 'Conception et développement d\'une architecture scalable pour une plateforme SaaS multi-tenant. Infrastructure cloud optimisée pour la performance.',
        categorie: 'Backend • Infrastructure',
        client: 'CloudPlatform',
        annee: '2024',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Go'],
        images: [],
        videos: [],
        lien: '',
        couleurFond: '#0F0F0F',
        couleurTexte: 'white',
        icone: 'fa-layer-group',
        afficherAccueil: true,
        ordre: 4
    }
];

/**
 * Initialise les données si elles n'existent pas
 */
function initRealisations() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRealisations));
    }
}

/**
 * Récupère toutes les réalisations
 */
function getRealisations() {
    initRealisations();
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/**
 * Récupère les réalisations à afficher sur la page d'accueil
 */
function getRealisationsAccueil() {
    return getRealisations()
        .filter(r => r.afficherAccueil)
        .sort((a, b) => a.ordre - b.ordre);
}

/**
 * Récupère une réalisation par son ID
 */
function getRealisationById(id) {
    const realisations = getRealisations();
    return realisations.find(r => r.id === id);
}

/**
 * Ajoute une nouvelle réalisation
 */
function addRealisation(realisation) {
    const realisations = getRealisations();
    realisation.id = Date.now().toString();
    realisation.ordre = realisations.length + 1;
    realisations.push(realisation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(realisations));
    return realisation;
}

/**
 * Met à jour une réalisation existante
 */
function updateRealisation(id, updatedData) {
    const realisations = getRealisations();
    const index = realisations.findIndex(r => r.id === id);
    if (index !== -1) {
        realisations[index] = { ...realisations[index], ...updatedData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(realisations));
        return realisations[index];
    }
    return null;
}

/**
 * Supprime une réalisation
 */
function deleteRealisation(id) {
    let realisations = getRealisations();
    realisations = realisations.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(realisations));
}

/**
 * Réinitialise les données aux valeurs par défaut
 */
function resetRealisations() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRealisations));
}

/**
 * Upload d'image vers base64 (pour localStorage)
 */
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 * Génère le HTML d'une carte de réalisation pour la page Work
 */
function generateWorkCard(realisation) {
    const textColorClass = realisation.couleurTexte === 'white' ? 'text-white' : 'text-gray-900';
    const descColorClass = realisation.couleurTexte === 'white' ? 'text-gray-300' : 'text-gray-600';
    
    return `
        <div class="group cursor-pointer realisation-card overflow-hidden rounded-3xl shadow-lg aspect-[4/3] relative active:scale-[0.98] transition-all duration-300 hover:shadow-2xl"
             data-id="${realisation.id}"
             onclick="openRealisationPopup('${realisation.id}')">
            <div class="absolute inset-0 w-full h-full flex items-center justify-center" style="background-color: ${realisation.couleurFond}">
                <i class="fas ${realisation.icone} text-6xl md:text-8xl opacity-30 ${textColorClass} transform scale-90 group-hover:scale-100 transition-transform duration-700"></i>
            </div>
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${realisation.couleurTexte === 'white' ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-700'}">${realisation.categorie}</span>
                <h3 class="text-xl md:text-2xl font-bold ${textColorClass} mb-1">${realisation.nom}</h3>
                <p class="${descColorClass} text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">${realisation.description}</p>
            </div>
        </div>
    `;
}

/**
 * Génère le HTML d'une carte pour la page d'accueil
 */
function generateAccueilCard(realisation, index) {
    const textColorClass = realisation.couleurTexte === 'white' ? 'text-white' : 'text-gray-900';
    const descColorClass = realisation.couleurTexte === 'white' ? 'text-gray-400' : 'text-gray-600';
    const delayClass = index % 2 === 0 ? 'delay-100' : 'delay-200';
    const marginTop = index % 2 === 1 ? 'md:mt-16' : '';
    
    return `
        <div class="min-w-[85vw] md:min-w-0 snap-center group cursor-pointer ${marginTop} reveal ${delayClass} parallax-card overflow-hidden rounded-3xl shadow-lg mb-0 md:mb-6 aspect-[4/3] relative active:scale-95 transition-transform duration-300"
             onclick="window.location.href='work.html?open=${realisation.id}'">
            <div class="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] flex items-center justify-center" style="background-color: ${realisation.couleurFond}">
                <i class="fas ${realisation.icone} text-7xl md:text-9xl opacity-30 ${textColorClass} transform scale-90 group-hover:scale-100 transition-transform duration-700"></i>
            </div>
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-2xl font-bold ${textColorClass} mb-1">${realisation.nom}</h3>
                <p class="${descColorClass} text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">${realisation.categorie}</p>
            </div>
        </div>
    `;
}

// Export pour utilisation dans d'autres scripts
window.RealisationsManager = {
    get: getRealisations,
    getAccueil: getRealisationsAccueil,
    getById: getRealisationById,
    add: addRealisation,
    update: updateRealisation,
    delete: deleteRealisation,
    reset: resetRealisations,
    imageToBase64: imageToBase64,
    generateWorkCard: generateWorkCard,
    generateAccueilCard: generateAccueilCard
};
