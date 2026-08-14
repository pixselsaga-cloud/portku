import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        files: true,
      },
    });

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404, headers: noCacheHeaders });
    }

    // Increment view count and record view event for Section 31 analytics
    await prisma.project.update({
      where: { id: project.id },
      data: {
        views: { increment: 1 },
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        eventType: 'project_view',
        projectId: project.id,
        path: `/works/${slug}`,
        country: 'Uzbekistan',
        device: 'Desktop',
        browser: 'Chrome',
      },
    });

    return NextResponse.json({ success: true, project }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error('Project Detail GET API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    const updated = await prisma.project.update({
      where: { slug },
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        client: body.client,
        year: body.year,
        featured: body.featured,
        status: body.status,
        coverImage: body.coverImage,
        downloadRule: body.downloadRule,
        gallery: typeof body.gallery === 'string' ? body.gallery : JSON.stringify(body.gallery || []),
        tools: typeof body.tools === 'string' ? body.tools : JSON.stringify(body.tools || []),
        services: typeof body.services === 'string' ? body.services : JSON.stringify(body.services || []),
      },
    });

    return NextResponse.json({ success: true, project: updated }, { headers: noCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    await prisma.project.delete({
      where: { slug },
    });
    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}
