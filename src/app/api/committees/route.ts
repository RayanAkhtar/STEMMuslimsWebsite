import { NextResponse } from 'next/server';
import committee2022 from '@/lib/committees/2022-2023.json';
import committee2023 from '@/lib/committees/2023-2024.json';
import committee2024 from '@/lib/committees/2024-2025.json';
import committee2025 from '@/lib/committees/2025-2026.json';

/* Statically imported so the data is bundled into the deployed worker —
   Cloudflare Workers have no filesystem, so fs reads fail in production. */
const COMMITTEES: Record<string, unknown> = {
  '2022-2023.json': committee2022,
  '2023-2024.json': committee2023,
  '2024-2025.json': committee2024,
  '2025-2026.json': committee2025,
};

/* Committee data is static JSON that changes a handful of times a year, so
   let the CDN serve it rather than reading from disk on every page view.
   (Reading request.url makes this route dynamic, so cache headers are the
   mechanism here — a `revalidate` export would be silently ignored.) */
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ files: Object.keys(COMMITTEES) }, { headers: CACHE_HEADERS });
  }

  const data = COMMITTEES[file];
  if (!data) {
    return new NextResponse(JSON.stringify({ error: 'File not found' }), { status: 404 });
  }

  return NextResponse.json(data, { headers: CACHE_HEADERS });
}
