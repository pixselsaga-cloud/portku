import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'General Asset';
    const description = (formData.get('description') as string) || '';
    const downloadPermission = (formData.get('downloadPermission') as string) || 'allowed';
    const projectId = (formData.get('projectId') as string) || null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Extract format extension
    const originalName = file.name;
    const ext = originalName.split('.').pop()?.toUpperCase() || 'FILE';

    // NOTE: Vercel serverless does not have a persistent filesystem.
    // In production, files should be uploaded to cloud storage (Vercel Blob, Cloudinary, S3).
    // For now, we store a reference URL. The actual file data is not persisted.
    const fileUrl = `/uploads/${Date.now()}_${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // Create DB entry in ProjectFile table
    const fileRecord = await prisma.projectFile.create({
      data: {
        filename: originalName,
        description,
        category,
        fileUrl,
        fileSize: file.size,
        format: ext,
        version: 'v1.0',
        downloadPermission,
        projectId: projectId && projectId !== 'none' ? projectId : null,
      },
    });

    return NextResponse.json({
      success: true,
      file: fileRecord,
      message: `File ${originalName} record created successfully!`,
    });
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
