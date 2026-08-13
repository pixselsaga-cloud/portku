import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const requests = await prisma.designRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, requests });
  } catch (error: any) {
    console.error('Error fetching design requests:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const designRequest = await prisma.designRequest.create({
      data: {
        clientName: body.clientName,
        email: body.email,
        phone: body.phone,
        services: typeof body.services === 'string' ? body.services : JSON.stringify(body.services || []),
        projectDetails: body.projectDetails,
        targetAudience: body.targetAudience || null,
        stylePreference: body.stylePreference || null,
        deadline: body.deadline || null,
        budget: body.budget || null,
        attachments: body.attachments ? (typeof body.attachments === 'string' ? body.attachments : JSON.stringify(body.attachments)) : null,
        aiBrief: body.aiBrief ? (typeof body.aiBrief === 'string' ? body.aiBrief : JSON.stringify(body.aiBrief)) : null,
        status: 'pending',
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        eventType: 'request_complete',
        country: 'Uzbekistan',
        device: 'Desktop',
      },
    });

    return NextResponse.json({ success: true, request: designRequest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
