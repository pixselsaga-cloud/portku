import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const files = await prisma.projectFile.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        project: {
          select: { title: true, slug: true },
        },
      },
    });
    return NextResponse.json({ success: true, files });
  } catch (error: any) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const file = await prisma.projectFile.create({
      data: {
        filename: body.filename,
        description: body.description || null,
        category: body.category || 'General Asset',
        fileUrl: body.fileUrl || '',
        fileSize: body.fileSize || 0,
        format: body.format || 'PNG',
        version: body.version || 'v1.0',
        downloadPermission: body.downloadPermission || 'allowed',
        projectId: body.projectId || null,
      },
    });

    return NextResponse.json({ success: true, file });
  } catch (error: any) {
    console.error('Files POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
