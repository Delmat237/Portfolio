import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { isAdminRequest } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function signCloudinaryParams(params: Record<string, string>, apiSecret: string): string {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(payload + apiSecret).digest('hex');
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Configuration Cloudinary manquante' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Fichier requis' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté (JPEG, PNG, WebP, GIF)' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 5 Mo)' }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000).toString();
    const uploadParams = { folder: 'portfolio', timestamp };
    const signature = signCloudinaryParams(uploadParams, apiSecret);

    const cloudinaryForm = new FormData();
    cloudinaryForm.append('file', file);
    cloudinaryForm.append('api_key', apiKey);
    cloudinaryForm.append('timestamp', timestamp);
    cloudinaryForm.append('signature', signature);
    cloudinaryForm.append('folder', 'portfolio');

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: cloudinaryForm }
    );

    const result = (await cloudinaryResponse.json()) as {
      secure_url?: string;
      error?: { message?: string };
    };

    if (!cloudinaryResponse.ok || !result.secure_url) {
      console.error('Erreur Cloudinary:', result);
      return NextResponse.json(
        { error: result.error?.message ?? 'Erreur lors de l\'upload Cloudinary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}
