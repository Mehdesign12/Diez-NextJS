"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PROJECTS, normalizeProjects } from "../lib/projects";

const STORAGE_KEY = "diez_projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let allProjects = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      allProjects = stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
    } catch {
      allProjects = DEFAULT_PROJECTS;
    }
    const normalized = normalizeProjects(allProjects).filter(
      (project) => project.showOnProjects !== false
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProjects(normalized);
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className="antialiased bg-diez-base text-diez-dark min-h-screen">
      <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/images/logo_clean.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-xl tracking-tight">Diez Agency</span>
            </Link>
            <Link
              href="/"
              className="text-sm font-bold text-gray-600 hover:text-diez-orange transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> Retour
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal active">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nos Réalisations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez l&apos;ensemble de nos projets, de la refonte UI/UX au
            développement d&apos;applications complexes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "Fintech", "SaaS", "Mobile"].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-bold shadow-lg transition-all ${
                activeFilter === filter
                  ? "bg-diez-dark text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-diez-orange hover:text-diez-orange"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "Tous" : filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Aucun projet trouvé.
            </div>
          ) : (
            visibleProjects.map((project, index) => {
              const mediaContent = project.mediaUrl?.startsWith("data:") ? (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div
                  className={`w-full h-full ${
                    project.colorClass || "bg-gray-200"
                  } flex items-center justify-center`}
                >
                  <i
                    className={`${project.icon || "fas fa-image"} text-4xl opacity-20`}
                  ></i>
                </div>
              );

              return (
                <div
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[4/3] reveal active"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0">{mediaContent}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-bold text-diez-orange uppercase tracking-wider mb-2 block">
                      {project.category || "Projet"}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm opacity-80">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <footer className="bg-diez-dark text-white py-12 text-center">
        <p className="text-gray-500">© 2025 Diez Agency.</p>
      </footer>
    </div>
  );
}
