import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuários técnicos
  const techPassword = await bcrypt.hash('senha123', 10);
  
  const technician = await prisma.user.upsert({
    where: { email: 'tecnico@eletrica.com' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'tecnico@eletrica.com',
      passwordHash: techPassword,
      role: 'TECHNICIAN',
      phone: '+5511987654321',
    },
  });

  console.log('✅ Técnico criado:', technician.email);

  // Criar agendamentos de exemplo
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const bookings = [
    {
      clientName: 'Maria Santos',
      phone: '+5511999887766',
      address: 'Rua das Flores, 123 - Centro',
      lat: -23.5505,
      lng: -46.6333,
      date: today,
      time: '14:00',
      timeSlot: '14:00-15:00',
      urgency: 'HIGH',
      problemType: 'Curto circuito',
      notes: 'Tem fumaça saindo da tomada, situação urgente!',
      status: 'SCHEDULED',
    },
    {
      clientName: 'Carlos Oliveira',
      phone: '+5511988776655',
      address: 'Av. Paulista, 1000 - Bela Vista',
      lat: -23.5614,
      lng: -46.6561,
      date: today,
      time: '16:00',
      timeSlot: '16:00-17:00',
      urgency: 'MEDIUM',
      problemType: 'Instalação de chuveiro',
      notes: 'Novo chuveiro precisa ser instalado',
      status: 'ACCEPTED',
      technicianId: technician.id,
    },
    {
      clientName: 'Ana Paula',
      phone: '+5511977665544',
      address: 'Rua Augusta, 500 - Consolação',
      lat: -23.5558,
      lng: -46.6608,
      date: tomorrow,
      time: '09:00',
      timeSlot: '09:00-10:00',
      urgency: 'LOW',
      problemType: 'Troca de lâmpadas',
      notes: 'Trocar todas as lâmpadas da casa',
      status: 'SCHEDULED',
    },
    {
      clientName: 'Pedro Costa',
      phone: '+5511966554433',
      address: 'Rua Haddock Lobo, 200 - Cerqueira César',
      lat: -23.5629,
      lng: -46.6644,
      date: tomorrow,
      time: '11:00',
      timeSlot: '11:00-12:00',
      urgency: 'HIGH',
      problemType: 'Disjuntor queimado',
      notes: 'Casa sem energia, disjuntor não liga',
      status: 'SCHEDULED',
    },
    {
      clientName: 'Lucia Ferreira',
      phone: '+5511955443322',
      address: 'Rua Oscar Freire, 800 - Jardins',
      lat: -23.5641,
      lng: -46.6707,
      date: tomorrow,
      time: '14:30',
      timeSlot: '14:00-15:00',
      urgency: 'MEDIUM',
      problemType: 'Instalação de ventilador de teto',
      notes: 'Instalação de 3 ventiladores',
      status: 'IN_PROGRESS',
      technicianId: technician.id,
    },
    {
      clientName: 'Roberto Alves',
      phone: '+5511944332211',
      address: 'Rua da Consolação, 1500 - Consolação',
      lat: -23.5505,
      lng: -46.6603,
      date: dayAfter,
      time: '10:00',
      timeSlot: '10:00-11:00',
      urgency: 'LOW',
      problemType: 'Manutenção preventiva',
      notes: 'Revisão geral da parte elétrica',
      status: 'SCHEDULED',
    },
    {
      clientName: 'Fernanda Lima',
      phone: '+5511933221100',
      address: 'Av. Brigadeiro Faria Lima, 2000 - Pinheiros',
      lat: -23.5789,
      lng: -46.6889,
      date: dayAfter,
      time: '15:00',
      timeSlot: '15:00-16:00',
      urgency: 'MEDIUM',
      problemType: 'Tomadas não funcionam',
      notes: 'Tomadas da cozinha sem energia',
      status: 'SCHEDULED',
    },
    {
      clientName: 'Marcos Silva',
      phone: '+5511922110099',
      address: 'Rua Estados Unidos, 300 - Jardim América',
      lat: -23.5674,
      lng: -46.6771,
      date: today,
      time: '10:00',
      timeSlot: '10:00-11:00',
      urgency: 'LOW',
      problemType: 'Instalação de tomadas',
      notes: 'Instalar 5 tomadas no escritório',
      status: 'COMPLETED',
      technicianId: technician.id,
    },
  ];

  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking,
    });
  }

  console.log(`✅ ${bookings.length} agendamentos criados`);
  console.log('');
  console.log('📋 Credenciais de acesso:');
  console.log('   Email: tecnico@eletrica.com');
  console.log('   Senha: senha123');
  console.log('');
  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
