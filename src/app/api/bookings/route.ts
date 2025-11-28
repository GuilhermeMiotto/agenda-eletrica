import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');

    const where: any = {};

    if (date) {
      const targetDate = new Date(date);
      const nextDate = new Date(targetDate);
      nextDate.setDate(nextDate.getDate() + 1);
      
      where.date = {
        gte: targetDate,
        lt: nextDate,
      };
    }

    if (status) {
      where.status = status;
    }

    if (urgency) {
      where.urgency = urgency;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        technician: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: [
        { urgency: 'desc' },
        { date: 'asc' },
        { time: 'asc' },
      ],
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar agendamentos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validações básicas
    if (!data.clientName || !data.phone || !data.address || !data.date || !data.timeSlot) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Verificar se já existe agendamento no mesmo horário
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: new Date(data.date),
        timeSlot: data.timeSlot,
        status: {
          notIn: ['CANCELLED', 'COMPLETED'],
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Já existe um agendamento neste horário' },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        clientName: data.clientName,
        phone: data.phone,
        address: data.address,
        lat: data.lat || null,
        lng: data.lng || null,
        date: new Date(data.date),
        time: data.time || data.timeSlot.split('-')[0],
        timeSlot: data.timeSlot,
        urgency: data.urgency || 'MEDIUM',
        problemType: data.problemType,
        notes: data.notes || null,
        source: data.source || 'web',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar agendamento' },
      { status: 500 }
    );
  }
}
