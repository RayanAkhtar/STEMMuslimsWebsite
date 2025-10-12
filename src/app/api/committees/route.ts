import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const COMMITTEES_DIR = path.join(process.cwd(), 'src', 'lib', 'committees');

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  try {
    const filenames = await fs.readdir(COMMITTEES_DIR);
    const jsonFiles = filenames.filter(f => f.endsWith('.json'));

    if (!file) {
      return NextResponse.json({ files: jsonFiles });
    }

    // sanitize file param
    if (!jsonFiles.includes(file)) {
      return new NextResponse(JSON.stringify({ error: 'File not found' }), { status: 404 });
    }

    const filePath = path.join(COMMITTEES_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Server error', detail: String(err) }), { status: 500 });
  }
}
