import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Sistema de Agendamento - Elétrica',
  description: 'Agendamento rápido de serviços elétricos',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#061221',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
