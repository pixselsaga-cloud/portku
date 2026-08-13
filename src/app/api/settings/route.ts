import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let settings = await prisma.siteSetting.findFirst();
    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          id: '1',
          ownerName: 'Otajon Jahongirov',
          headline: 'Graphic Designer & Creative Digital Artist',
          bio: 'Over 3+ years crafting visual identities, 3D artwork, hyper-realistic posters, and award-winning digital experiences.',
          phone: '+998 90 123 45 67',
          email: 'otajon@creative-studio.com',
          telegram: 'https://t.me/otajon_jahongirov',
          instagram: 'https://instagram.com/otajon_creative',
          behance: 'https://behance.net/otajon',
          dribbble: 'https://dribbble.com/otajon',
          linkedin: 'https://linkedin.com/in/otajon',
          cvUrl: '/assets/Otajon_Jahongirov_CV.pdf',
          watermarkText: 'PORTFOLIO PREVIEW — OTAJON JAHONGIROV',
        },
      });
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await prisma.siteSetting.upsert({
      where: { id: '1' },
      update: body,
      create: { id: '1', ...body },
    });
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
