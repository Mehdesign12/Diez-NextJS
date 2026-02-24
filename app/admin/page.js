"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PROJECTS, normalizeProjects } from "../lib/projects";

const STORAGE_KEY = "diez_projects";

const getStoredProjects = () => {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  const projects = stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  return normalizeProjects(projects);
};

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    subtitle: "",
    category: "Fintech",
    isFeatured: false,
    showOnProjects: true,
    mediaUrl: "",
  });

  const mediaPreview = useMemo(() => formState.mediaUrl, [formState.mediaUrl]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProjects(getStoredProjects());
  }, []);

  const saveProjects = (nextProjects) => {
    const normalized = normalizeProjects(nextProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    setProjects(normalized);
  };

  const resetData = () => {
    if (!window.confirm("Réinitialiser les données ?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setProjects(normalizeProjects(DEFAULT_PROJECTS));
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormState({
        title: project.title || "",
        subtitle: project.subtitle || "",
        category: project.category || "Fintech",
        isFeatured: Boolean(project.isFeatured),
        showOnProjects: project.showOnProjects !== false,
        mediaUrl: project.mediaUrl || "",
      });
    } else {
      setEditingId(null);
      setFormState({
        title: "",
        subtitle: "",
        category: "Fintech",
        isFeatured: false,
        showOnProjects: true,
        mediaUrl: "",
      });
    }

    setIsModalVisible(true);
    setTimeout(() => setIsModalActive(true), 10);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setTimeout(() => setIsModalVisible(false), 300);
    setEditingId(null);
  };

  const deleteProject = (id) => {
    if (!window.confirm("Supprimer ?")) return;
    const nextProjects = projects.filter((project) => project.id !== id);
    saveProjects(nextProjects);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image trop lourde pour le mode démo local (max 2MB).");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState((prev) => ({
        ...prev,
        mediaUrl: reader.result?.toString() || "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: formState.title,
      subtitle: formState.subtitle,
      category: formState.category,
      isFeatured: formState.isFeatured,
      showOnProjects: formState.showOnProjects,
      mediaUrl: formState.mediaUrl,
      mediaType: "image",
    };

    if (editingId) {
      const nextProjects = projects.map((project) =>
        project.id === editingId ? { ...project, ...payload } : project
      );
      saveProjects(nextProjects);
    } else {
      const newProject = {
        id: Date.now().toString(),
        ...payload,
      };
      saveProjects([newProject, ...projects]);
    }

    closeModal();
  };

  return (
    <div className="bg-gray-50 text-diez-dark font-sans min-h-screen">
      <nav className="bg-diez-dark text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-diez-orange rounded-full"></div>
            <h1 className="font-bold text-xl">
              Diez Admin{" "}
              <span className="text-xs bg-white/20 px-2 py-1 rounded ml-2">
                Mode Démo Local
              </span>
            </h1>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Voir le site <i className="fas fa-external-link-alt ml-1"></i>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Projets</h2>
            <p className="text-gray-500">
              Ces projets sont stockés dans votre navigateur.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetData}
              className="text-red-500 hover:text-red-700 font-bold px-4 py-3"
            >
              Reset
            </button>
            <button
              onClick={() => openModal()}
              className="bg-diez-orange text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all active:scale-95"
            >
              <i className="fas fa-plus mr-2"></i> Nouveau Projet
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="text-gray-500">Aucun projet.</div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative"
              >
                {project.isFeatured ? (
                  <span className="absolute top-4 left-4 bg-diez-orange text-white text-xs font-bold px-2 py-1 rounded z-10">
                    Accueil
                  </span>
                ) : null}
                {project.showOnProjects ? (
                  <span className="absolute top-4 right-4 bg-diez-dark text-white text-xs font-bold px-2 py-1 rounded z-10">
                    Réalisations
                  </span>
                ) : null}
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {project.mediaUrl && project.mediaUrl.startsWith("data:") ? (
                    <img
                      src={project.mediaUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${
                        project.colorClass || "bg-gray-200"
                      } flex items-center justify-center`}
                    >
                      <i
                        className={`${
                          project.icon || "fas fa-image"
                        } text-4xl opacity-20`}
                      ></i>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {project.subtitle}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase text-gray-400">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openModal(project)}
                        className="text-gray-400 hover:text-diez-orange text-sm"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-400 hover:text-red-600 text-sm"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {isModalVisible ? (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-transform duration-300 ${
              isModalActive ? "scale-100" : "scale-95"
            }`}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editingId ? "Modifier le projet" : "Ajouter un Projet"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-diez-orange"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold mb-2">Titre</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-diez-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subtitle}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        subtitle: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-1 focus:ring-diez-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Catégorie</label>
                  <select
                    value={formState.category}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        category: event.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="Fintech">Fintech</option>
                    <option value="SaaS">SaaS</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Santé">Santé</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formState.isFeatured}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        isFeatured: event.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-diez-orange rounded"
                  />
                  <label htmlFor="isFeatured" className="font-medium">
                    Afficher sur l&apos;accueil
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showOnProjects"
                    checked={formState.showOnProjects}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        showOnProjects: event.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-diez-orange rounded"
                  />
                  <label htmlFor="showOnProjects" className="font-medium">
                    Afficher sur la page Réalisations
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Image/Vidéo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-diez-orange file:text-white hover:file:bg-orange-600"
                  />
                  {mediaPreview ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-400 mb-2">
                        Aperçu actuel
                      </p>
                      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={mediaPreview}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-diez-dark text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors"
                  >
                    {editingId ? "Mettre à jour (Local)" : "Publier (Local)"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
