'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Toast } from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      router.push('/painel/dashboard');
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Erro ao fazer login',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">⚡ ElétricaRápida</h1>
          <p className="text-text-secondary">Área do Técnico</p>
        </div>

        <div className="bg-navy-card p-8 rounded-card">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="tecnico@eletrica.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-accent-primary text-navy font-bold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-navy rounded-lg border border-gray-700">
            <p className="text-sm text-text-secondary mb-2">Credenciais de teste:</p>
            <p className="text-sm font-mono">tecnico@eletrica.com</p>
            <p className="text-sm font-mono">senha123</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-accent-primary hover:underline"
          >
            ← Voltar para o site
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
