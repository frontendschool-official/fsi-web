import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'GET request successful',
    timestamp: new Date().toISOString(),
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    message: 'POST request successful',
    timestamp: new Date().toISOString(),
    method: 'POST',
    receivedData: body,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    message: 'PUT request successful',
    timestamp: new Date().toISOString(),
    method: 'PUT',
    receivedData: body,
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: 'DELETE request successful',
    timestamp: new Date().toISOString(),
    method: 'DELETE',
  });
}
