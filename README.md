# 🔌 Sistema de Agendamento - ElétricaRápida

Sistema web mobile-first para agendamento de serviços elétricos. Permite que clientes agendem visitas de forma rápida e eletricistas gerenciem sua agenda de atendimentos.

## 🚀 Tecnologias

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: TailwindCSS
- **Database**: SQLite (Prisma ORM)
- **Auth**: JWT
- **State Management**: React Query

## 📋 Funcionalidades

### Cliente
- ✅ Agendamento rápido de serviços
- ✅ Seleção de data, horário e urgência
- ✅ Visualização de status do agendamento
- ✅ Link direto para WhatsApp e Google Maps
- ✅ Interface mobile-first responsiva

### Técnico/Eletricista
- ✅ Dashboard com visão geral dos agendamentos
- ✅ Aceitar/recusar agendamentos
- ✅ Atualizar status (Em progresso, Concluído)
- ✅ Filtros por status e urgência
- ✅ Estatísticas em tempo real

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ e npm/yarn/pnpm

### Passo 1: Instalar dependências
```bash
npm install
```

### Passo 2: Configurar banco de dados
```bash
# Gerar o Prisma Client
npx prisma generate

# Criar o banco de dados e rodar migrations
npm run migrate

# Popular com dados de exemplo
npm run seed
```

### Passo 3: Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🔐 Credenciais de Acesso (Demo)

**Técnico:**
- Email: `tecnico@eletrica.com`
- Senha: `senha123`

## 📂 Estrutura do Projeto

```
sistema-agenda/
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   └── seed.ts                # Dados de exemplo
├── src/
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Autenticação
│   │   │   └── bookings/      # Agendamentos
│   │   ├── agendar/           # Página de agendamento
│   │   ├── agendamento/       # Visualização de agendamento
│   │   ├── painel/            # Painel do técnico
│   │   ├── layout.tsx
│   │   └── page.tsx           # Homepage
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   ├── UrgencyBadge.tsx
│   │   └── StatusBadge.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx    # Contexto de autenticação
│   └── lib/
│       ├── prisma.ts          # Cliente Prisma
│       ├── jwt.ts             # Utilitários JWT
│       └── auth.ts            # Helpers de auth
├── package.json
└── README.md
```

## 🎨 Design System

### Paleta de Cores
- **Navy**: `#061221` (fundo principal)
- **Navy Card**: `#0b1220` (cards)
- **Accent Primary**: `#00C2A8` (teal - ações principais)
- **Accent Secondary**: `#FFB86B` (laranja - alertas)
- **Text Primary**: `#E6EEF6`
- **Text Secondary**: `#9AA4B2`

### Urgência
- **Baixa**: Verde (`#52C41A`)
- **Média**: Amarelo (`#FAAD14`)
- **Alta**: Vermelho (`#FF4D4F`)

## 🔌 API Endpoints

### Bookings
- `GET /api/bookings` - Listar agendamentos
- `POST /api/bookings` - Criar agendamento
- `GET /api/bookings/:id` - Detalhes de um agendamento
- `PUT /api/bookings/:id` - Atualizar agendamento
- `DELETE /api/bookings/:id` - Cancelar agendamento

### Auth
- `POST /api/auth/login` - Login do técnico

## 📱 PWA (Progressive Web App)

O app é configurado como PWA e pode ser instalado no dispositivo móvel para experiência similar a um app nativo.

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run migrate      # Rodar migrations
npm run seed         # Popular banco com dados demo
npm run studio       # Abrir Prisma Studio
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
- Certifique-se de configurar as variáveis de ambiente
- Rodar `npm run build` antes do deploy
- Configurar o banco de dados (PostgreSQL recomendado para produção)

## 📄 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-muito-segura"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

MIT License - veja LICENSE para detalhes

## 💡 Próximas Features

- [ ] Notificações por SMS/WhatsApp
- [ ] Upload de fotos (antes/depois)
- [ ] Pagamentos integrados (PIX)
- [ ] Calendário visual interativo
- [ ] Chat em tempo real
- [ ] Geolocalização e otimização de rotas
- [ ] Sistema de avaliações

---

Desenvolvido com ⚡ por [Seu Nome]
