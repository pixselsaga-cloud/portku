export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    // If a specific access code is provided (Client Login)
    if (code) {
      const clientProject = await prisma.clientProject.findUnique({
        where: { accessCode: code.trim().toUpperCase() },
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
    }

    // Otherwise return ALL client projects (Admin Panel)
    const allProjects = await prisma.clientProject.findMany({
      include: {
        feedbacks: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, projects: allProjects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, comment, action, title, clientName, clientEmail, accessCode, deliverables, description, status } = body;

    // Admin creates a new client project
    if (action === 'create') {
      if (!title || !clientName || !accessCode) {
        return NextResponse.json({ success: false, error: 'Title, client name, and access code are required' }, { status: 400 });
      }

      const formattedCode = accessCode.trim().toUpperCase();

      // Check for code uniqueness
      const existing = await prisma.clientProject.findUnique({
        where: { accessCode: formattedCode },
      });

      if (existing) {
        return NextResponse.json({ success: false, error: 'This access code is already taken. Choose another code.' }, { status: 400 });
      }

      const created = await prisma.clientProject.create({
        data: {
          title,
          clientName,
          clientEmail: clientEmail || '',
          accessCode: formattedCode,
          description: description || '',
          deliverables: deliverables ? (typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables)) : '[]',
          status: status || 'in_progress',
        },
      });

      return NextResponse.json({ success: true, project: created });
    }

    // Client or Admin looks up by code
    const clientProject = await prisma.clientProject.findUnique({
      where: { accessCode: code ? code.trim().toUpperCase() : '' },
    });

    if (!clientProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    // Approve Project
    if (action === 'approve') {
      const updated = await prisma.clientProject.update({
        where: { id: clientProject.id },
        data: { status: 'completed' },
      });
      return NextResponse.json({ success: true, project: updated });
    }

    // Add Feedback comment
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, clientName, clientEmail, accessCode, deliverables, description, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID required' }, { status: 400 });
    }

    const updated = await prisma.clientProject.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(clientName && { clientName }),
        ...(clientEmail !== undefined && { clientEmail }),
        ...(accessCode && { accessCode: accessCode.trim().toUpperCase() }),
        ...(description !== undefined && { description }),
        ...(deliverables !== undefined && {
          deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables),
        }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID required' }, { status: 400 });
    }

    await prisma.clientProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
