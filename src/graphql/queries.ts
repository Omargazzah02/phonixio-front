import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
          
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;




export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;



export const CUSTOMER_QUERY  = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
    }
  }
`;