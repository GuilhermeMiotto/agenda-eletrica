'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/Loading';
import { UrgencyBadge } from '@/components/UrgencyBadge';
import { StatusBadge } from '@/components/StatusBadge';

interface Booking {
  id: string;
  clientName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  timeSlot: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  problemType: string;
  notes: string;
  status: 'SCHEDULED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export default function AgendamentoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [params.id]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setBooking(data);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agendamento não encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="text-accent-primary hover:underline"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(booking.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address)}`;

  return (
    <div className="min-h-screen bg-navy">
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

      <main className="max-w-2xl mx-auto p-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Agendamento</h1>
          <p className="text-sm text-text-secondary">ID: {booking.id}</p>
        </div>

        {/* Status Card */}
        <div className="bg-navy-card p-6 rounded-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Status</h2>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-text-secondary">
            {booking.status === 'SCHEDULED' && 'Aguardando confirmação do técnico'}
            {booking.status === 'ACCEPTED' && 'Técnico confirmou! Aguarde o atendimento.'}
            {booking.status === 'IN_PROGRESS' && 'Técnico está a caminho ou trabalhando'}
            {booking.status === 'COMPLETED' && 'Serviço concluído com sucesso'}
            {booking.status === 'CANCELLED' && 'Agendamento cancelado'}
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="bg-navy-card p-6 rounded-card">
            <h3 className="font-bold mb-3">📅 Data e Horário</h3>
            <p className="text-lg">{formattedDate}</p>
            <p className="text-text-secondary">{booking.timeSlot}</p>
          </div>

          <div className="bg-navy-card p-6 rounded-card">
            <h3 className="font-bold mb-3">👤 Cliente</h3>
            <p className="text-lg">{booking.clientName}</p>
            <a
              href={`tel:${booking.phone}`}
              className="text-accent-primary hover:underline"
            >
              {booking.phone}
            </a>
          </div>

          <div className="bg-navy-card p-6 rounded-card">
            <h3 className="font-bold mb-3">📍 Endereço</h3>
            <p className="mb-3">{booking.address}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-accent-primary text-navy font-medium rounded-lg hover:bg-opacity-90"
            >
              Abrir no Google Maps →
            </a>
          </div>

          <div className="bg-navy-card p-6 rounded-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">⚡ Problema</h3>
              <UrgencyBadge urgency={booking.urgency} />
            </div>
            <p className="text-lg mb-2">{booking.problemType}</p>
            {booking.notes && (
              <div className="mt-4 p-4 bg-navy rounded-lg">
                <p className="text-sm font-medium mb-1">Observações:</p>
                <p className="text-text-secondary">{booking.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Button */}
        <div className="mt-8">
          <a
            href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 bg-green-600 text-white text-center font-bold rounded-lg hover:bg-green-700"
          >
            💬 Falar via WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}
