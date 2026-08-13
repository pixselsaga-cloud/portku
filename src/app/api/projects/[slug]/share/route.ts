import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json().catch(() => ({}));
    const platform = body.platform || 'Copy Link';

    const project = await prisma.project.findUnique({ where: { slug } });
    if (project) {
      await prisma.project.update({
        where: { id: project.id },
        data: { shares: { increment: 1 } },
      });

      await prisma.analyticsEvent.create({
        data: {
          eventType: 'share',
          projectId: project.id,
          path: `/works/${slug}`,
          referrer: platform,
          country: 'Uzbekistan',
          device: 'Desktop',
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
