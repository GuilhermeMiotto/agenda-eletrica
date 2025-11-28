'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';

const TIME_SLOTS = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
];

const PROBLEM_TYPES = [
  'Curto circuito',
  'Disjuntor queimado',
  'Tomadas não funcionam',
  'Instalação de chuveiro',
  'Instalação de ventilador',
  'Troca de lâmpadas',
  'Manutenção preventiva',
  'Outro',
];

export default function AgendarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    address: '',
    date: '',
    timeSlot: '',
    urgency: 'MEDIUM',
    problemType: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar agendamento');
      }

      setToast({ message: 'Agendamento criado com sucesso!', type: 'success' });
      
      setTimeout(() => {
        router.push(`/agendamento/${data.id}`);
      }, 1500);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : 'Erro ao criar agendamento',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="bg-navy-card p-4 border-b border-gray-700">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="text-accent-primary hover:text-accent-primary/80"
          >
            ← Voltar
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-2xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agendar Serviço</h1>
          <p className="text-text-secondary">Preencha os dados abaixo para solicitar um atendimento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do Cliente */}
          <div className="bg-navy-card p-6 rounded-card space-y-4">
            <h2 className="text-xl font-bold mb-4">Seus Dados</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="João Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="+55 11 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Endereço Completo *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="Rua, número, bairro, cidade"
              />
            </div>
          </div>

          {/* Agendamento */}
          <div className="bg-navy-card p-6 rounded-card space-y-4">
            <h2 className="text-xl font-bold mb-4">Agendamento</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Data *
              </label>
              <input
                type="date"
                name="date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Horário *
              </label>
              <select
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
              >
                <option value="">Selecione um horário</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Problema */}
          <div className="bg-navy-card p-6 rounded-card space-y-4">
            <h2 className="text-xl font-bold mb-4">Detalhes do Serviço</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Problema *
              </label>
              <select
                name="problemType"
                required
                value={formData.problemType}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
              >
                <option value="">Selecione o tipo</option>
                {PROBLEM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Urgência *
              </label>
              <select
                name="urgency"
                required
                value={formData.urgency}
                onChange={handleChange}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
              >
                <option value="LOW">Baixa - Pode esperar alguns dias</option>
                <option value="MEDIUM">Média - Preferível em 1-2 dias</option>
                <option value="HIGH">Alta - Urgente, preciso hoje/amanhã</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Observações
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-navy border border-gray-700 rounded-lg focus:border-accent-primary focus:outline-none"
                placeholder="Descreva o problema ou forneça mais detalhes..."
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-accent-primary text-navy font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando agendamento...' : 'Confirmar Agendamento'}
          </button>
        </form>
      </main>

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
