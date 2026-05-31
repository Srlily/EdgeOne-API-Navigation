import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const targetUrl = `https://img.srliy.com/img`;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const contentType = response.headers.get('Content-Type') || 'text/html; charset=utf-8';
    const headers = new Headers();
    
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', response.headers.get('Content-Length') || '');
    headers.set('Cache-Control', 'public, max-age=3600');
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

export async function HEAD(request: NextRequest) {
  const targetUrl = `https://img.srliy.com/img`;
  
  const response = await fetch(targetUrl, {
    method: 'HEAD',
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
    },
  });

  const contentType = response.headers.get('Content-Type') || 'text/html; charset=utf-8';
  const headers = new Headers();
  
  headers.set('Content-Type', contentType);
  headers.set('Content-Length', response.headers.get('Content-Length') || '');
  headers.set('Cache-Control', 'public, max-age=3600');
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
