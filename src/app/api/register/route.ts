import { NextRequest, NextResponse } from 'next/server';
import {CUSTOMER_CREATE , CUSTOMER_ACCESS_TOKEN_CREATE} from '@/graphql/mutations'
const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const SHOPIFY_STOREFRONT_TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;


export async function POST (request : NextRequest)
{
    try {

        const body = await request.json()
        const {email, password, firstName, lastName} = body ;
        const variables = {
          input: { email, password, firstName, lastName }, };

        const shopifyRes = await fetch(SHOPIFY_STORE_URL,{
            method : 'POST' , 
            headers : {
                 'Content-Type': 'application/json',
                 'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
            },
            body : JSON.stringify({ query : CUSTOMER_CREATE ,  variables :variables})
        })

        const result = await shopifyRes.json()


        const errors = result.data.customerCreate.customerUserErrors;

         if (errors.length > 0) {
         return NextResponse.json({ errors }, { status: 400 });
         }
         return NextResponse.json({ success: true, customer: result.data.customerCreate.customer });

        
        


    } catch (error) {

         console.error('Register error:', error);
    return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });

    }
}