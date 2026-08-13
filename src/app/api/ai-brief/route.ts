import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, history = [] } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
    }

    const lower = prompt.toLowerCase();
    
    let isComplete = false;
    let reply = "";
    let brief = null;

    if (history.length >= 2 || lower.includes('brief') || lower.includes('tayyor') || lower.includes('yarat')) {
      isComplete = true;
      brief = {
        title: `Creative Project Brief — ${prompt.substring(0, 30)}...`,
        category: lower.includes('logo') || lower.includes('brand') ? 'Branding' : lower.includes('poster') ? 'Poster' : lower.includes('ui') || lower.includes('app') ? 'UI/UX' : 'Graphic Design',
        style: 'Minimal, Dark Luxury, Futuristic & Cinematic',
        targetAudience: 'Global Premium Clients & Modern Audiences',
        deliverables: ['High-Res Visual Assets (PNG/WEBP)', 'Layered Source Files (PSD/AI/FIG)', 'Brand Guidelines Sheet'],
        estimatedDeadline: '2 - 3 Weeks',
        estimatedBudget: '$1,500 - $3,500',
        summary: `Structured studio brief based on client request: "${prompt}". Ready for administrator review & formal agreement.`
      };
      reply = "Ajoyib! Barcha ma'lumotlar asosida mukammal Project Brief tayyorlandi. Siz uni to'g'ridan-to meha yuborishingiz mumkin.";
    } else {
      reply = `Loyiha haqida ajoyib g'oya! Briefni yanada mukammal qilish uchun 3 ta qisqa savolga javob bering:\n1. Kerakli format va o'lchamlar (masalan: Instagram 1080x1350, 4K Print, Motion Video)?\n2. Qancha vaqt ichida topshirilishi kerak (Deadline)?\n3. Taxminiy ajratilgan byudjet miqdori?`;
    }

    return NextResponse.json({
      success: true,
      reply,
      isComplete,
      brief
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
