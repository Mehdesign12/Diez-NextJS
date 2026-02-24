'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-[#FF4D29]/30">
            <img src="/images/logo_clean.png" alt="Diez Agency" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Panel Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Diez Agency — Accès restreint</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@diez-agency.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D29] focus:ring-1 focus:ring-[#FF4D29] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF4D29] focus:ring-1 focus:ring-[#FF4D29] transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FF4D29] text-white font-bold rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#FF4D29]/20"
            >
              {loading ? (
                <><i className="fas fa-spinner animate-spin"></i> Connexion…</>
              ) : (
                <><i className="fas fa-sign-in-alt"></i> Se connecter</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Accès réservé à l&apos;équipe Diez Agency
        </p>
      </div>
    </div>
  );
}
