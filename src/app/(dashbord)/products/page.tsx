'use client';

import { useEffect, useState } from 'react';
import client from '@/lib/shopifyClient';
import { gql } from '@apollo/client';
import { useCart } from '@/context/CartContext';
import { GET_PRODUCTS } from '@/graphql/queries';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart, webUrl } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await client.query({ query: GET_PRODUCTS });
      const result = data.products.edges.map((edge: any) => {
        const variantNode = edge.node.variants.edges[0].node;
        const imageNode = edge.node.images.edges[0]?.node;
        return {
          id: edge.node.id,
          title: edge.node.title,
          variantId: variantNode.id,
          price: variantNode.priceV2.amount,
          currency: variantNode.priceV2.currencyCode,
          image: imageNode ? imageNode.url : null,
        };
      });
      setProducts(result);
    }

    fetchProducts();
  }, []);

  return (
    <div className='p-7'>
      <h1 className='title'>Produits</h1>
      <div className='flex flex-wrap space-x-4'>
        {products.map((p) => (

          <ProductCard key={p.id} price={p.price+' '+p.currency} image={p.image} title={p.title} addToCart={() => {addToCart(p.variantId , 1)}} ></ProductCard>


         
        ))}
      </div>
      {webUrl && <a href={webUrl} target="_blank">Voir le panier</a>}
    </div>
  );
}
