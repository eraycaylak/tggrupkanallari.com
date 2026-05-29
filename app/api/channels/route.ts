/**
 * 🔌 Kanal CRUD API
 * 
 * GET    /api/channels          — Tüm kanalları listele (query: platform, category, city, q)
 * POST   /api/channels          — Yeni kanal ekle
 * PUT    /api/channels          — Kanal güncelle (body: { id, ...fields })
 * DELETE /api/channels?id=xxx   — Kanal sil
 */

import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'channels.json');

function readChannels() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeChannels(channels: Record<string, unknown>[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(channels, null, 2), 'utf-8');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/İ/g, 'i').replace(/Ğ/g, 'g').replace(/Ü/g, 'u')
    .replace(/Ş/g, 's').replace(/Ö/g, 'o').replace(/Ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET — Listele / Filtrele / Ara
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  let channels = readChannels();

  // Platform filtre
  const platform = searchParams.get('platform');
  if (platform) {
    channels = channels.filter((ch: Record<string, unknown>) => ch.platform === platform);
  }

  // Kategori filtre
  const category = searchParams.get('category');
  if (category) {
    channels = channels.filter((ch: Record<string, unknown>) => ch.category === category);
  }

  // Şehir filtre
  const city = searchParams.get('city');
  if (city) {
    channels = channels.filter((ch: Record<string, unknown>) =>
      (ch.city as string || '').toLowerCase() === city.toLowerCase()
    );
  }

  // Arama
  const q = searchParams.get('q');
  if (q) {
    const query = q.toLowerCase();
    channels = channels.filter((ch: Record<string, unknown>) =>
      (ch.name as string).toLowerCase().includes(query) ||
      (ch.description as string).toLowerCase().includes(query) ||
      (ch.tags as string[]).some((t: string) => t.toLowerCase().includes(query))
    );
  }

  return Response.json({
    success: true,
    count: channels.length,
    data: channels,
  });
}

// POST — Yeni kanal ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const channels = readChannels();

    // Validasyon
    const required = ['name', 'platform', 'category', 'description', 'link'];
    for (const field of required) {
      if (!body[field]) {
        return Response.json(
          { success: false, error: `'${field}' alanı zorunludur` },
          { status: 400 }
        );
      }
    }

    // Yeni kanal oluştur
    const newChannel = {
      id: `ch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: body.name,
      slug: slugify(body.name),
      platform: body.platform,
      category: body.category,
      description: body.description,
      memberCount: body.memberCount || 0,
      link: body.link,
      tags: body.tags || [],
      featured: body.featured || false,
      verified: body.verified || false,
      createdAt: new Date().toISOString().split('T')[0],
      city: body.city || 'Türkiye',
    };

    // Slug çakışma kontrolü
    const existing = channels.find((ch: Record<string, unknown>) => ch.slug === newChannel.slug);
    if (existing) {
      newChannel.slug = `${newChannel.slug}-${Date.now().toString(36).slice(-4)}`;
    }

    channels.push(newChannel);
    writeChannels(channels);

    return Response.json({ success: true, data: newChannel }, { status: 201 });
  } catch {
    return Response.json(
      { success: false, error: 'Geçersiz JSON body' },
      { status: 400 }
    );
  }
}

// PUT — Kanal güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return Response.json(
        { success: false, error: "'id' alanı zorunludur" },
        { status: 400 }
      );
    }

    const channels = readChannels();
    const index = channels.findIndex((ch: Record<string, unknown>) => ch.id === body.id);
    if (index === -1) {
      return Response.json(
        { success: false, error: 'Kanal bulunamadı' },
        { status: 404 }
      );
    }

    // Güncellenebilir alanlar
    const updatable = [
      'name', 'description', 'platform', 'category', 'memberCount',
      'link', 'tags', 'featured', 'verified', 'city',
    ];

    for (const field of updatable) {
      if (body[field] !== undefined) {
        channels[index][field] = body[field];
      }
    }

    // İsim değişirse slug'ı güncelle
    if (body.name) {
      channels[index].slug = slugify(body.name);
    }

    writeChannels(channels);

    return Response.json({ success: true, data: channels[index] });
  } catch {
    return Response.json(
      { success: false, error: 'Geçersiz JSON body' },
      { status: 400 }
    );
  }
}

// DELETE — Kanal sil
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return Response.json(
      { success: false, error: "'id' query parametresi zorunludur" },
      { status: 400 }
    );
  }

  const channels = readChannels();
  const index = channels.findIndex((ch: Record<string, unknown>) => ch.id === id);
  if (index === -1) {
    return Response.json(
      { success: false, error: 'Kanal bulunamadı' },
      { status: 404 }
    );
  }

  const deleted = channels.splice(index, 1)[0];
  writeChannels(channels);

  return Response.json({ success: true, data: deleted });
}
