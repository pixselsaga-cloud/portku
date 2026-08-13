import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await prisma.statItem.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    console.error('Stats GET error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stat = await prisma.statItem.create({
      data: {
        value: body.value,
        labelUz: body.labelUz,
        labelRu: body.labelRu || body.labelUz,
        labelEn: body.labelEn || body.labelUz,
        icon: body.icon || 'Award',
        order: body.order || 0,
      },
    });
    return NextResponse.json({ success: true, stat });
  } catch (error: any) {
    console.error('Stats POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const stat = await prisma.statItem.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, stat });
  } catch (error: any) {
    console.error('Stats PUT error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    await prisma.statItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Stats DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
