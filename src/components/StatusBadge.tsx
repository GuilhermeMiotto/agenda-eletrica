'use client';

interface StatusBadgeProps {
  status: 'SCHEDULED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    SCHEDULED: {
      label: 'Agendado',
      color: 'bg-blue-600',
    },
    ACCEPTED: {
      label: 'Aceito',
      color: 'bg-accent-primary',
    },
    IN_PROGRESS: {
      label: 'Em Progresso',
      color: 'bg-accent-secondary',
    },
    COMPLETED: {
      label: 'Concluído',
      color: 'bg-green-600',
    },
    CANCELLED: {
      label: 'Cancelado',
      color: 'bg-gray-600',
    },
  };

  const { label, color } = config[status];

  return (
    <span className={`${color} text-white text-xs font-bold px-2 py-1 rounded`}>
      {label}
    </span>
  );
}
