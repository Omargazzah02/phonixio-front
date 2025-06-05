
import { ApolloClient,  InMemoryCache, HttpLink } from '@apollo/client';

const shopifyUrl = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const client = new ApolloClient({
  link: new HttpLink({
    uri: shopifyUrl,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});

export default client