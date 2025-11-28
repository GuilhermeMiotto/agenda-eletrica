import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-navy-card">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-accent-primary">⚡ ElétricaRápida</h1>
          <Link 
            href="/painel"
            className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            Área do Técnico
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold">
              Serviço Elétrico
              <span className="block text-accent-primary">Quando Você Precisa</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary">
              Agende um eletricista profissional em menos de 2 minutos.
              Atendimento rápido e confiável.
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link
              href="/agendar"
              className="inline-block w-full md:w-auto px-8 py-4 bg-accent-primary text-navy font-bold text-lg rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Agendar Agora →
            </Link>
            <p className="text-sm text-text-secondary">
              Resposta em até 30 minutos
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-navy-card p-6 rounded-card">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-2">Atendimento Rápido</h3>
              <p className="text-sm text-text-secondary">
                Resposta imediata e agendamento flexível
              </p>
            </div>
            <div className="bg-navy-card p-6 rounded-card">
              <div className="text-3xl mb-2">🛠️</div>
              <h3 className="font-bold mb-2">Profissionais</h3>
              <p className="text-sm text-text-secondary">
                Técnicos certificados e experientes
              </p>
            </div>
            <div className="bg-navy-card p-6 rounded-card">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-bold mb-2">Fácil de Usar</h3>
              <p className="text-sm text-text-secondary">
                Interface simples e intuitiva
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-navy-card text-center text-sm text-text-secondary">
        <p>© 2025 ElétricaRápida - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
