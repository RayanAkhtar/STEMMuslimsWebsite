import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const COMMITTEES_DIR = path.join(process.cwd(), 'src', 'lib', 'committees');

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

  try {
    const filenames = await fs.readdir(COMMITTEES_DIR);
    const jsonFiles = filenames.filter(f => f.endsWith('.json'));

    if (!file) {
      return NextResponse.json({ files: jsonFiles }, { headers: CACHE_HEADERS });
    }

    // sanitize file param
    if (!jsonFiles.includes(file)) {
      return new NextResponse(JSON.stringify({ error: 'File not found' }), { status: 404 });
    }

    const filePath = path.join(COMMITTEES_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed, { headers: CACHE_HEADERS });
  } catch (err) {
    console.error('committees route error:', err);
    return new NextResponse(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
