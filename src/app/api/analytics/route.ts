import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/store';

export async function GET() {
  try {
    const stats = getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
