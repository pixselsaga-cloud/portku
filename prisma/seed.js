const fs = require('fs');
const path = require('path');
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (!process.env[key]) process.env[key] = value;
      }
    });
  }
} catch (e) {}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with realistic creative portfolio data...');

  // Reset database tables
  await prisma.analyticsEvent.deleteMany({});
  await prisma.clientFeedback.deleteMany({});
  await prisma.clientProject.deleteMany({});
  await prisma.designRequest.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.projectFile.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.siteSetting.deleteMany({});

  // 1. Site Settings
  await prisma.siteSetting.create({
    data: {
      id: '1',
      ownerName: 'Otajon Jahongirov',
      headline: 'Graphic Designer & Creative Digital Artist',
      bio: 'Over 3+ years crafting visual identities, 3D artwork, hyper-realistic posters, and award-winning digital experiences for international brands.',
      phone: '+998 88 919 18 09',
      email: 'pixselsaga@gmail.com',
      telegram: 'https://t.me/otajon9999?text=Assalomu%20alekum',
      instagram: 'https://instagram.com/otajon_creative',
      behance: 'https://behance.net/otajon',
      dribbble: 'https://dribbble.com/otajon',
      linkedin: 'https://linkedin.com/in/otajon',
      cvUrl: '/assets/Otajon_Jahongirov_CV.pdf',
      watermarkText: 'PORTFOLIO PREVIEW — OTAJON JAHONGIROV',
    },
  });

  // 2. Projects
  const p1 = await prisma.project.create({
    data: {
      slug: 'mercedes-amg-cyberpunk',
      title: 'Mercedes AMG — Cyberpunk Hypercar Poster',
      category: 'Poster',
      description: 'A cinematic high-octane visual campaign for Mercedes AMG. Blending 3D octane rendering, neon lighting, custom typography, and atmospheric dark aesthetics designed specifically for high-impact social media & editorial print.',
      client: 'Mercedes AMG Performance',
      year: '2026',
      featured: true,
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
      ]),
      tools: JSON.stringify(['Blender 3D', 'Cinema 4D', 'Adobe Photoshop', 'After Effects']),
      services: JSON.stringify(['3D Visuals', 'Graphic Design', 'Poster Art', 'Key Visual']),
      beforeAfter: JSON.stringify({
        before: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'
      }),
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-the-middle-of-a-40871-large.mp4',
      processSteps: JSON.stringify([
        { step: '01', title: 'Concept & Moodboarding', desc: 'Analyzing Mercedes AMG brand guidelines, selecting neon magenta & emerald lighting highlights.' },
        { step: '02', title: '3D CAD Asset Import & Lighting', desc: 'Positioning vehicle in Blender 3D, configuring volumetric fog and glass raytracing.' },
        { step: '03', title: 'Color Grading & Typography', desc: 'Compositing multi-pass renders in Photoshop, adding custom brutalist typography.' }
      ]),
      finalResult: 'Delivered 8 resolution formats (Instagram Post, Story, Billboard Print 300DPI, 4K Desktop Wallpaper) achieving 4.8k impressions.',
      downloadRule: 'allowed',
      views: 4821,
      uniqueViews: 3210,
      likes: 842,
      saves: 421,
      shares: 96,
      files: {
        create: [
          {
            filename: 'Mercedes_AMG_4K_Wallpaper.png',
            description: 'Ultra high-definition 4K wallpaper export with watermark protection option.',
            category: 'Graphics',
            fileUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1920&auto=format&fit=crop',
            fileSize: 18450000,
            format: 'PNG',
            version: 'v1.0',
            downloadPermission: 'allowed',
            downloadCount: 188
          },
          {
            filename: 'Mercedes_AMG_Source_Layered.psd',
            description: 'Full layered Photoshop PSB working file with smart objects.',
            category: 'Source',
            fileUrl: '#',
            fileSize: 482000000,
            format: 'PSD',
            version: 'v2.1',
            downloadPermission: 'request_req',
            downloadCount: 42
          }
        ]
      }
    }
  });

  const p2 = await prisma.project.create({
    data: {
      slug: 'aetheria-luxury-parfum-branding',
      title: 'AETHERIA — Luxury Fragrance Brand Identity',
      category: 'Branding',
      description: 'Comprehensive brand architecture and packaging design for Aetheria Parfum Paris. Minimalist luxury typography, custom gold foil embossed logo marks, and sustainable eco-glass bottle visuals.',
      client: 'Aetheria Parfum Paris',
      year: '2025',
      featured: true,
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop'
      ]),
      tools: JSON.stringify(['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Keynote']),
      services: JSON.stringify(['Brand Strategy', 'Logo Design', 'Packaging', 'Visual Guidelines']),
      downloadRule: 'allowed',
      views: 3921,
      uniqueViews: 2840,
      likes: 754,
      saves: 389,
      shares: 84,
      files: {
        create: [
          {
            filename: 'Aetheria_Brand_Guidelines_2026.pdf',
            description: 'Complete 64-page brand manual including color systems, font pairings, and grid systems.',
            category: 'PDF Document',
            fileUrl: '#',
            fileSize: 34200000,
            format: 'PDF',
            version: 'v1.0',
            downloadPermission: 'allowed',
            downloadCount: 215
          }
        ]
      }
    }
  });

  const p3 = await prisma.project.create({
    data: {
      slug: 'neo-fintech-banking-app',
      title: 'NEO-FINTECH — NextGen Banking Mobile App',
      category: 'UI/UX',
      description: 'Futuristic banking dashboard and mobile crypto wallet. Dark mode glassmorphism interface with micro-interactions, seamless biometric auth flow, and real-time portfolio analytics.',
      client: 'NeoBank International',
      year: '2026',
      featured: true,
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop'
      ]),
      tools: JSON.stringify(['Figma', 'Spline 3D', 'Principle', 'Tailwind CSS']),
      services: JSON.stringify(['UI/UX Design', 'Design System', 'Interactive Prototype']),
      downloadRule: 'allowed',
      views: 3120,
      uniqueViews: 2100,
      likes: 630,
      saves: 310,
      shares: 62,
      files: {
        create: [
          {
            filename: 'NeoBank_UI_Kit_Figma.fig',
            description: 'Full Figma auto-layout design system with 200+ components.',
            category: 'UI Kit',
            fileUrl: '#',
            fileSize: 84000000,
            format: 'FIG',
            version: 'v3.0',
            downloadPermission: 'allowed',
            downloadCount: 310
          }
        ]
      }
    }
  });

  const p4 = await prisma.project.create({
    data: {
      slug: 'chronos-futuristic-watch-3d',
      title: 'CHRONOS 3D — Futuristic Timepiece Motion Visualizer',
      category: '3D',
      description: 'High-precision 3D CGI product animation for Swiss watchmaker Chronos. Photorealistic metallic textures, sapphire glass refraction, and skeleton gear rotation mechanics.',
      client: 'Chronos Swiss Atelier',
      year: '2026',
      featured: true,
      status: 'published',
      coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop'
      ]),
      tools: JSON.stringify(['Cinema 4D', 'Octane Render', 'ZBrush', 'Premiere Pro']),
      services: JSON.stringify(['3D Modeling', 'Motion Graphics', 'Product Visualization']),
      downloadRule: 'allowed',
      views: 2940,
      uniqueViews: 1950,
      likes: 580,
      saves: 280,
      shares: 71
    }
  });

  // 3. Client Project (Portal Demo)
  await prisma.clientProject.create({
    data: {
      title: 'Mercedes AMG Campaign Deliverables',
      clientName: 'Sarah Jenkins',
      clientEmail: 'sarah@mercedes-amg.de',
      accessCode: 'AMG-2026',
      status: 'in_progress',
      description: 'Exclusive client portal for Mercedes AMG marketing phase 1 deliverables.',
      deliverables: JSON.stringify([
        { name: 'Mercedes_AMG_Story_Pack.zip', size: '142 MB', url: '#' },
        { name: 'KeyVisual_Billboard_8K.png', size: '48 MB', url: '#' }
      ]),
      feedbacks: {
        create: [
          { sender: 'client', comment: 'The neon lighting contrast on the rear wing looks fantastic! Can we get a vertical 9:16 crop?' },
          { sender: 'admin', comment: 'Thanks Sarah! I have updated the file pack with vertical crops.' }
        ]
      }
    }
  });

  // 4. Sample Messages
  await prisma.message.create({
    data: {
      name: 'Alex Vance',
      email: 'alex@vancedesign.com',
      phone: '+1 415 890 1234',
      message: 'Hi Otajon! We love your Mercedes AMG poster visual. Are you available for a 3-month contract starting next month?',
      status: 'new',
    }
  });

  // 5. Sample Design Requests
  await prisma.designRequest.create({
    data: {
      clientName: 'Elena Rostova',
      email: 'elena@cybertech.io',
      phone: '+7 999 123 45 67',
      services: JSON.stringify(['Branding', 'UI/UX', '3D Design']),
      projectDetails: 'We are launching a new AI SaaS platform and need high-end dark studio branding, logo mark, and 3D hero assets.',
      budget: '$5,000 - $10,000',
      deadline: '4 Weeks',
      aiBrief: JSON.stringify({
        summary: 'CyberTech AI SaaS Branding & 3D Web Visuals',
        palette: 'Obsidian, Electric Cyan, Metallic Silver',
        deliverables: ['Logo System', '3D Interactive Icons', 'Figma Web Design System']
      }),
      status: 'pending'
    }
  });

  // 6. Analytics Events for Section 31
  const events = [
    { eventType: 'page_view', path: '/', country: 'Uzbekistan', device: 'Desktop', browser: 'Chrome' },
    { eventType: 'page_view', path: '/', country: 'Uzbekistan', device: 'Mobile', browser: 'Safari' },
    { eventType: 'page_view', path: '/works', country: 'Russia', device: 'Desktop', browser: 'Firefox' },
    { eventType: 'project_view', projectId: p1.id, path: '/works/mercedes-amg-cyberpunk', country: 'Uzbekistan', device: 'Desktop', browser: 'Chrome' },
    { eventType: 'project_view', projectId: p1.id, path: '/works/mercedes-amg-cyberpunk', country: 'United States', device: 'Desktop', browser: 'Safari' },
    { eventType: 'like', projectId: p1.id, path: '/works/mercedes-amg-cyberpunk', country: 'Uzbekistan', device: 'Desktop', browser: 'Chrome' },
    { eventType: 'save', projectId: p1.id, path: '/works/mercedes-amg-cyberpunk', country: 'Germany', device: 'Desktop', browser: 'Edge' },
    { eventType: 'download', projectId: p1.id, path: '/works/mercedes-amg-cyberpunk', country: 'Uzbekistan', device: 'Desktop', browser: 'Chrome' },
    { eventType: 'project_view', projectId: p2.id, path: '/works/aetheria-luxury-parfum-branding', country: 'France', device: 'Mobile', browser: 'Safari' },
  ];

  for (const ev of events) {
    await prisma.analyticsEvent.create({ data: ev });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
