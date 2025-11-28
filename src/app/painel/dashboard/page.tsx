'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/Loading';
import { UrgencyBadge } from '@/components/UrgencyBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { Modal } from '@/components/Modal';
import { Toast } from '@/components/Toast';

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
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/painel');
    } else if (user) {
      fetchBookings();
    }
  }, [user, authLoading]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setToast({ message: 'Status atualizado com sucesso!', type: 'success' });
        fetchBookings();
        setSelectedBooking(null);
      }
    } catch (error) {
      setToast({ message: 'Erro ao atualizar status', type: 'error' });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!user) return null;

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['SCHEDULED', 'ACCEPTED', 'IN_PROGRESS'].includes(booking.status);
    return booking.status === filter.toUpperCase();
  });

  const stats = {
    total: bookings.length,
    scheduled: bookings.filter((b) => b.status === 'SCHEDULED').length,
    inProgress: bookings.filter((b) => ['ACCEPTED', 'IN_PROGRESS'].includes(b.status)).length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="bg-navy-card border-b border-gray-700">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">⚡ Painel do Técnico</h1>
            <p className="text-sm text-text-secondary">{user.name}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-navy-card p-4 rounded-card">
            <p className="text-sm text-text-secondary mb-1">Total</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-navy-card p-4 rounded-card">
            <p className="text-sm text-text-secondary mb-1">Agendados</p>
            <p className="text-3xl font-bold text-blue-500">{stats.scheduled}</p>
          </div>
          <div className="bg-navy-card p-4 rounded-card">
            <p className="text-sm text-text-secondary mb-1">Em Andamento</p>
            <p className="text-3xl font-bold text-accent-secondary">{stats.inProgress}</p>
          </div>
          <div className="bg-navy-card p-4 rounded-card">
            <p className="text-sm text-text-secondary mb-1">Concluídos</p>
            <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'all' ? 'bg-accent-primary text-navy' : 'bg-navy-card'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'active' ? 'bg-accent-primary text-navy' : 'bg-navy-card'
            }`}
          >
            Ativos
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'scheduled' ? 'bg-accent-primary text-navy' : 'bg-navy-card'
            }`}
          >
            Agendados
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              filter === 'completed' ? 'bg-accent-primary text-navy' : 'bg-navy-card'
            }`}
          >
            Concluídos
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-navy-card p-8 rounded-card text-center">
              <p className="text-text-secondary">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const date = new Date(booking.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
              });

              return (
                <div
                  key={booking.id}
                  className="bg-navy-card p-4 rounded-card hover:bg-opacity-80 cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{booking.clientName}</h3>
                        <UrgencyBadge urgency={booking.urgency} />
                      </div>
                      <p className="text-sm text-text-secondary">{booking.problemType}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>📅 {date}</span>
                    <span>🕐 {booking.timeSlot}</span>
                    <span>📍 {booking.address.slice(0, 30)}...</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title="Detalhes do Agendamento"
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">Cliente</p>
              <p className="font-bold text-lg">{selectedBooking.clientName}</p>
              <a href={`tel:${selectedBooking.phone}`} className="text-accent-primary hover:underline">
                {selectedBooking.phone}
              </a>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Data e Horário</p>
              <p className="font-medium">
                {new Date(selectedBooking.date).toLocaleDateString('pt-BR')} - {selectedBooking.timeSlot}
              </p>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Endereço</p>
              <p className="font-medium mb-2">{selectedBooking.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedBooking.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary hover:underline text-sm"
              >
                Abrir no Google Maps →
              </a>
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-1">Problema</p>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-medium">{selectedBooking.problemType}</p>
                <UrgencyBadge urgency={selectedBooking.urgency} />
              </div>
              {selectedBooking.notes && (
                <p className="text-sm text-text-secondary bg-navy p-3 rounded-lg">
                  {selectedBooking.notes}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-text-secondary mb-2">Status Atual</p>
              <StatusBadge status={selectedBooking.status} />
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-gray-700">
              {selectedBooking.status === 'SCHEDULED' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'ACCEPTED')}
                  className="w-full p-3 bg-accent-primary text-navy font-bold rounded-lg hover:bg-opacity-90"
                >
                  Aceitar Agendamento
                </button>
              )}
              {selectedBooking.status === 'ACCEPTED' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'IN_PROGRESS')}
                  className="w-full p-3 bg-accent-secondary text-navy font-bold rounded-lg hover:bg-opacity-90"
                >
                  Iniciar Atendimento
                </button>
              )}
              {selectedBooking.status === 'IN_PROGRESS' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'COMPLETED')}
                  className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                >
                  Marcar como Concluído
                </button>
              )}
              {['SCHEDULED', 'ACCEPTED'].includes(selectedBooking.status) && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'CANCELLED')}
                  className="w-full p-3 bg-error text-white font-bold rounded-lg hover:bg-opacity-90"
                >
                  Cancelar Agendamento
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
