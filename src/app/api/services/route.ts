import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error('Services GET error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await prisma.serviceItem.create({
      data: {
        titleUz: body.titleUz,
        titleRu: body.titleRu || body.titleUz,
        titleEn: body.titleEn || body.titleUz,
        descUz: body.descUz,
        descRu: body.descRu || body.descUz,
        descEn: body.descEn || body.descUz,
        icon: body.icon || 'Palette',
        buttonText: body.buttonText || 'Request Service',
        buttonUrl: body.buttonUrl || '/request',
        order: body.order || 0,
      },
    });
    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Services POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const service = await prisma.serviceItem.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Services PUT error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    await prisma.serviceItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Services DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
