import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ success: false, error: 'Access code required' }, { status: 400 });
    }

    const clientProject = await prisma.clientProject.findUnique({
      where: { accessCode: code },
      include: {
        feedbacks: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!clientProject) {
      return NextResponse.json({ success: false, error: 'Invalid access code' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: clientProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, comment, action } = body;

    const clientProject = await prisma.clientProject.findUnique({
      where: { accessCode: code },
    });

    if (!clientProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    if (action === 'approve') {
      const updated = await prisma.clientProject.update({
        where: { id: clientProject.id },
        data: { status: 'completed' },
      });
      return NextResponse.json({ success: true, project: updated });
    }

    if (comment) {
      const feedback = await prisma.clientFeedback.create({
        data: {
          clientProjectId: clientProject.id,
          sender: body.sender || 'client',
          comment,
        },
      });
      return NextResponse.json({ success: true, feedback });
    }

    return NextResponse.json({ success: false, error: 'No action performed' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
