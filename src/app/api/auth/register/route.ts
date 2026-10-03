import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/store';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const newUser = createUser({
      name,
      email,
      role: role === 'admin' ? 'admin' : 'customer'
    });

    const token = signToken({
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    });

    const response = NextResponse.json({
      success: true,
      user: newUser,
      token
    }, { status: 201 });

    response.cookies.set('nexus_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
