import { NextResponse } from 'next/server';
import { addProductReview } from '@/lib/store';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, userName, userAvatar, rating, comment } = await request.json();

    if (!rating || !comment) {
      return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
    }

    const updated = addProductReview(params.id, {
      userId: userId || 'anonymous',
      userName: userName || 'Verified Customer',
      userAvatar: userAvatar || undefined,
      rating: Number(rating),
      comment
    });

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
