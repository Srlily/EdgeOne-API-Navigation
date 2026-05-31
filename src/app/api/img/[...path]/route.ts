import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathSegments = path.join('/');
  const targetUrl = `https://img.srliy.com/${pathSegments}`;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || '*/*',
      },
    });

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const contentType = response.headers.get('Content-Type') || getContentTypeFromPath(pathSegments);
    const headers = new Headers();
    
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', response.headers.get('Content-Length') || '');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('X-Proxy-From', 'api.srliy.com');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Vary', 'Accept');

    return new NextResponse(response.body, {
      status: response.status,
      headers: headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy failed', { status: 502 });
  }
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathSegments = path.join('/');
  const targetUrl = `https://img.srliy.com/${pathSegments}`;
  
  const response = await fetch(targetUrl, {
    method: 'HEAD',
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
    },
  });

  const contentType = response.headers.get('Content-Type') || getContentTypeFromPath(pathSegments);
  const headers = new Headers();
  
  headers.set('Content-Type', contentType);
  headers.set('Content-Length', response.headers.get('Content-Length') || '');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Allow-Headers', '*');

  return new NextResponse(null, {
    status: response.status,
    headers: headers,
  });
}

export async function OPTIONS(request: NextRequest) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Allow-Headers', '*');
  headers.set('Access-Control-Max-Age', '86400');

  return new NextResponse(null, {
    status: 204,
    headers: headers,
  });
}

function getContentTypeFromPath(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'bmp': 'image/bmp',
    'avif': 'image/avif',
    'json': 'application/json',
    'xml': 'application/xml',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'txt': 'text/plain',
  };
  return contentTypes[ext || ''] || 'application/octet-stream';
}
