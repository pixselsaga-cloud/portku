import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id: project.id },
      data: { saves: { increment: 1 } },
    });

    await prisma.analyticsEvent.create({
      data: {
        eventType: 'save',
        projectId: project.id,
        path: `/works/${slug}`,
        country: 'Uzbekistan',
        device: 'Desktop',
      },
    });

    return NextResponse.json({ success: true, saves: updated.saves });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
