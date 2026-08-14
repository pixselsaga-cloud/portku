import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const featuredOnly = searchParams.get('featured') === 'true';

    const where: any = {
      status: 'published',
    };

    if (category && category !== 'All' && category !== 'Barchasi' && category !== 'Все') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (featuredOnly) {
      where.featured = true;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'popular' || sort === 'views') {
      orderBy = { views: 'desc' };
    } else if (sort === 'likes') {
      orderBy = { likes: 'desc' };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy,
      include: {
        files: true,
      },
    });

    return NextResponse.json({ success: true, projects }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error('Projects GET API error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500, headers: noCacheHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: body.title,
        category: body.category || 'Graphic Design',
        description: body.description,
        client: body.client || null,
        year: body.year || new Date().getFullYear().toString(),
        featured: body.featured || false,
        status: body.status || 'published',
        coverImage: body.coverImage || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
        gallery: JSON.stringify(body.gallery || []),
        tools: JSON.stringify(body.tools || []),
        services: JSON.stringify(body.services || []),
        beforeAfter: body.beforeAfter ? JSON.stringify(body.beforeAfter) : null,
        videoUrl: body.videoUrl || null,
        processSteps: body.processSteps ? JSON.stringify(body.processSteps) : null,
        finalResult: body.finalResult || null,
        downloadRule: body.downloadRule || 'allowed',
      },
    });

    return NextResponse.json({ success: true, project }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error('Projects POST API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: noCacheHeaders });
  }
}
