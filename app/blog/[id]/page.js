"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Lenis from "lenis";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qegewzvyjiijozioqsgq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ2V3enZ5amlpam96aW9xc2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODExNTMsImV4cCI6MjA3OTc1NzE1M30.2Q84Q6aTfU--ShAa4VzRgEmzzkhdTFb6TZD73mqaar0";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default function ArticlePage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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

    const loadPost = async () => {
      if (!id) return;
      try {
        const { data, error: fetchError } = await supabaseClient
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;
        setPost(data);
        document.title = `${data.title} | Diez Agency`;
      } catch (err) {
        setError("Article introuvable ou erreur de connexion.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, [id]);

  return (
    <div className="antialiased bg-diez-base text-diez-dark min-h-screen">
      <div className="fixed w-full z-50 top-6 transition-all duration-300">
        <nav className="relative z-50 mx-4 md:mx-auto max-w-5xl px-4 py-3 bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-full flex justify-between items-center">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-600 hover:text-diez-orange transition-colors font-medium"
          >
            <i className="fas fa-arrow-left"></i> Retour au blog
          </Link>
          <Link href="/" className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/images/logo_clean.png"
              alt="Diez Logo"
              className="w-full h-full object-cover"
            />
          </Link>
        </nav>
      </div>

      <article className="min-h-screen pt-32 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-diez-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 pt-20">{error}</div>
        ) : post ? (
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-diez-orange text-xs font-bold uppercase tracking-wide mb-6">
                {post.category || "Article"}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-diez-dark mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="text-gray-500">
                Publié le{" "}
                {new Date(post.published_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl mb-16 aspect-[16/9]">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="prose max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ) : null}
      </article>

      <footer className="bg-diez-dark text-white py-12 text-center">
        <p className="text-gray-500 text-sm">© 2025 Diez Agency.</p>
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
