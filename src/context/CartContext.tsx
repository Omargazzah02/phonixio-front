'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import client from '@/lib/shopifyClient';

import { CART_CREATE, CART_LINES_ADD } from '@/graphql/mutations';

type CartContextType = {
  cartId: string | null;
  webUrl: string | null;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem('cart_id');
    if (savedId) {
      setCartId(savedId);
    }
  }, []);

  const createCart = async () => {
    const { data } = await client.mutate({
      mutation: CART_CREATE,
      variables: { input: {} },
    });

    const newCartId = data.cartCreate.cart.id;
    const newWebUrl = data.cartCreate.cart.checkoutUrl;

    localStorage.setItem('cart_id', newCartId);
    setCartId(newCartId);
    setWebUrl(newWebUrl);

    return newCartId;
  };

  const addToCart = async (variantId: string, quantity: number) => {
    const id = cartId || (await createCart());

    const { data } = await client.mutate({
      mutation: CART_LINES_ADD,
      variables: {
        cartId: id,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    });

    const newCartId = data.cartLinesAdd.cart.id;
    const newWebUrl = data.cartLinesAdd.cart.checkoutUrl;

    setCartId(newCartId);
    setWebUrl(newWebUrl);
  };

  return (
    <CartContext.Provider value={{ cartId, webUrl, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
