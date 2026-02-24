"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qegewzvyjiijozioqsgq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2V3enZ5amlpam96aW9xc2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODExNTMsImV4cCI6MjA3OTc1NzE1M30.2Q84Q6aTfU--ShAa4VzRgEmzzkhdTFb6TZD73mqaar0";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    lenisRef.current = lenis;
    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    const loadPosts = async () => {
      try {
        const { data, error: fetchError } = await supabaseClient
          .from("posts")
          .select("*")
          .order("published_at", { ascending: false });

        if (fetchError) throw fetchError;
        setPosts(data || []);
      } catch (err) {
        setError("Erreur de connexion à Supabase.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="antialiased bg-diez-base text-diez-dark min-h-screen">
      <div className="fixed w-full z-50 top-6 transition-all duration-300">
        <nav className="relative z-50 mx-4 md:mx-auto max-w-5xl px-4 py-3 bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/images/logo_clean.png"
                alt="Diez Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg hidden sm:block">Diez Agency</span>
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2 bg-diez-orange text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
          >
            Retour au site
          </Link>
        </nav>
      </div>

      <header className="pt-40 pb-20 px-4 text-center">
        <span className="text-diez-orange font-bold tracking-wider uppercase text-sm mb-4 block">
          Le Journal
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Insights & Innovations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Découvrez nos dernières réflexions sur l&apos;IA, l&apos;automatisation et le futur
          du travail.
        </p>
      </header>

      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-diez-orange border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400">Chargement des articles...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500">
                Aucun article pour le moment.
              </div>
            ) : (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-diez-orange uppercase">
                      {post.category || "News"}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 mb-3">
                      {new Date(post.published_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-diez-dark line-clamp-2 group-hover:text-diez-orange transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {post.summary}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 font-bold text-sm text-diez-dark hover:gap-4 transition-all mt-auto"
                    >
                      Lire l&apos;article <i className="fas fa-arrow-right text-diez-orange"></i>
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="bg-diez-dark text-white py-12 text-center">
        <p className="text-gray-500 text-sm">© 2025 Diez Agency. Powered by AI.</p>
      </footer>

      <button
        onClick={() => lenisRef.current?.scrollTo(0)}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-diez-orange text-white rounded-full shadow-lg shadow-diez-orange/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-diez-orange/60 active:scale-95 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <i className="fas fa-arrow-up text-lg"></i>
      </button>
    </div>
  );
}
