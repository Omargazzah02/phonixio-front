
import { NextRequest, NextResponse } from 'next/server';
import {CUSTOMER_QUERY} from '@/graphql/queries'
import { headers } from 'next/headers';


const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function GET (request : NextRequest) {
    const headersList = await headers(); // await ici, car c'est une Promise
   const cookieHeader = headersList.get('cookie') || '';
 
  const token = cookieHeader
    .split('; ')
    .find(c => c.startsWith('token='))
    ?.split('=')[1] ?? null;

       if (!token) {
    return NextResponse.json({ error: 'Utilisateur non connecté' }, { status: 401 });

  }

  const res = await fetch(SHOPIFY_STORE_URL , {
  method: 'POST', 

    headers : {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body : JSON.stringify({
        query : CUSTOMER_QUERY,
        variables  : {
            customerAccessToken : token
        }
    })
  })

  const data = await res.json()
  const customer = data.data?.customer;

   if (!customer) {
    return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
  }
 
   return NextResponse.json({ user: customer });




}

