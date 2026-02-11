/**
 * Diez Agency - Système de gestion des réalisations
 * Backend: Supabase
 */

/**
 * Récupère toutes les réalisations depuis Supabase
 */
async function getRealisations() {
    try {
        const { data, error } = await window.supabaseClient
            .from('realisations')
            .select('*')
            .order('ordre', { ascending: true });
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des réalisations:', error);
        return [];
    }
}

/**
 * Récupère les réalisations à afficher sur la page d'accueil
 */
async function getRealisationsAccueil() {
    try {
        const { data, error } = await window.supabaseClient
            .from('realisations')
            .select('*')
            .eq('afficher_accueil', true)
            .order('ordre', { ascending: true });
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des réalisations accueil:', error);
        return [];
    }
}

/**
 * Récupère une réalisation par son ID
 */
async function getRealisationById(id) {
    try {
        const { data, error } = await window.supabaseClient
            .from('realisations')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la réalisation:', error);
        return null;
    }
}

/**
 * Ajoute une nouvelle réalisation
 */
async function addRealisation(realisation) {
    try {
        // Get max ordre
        const { data: maxData } = await window.supabaseClient
            .from('realisations')
            .select('ordre')
            .order('ordre', { ascending: false })
            .limit(1);
        
        const newOrdre = maxData && maxData.length > 0 ? maxData[0].ordre + 1 : 1;
        
        const { data, error } = await window.supabaseClient
            .from('realisations')
            .insert([{
                nom: realisation.nom,
                description: realisation.description,
                categorie: realisation.categorie,
                client: realisation.client,
                annee: realisation.annee,
                technologies: realisation.technologies || [],
                images: realisation.images || [],
                videos: realisation.videos || [],
                lien: realisation.lien,
                couleur_fond: realisation.couleurFond || realisation.couleur_fond,
                couleur_texte: realisation.couleurTexte || realisation.couleur_texte,
                icone: realisation.icone,
                afficher_accueil: realisation.afficherAccueil !== undefined ? realisation.afficherAccueil : realisation.afficher_accueil,
                ordre: newOrdre
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réalisation:', error);
        throw error;
    }
}

/**
 * Met à jour une réalisation existante
 */
async function updateRealisation(id, updatedData) {
    try {
        const updateObj = {};
        
        // Map camelCase to snake_case
        if (updatedData.nom !== undefined) updateObj.nom = updatedData.nom;
        if (updatedData.description !== undefined) updateObj.description = updatedData.description;
        if (updatedData.categorie !== undefined) updateObj.categorie = updatedData.categorie;
        if (updatedData.client !== undefined) updateObj.client = updatedData.client;
        if (updatedData.annee !== undefined) updateObj.annee = updatedData.annee;
        if (updatedData.technologies !== undefined) updateObj.technologies = updatedData.technologies;
        if (updatedData.images !== undefined) updateObj.images = updatedData.images;
        if (updatedData.videos !== undefined) updateObj.videos = updatedData.videos;
        if (updatedData.lien !== undefined) updateObj.lien = updatedData.lien;
        if (updatedData.couleurFond !== undefined) updateObj.couleur_fond = updatedData.couleurFond;
        if (updatedData.couleur_fond !== undefined) updateObj.couleur_fond = updatedData.couleur_fond;
        if (updatedData.couleurTexte !== undefined) updateObj.couleur_texte = updatedData.couleurTexte;
        if (updatedData.couleur_texte !== undefined) updateObj.couleur_texte = updatedData.couleur_texte;
        if (updatedData.icone !== undefined) updateObj.icone = updatedData.icone;
        if (updatedData.afficherAccueil !== undefined) updateObj.afficher_accueil = updatedData.afficherAccueil;
        if (updatedData.afficher_accueil !== undefined) updateObj.afficher_accueil = updatedData.afficher_accueil;
        if (updatedData.ordre !== undefined) updateObj.ordre = updatedData.ordre;
        
        const { data, error } = await window.supabaseClient
            .from('realisations')
            .update(updateObj)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réalisation:', error);
        throw error;
    }
}

/**
 * Supprime une réalisation
 */
async function deleteRealisation(id) {
    try {
        const { error } = await window.supabaseClient
            .from('realisations')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression de la réalisation:', error);
        throw error;
    }
}

/**
 * Upload une image vers Supabase Storage
 */
async function uploadImage(file) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `projects/${fileName}`;
        
        const { data, error } = await window.supabaseClient.storage
            .from('realisations')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) throw error;
        
        // Get public URL
        const { data: urlData } = window.supabaseClient.storage
            .from('realisations')
            .getPublicUrl(filePath);
        
        return urlData.publicUrl;
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        throw error;
    }
}

