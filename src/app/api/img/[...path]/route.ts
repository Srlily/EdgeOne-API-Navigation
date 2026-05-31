import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathSegments = path.join('/');
  const targetUrl = `https://img.srliy.com/${pathSegments}`;
  
  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': request.headers.get('user-agent') || '',
    },
  });

  const data = await response.text();
  const headers = new Headers(response.headers);

  return new NextResponse(data, {
    status: response.status,
    headers: headers,
  });
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

  const headers = new Headers(response.headers);

  return new NextResponse(null, {
    status: response.status,
    headers: headers,
  });
}
