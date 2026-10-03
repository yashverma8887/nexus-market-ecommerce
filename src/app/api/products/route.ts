import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const brand = searchParams.get('brand') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const rating = searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined;
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sortBy') as any;

    const products = getAllProducts({
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      featured,
      sortBy
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || data.price === undefined) {
      return NextResponse.json({ error: 'Title and price are required' }, { status: 400 });
    }

    const newProduct = createProduct(data);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
