import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json().catch(() => ({}));
    const fileId = body.fileId;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: { files: true },
    });

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    if (project.downloadRule === 'disabled') {
      return NextResponse.json(
        { success: false, error: 'Download is currently disabled by admin for this project' },
        { status: 403 }
      );
    }

    if (fileId) {
      await prisma.projectFile.update({
        where: { id: fileId },
        data: { downloadCount: { increment: 1 } },
      });
    }

    await prisma.analyticsEvent.create({
      data: {
        eventType: 'download',
        projectId: project.id,
        path: `/works/${slug}`,
        country: 'Uzbekistan',
        device: 'Desktop',
      },
    });

    return NextResponse.json({ success: true, downloadRule: project.downloadRule });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
