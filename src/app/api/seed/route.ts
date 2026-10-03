import { NextResponse } from 'next/server';
import { resetStore } from '@/lib/store';

export async function POST() {
  try {
    const store = resetStore();
    return NextResponse.json({
      success: true,
      message: 'Store reset with clean seed data successfully',
      productsCount: store.products.length,
      ordersCount: store.orders.length
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Reset failed' }, { status: 500 });
  }
}