/**
 * Supprime une image de Supabase Storage
 */
async function deleteImage(imageUrl) {
    try {
        // Extract file path from URL
        const urlParts = imageUrl.split('/realisations/');
        if (urlParts.length < 2) return;
        
        const filePath = urlParts[1];
        
        const { error } = await window.supabaseClient.storage
            .from('realisations')
            .remove([filePath]);
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image:', error);
        // Don't throw - image might not exist in storage
        return false;
    }
}

/**
 * Génère le HTML d'une carte de réalisation pour la page Work
 */
function generateWorkCard(realisation) {
    const r = normalizeRealisation(realisation);
    const textColorClass = r.couleurTexte === 'white' ? 'text-white' : 'text-gray-900';
    const descColorClass = r.couleurTexte === 'white' ? 'text-gray-300' : 'text-gray-600';
    
    return `
        <div class="group cursor-pointer realisation-card overflow-hidden rounded-3xl shadow-lg aspect-[4/3] relative active:scale-[0.98] transition-all duration-300 hover:shadow-2xl"
             data-id="${r.id}"
             onclick="openRealisationPopup('${r.id}')">
            <div class="absolute inset-0 w-full h-full flex items-center justify-center" style="background-color: ${r.couleurFond}">
                ${r.images && r.images.length > 0 
                    ? `<img src="${r.images[0]}" alt="${r.nom}" class="w-full h-full object-cover">`
                    : `<i class="fas ${r.icone} text-6xl md:text-8xl opacity-30 ${textColorClass} transform scale-90 group-hover:scale-100 transition-transform duration-700"></i>`
                }
            </div>
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 bg-white/20 text-white">${r.categorie}</span>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-1">${r.nom}</h3>
                <p class="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">${r.description}</p>
            </div>
        </div>
    `;
}

/**
 * Génère le HTML d'une carte pour la page d'accueil
 */
function generateAccueilCard(realisation, index) {
    const r = normalizeRealisation(realisation);
    const textColorClass = r.couleurTexte === 'white' ? 'text-white' : 'text-gray-900';
    const descColorClass = r.couleurTexte === 'white' ? 'text-gray-400' : 'text-gray-600';
    const delayClass = index % 2 === 0 ? 'delay-100' : 'delay-200';
    const marginTop = index % 2 === 1 ? 'md:mt-16' : '';
    
    return `
        <div class="min-w-[85vw] md:min-w-0 snap-center group cursor-pointer ${marginTop} reveal ${delayClass} parallax-card overflow-hidden rounded-3xl shadow-lg mb-0 md:mb-6 aspect-[4/3] relative active:scale-95 transition-transform duration-300"
             onclick="window.location.href='work.html?open=${r.id}'">
            <div class="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] flex items-center justify-center" style="background-color: ${r.couleurFond}">
                ${r.images && r.images.length > 0 
                    ? `<img src="${r.images[0]}" alt="${r.nom}" class="w-full h-full object-cover">`
                    : `<i class="fas ${r.icone} text-7xl md:text-9xl opacity-30 ${textColorClass} transform scale-90 group-hover:scale-100 transition-transform duration-700"></i>`
                }
            </div>
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 class="text-2xl font-bold ${textColorClass} mb-1">${r.nom}</h3>
                <p class="${descColorClass} text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">${r.categorie}</p>
            </div>
        </div>
    `;
}

/**
 * Normalise une réalisation (snake_case -> camelCase)
 */
function normalizeRealisation(r) {
    return {
        id: r.id,
        nom: r.nom,
        description: r.description,
        categorie: r.categorie,
        client: r.client,
        annee: r.annee,
        technologies: r.technologies || [],
        images: r.images || [],
        videos: r.videos || [],
        lien: r.lien,
        couleurFond: r.couleur_fond || r.couleurFond || '#1f2937',
        couleurTexte: r.couleur_texte || r.couleurTexte || 'white',
        icone: r.icone || 'fa-chart-line',
        afficherAccueil: r.afficher_accueil !== undefined ? r.afficher_accueil : r.afficherAccueil,
        ordre: r.ordre
    };
}

// Export pour utilisation dans d'autres scripts
window.RealisationsManager = {
    get: getRealisations,
    getAccueil: getRealisationsAccueil,
    getById: getRealisationById,
    add: addRealisation,
    update: updateRealisation,
    delete: deleteRealisation,
    uploadImage: uploadImage,
    deleteImage: deleteImage,
    generateWorkCard: generateWorkCard,
    generateAccueilCard: generateAccueilCard,
    normalize: normalizeRealisation
};
