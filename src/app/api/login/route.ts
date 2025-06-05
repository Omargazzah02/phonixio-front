import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/graphql/mutations';
import { serialize } from 'cookie';

const SHOPIFY_STORE_URL  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const SHOPIFY_STOREFRONT_TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const variables = { input: { email, password } };

    const shopifyRes = await fetch(SHOPIFY_STORE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: CUSTOMER_ACCESS_TOKEN_CREATE, variables }),
    });

    const result = await shopifyRes.json();

    const errors = result.data.customerAccessTokenCreate.customerUserErrors;
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const tokenData = result.data.customerAccessTokenCreate.customerAccessToken;

    const response = NextResponse.json({ message: 'Connexion réussie' });

    response.headers.set(
      'Set-Cookie',
      serialize('token', tokenData.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        path: '/',
      })
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
  }
}
