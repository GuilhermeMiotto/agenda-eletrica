'use client';

interface BadgeProps {
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function UrgencyBadge({ urgency }: BadgeProps) {
  const config = {
    LOW: {
      label: 'Baixa',
      color: 'bg-urgency-low',
    },
    MEDIUM: {
      label: 'Média',
      color: 'bg-urgency-medium',
    },
    HIGH: {
      label: 'Alta',
      color: 'bg-urgency-high',
    },
  };

  const { label, color } = config[urgency];

  return (
    <span className={`${color} text-navy text-xs font-bold px-2 py-1 rounded`}>
      {label}
    </span>
  );
}
