const STOREFRONT_ACCESS_TOKEN = '8bc689cd4ef6a23c5d3ff0a5c107c953';
const STOREFRONT_API_URL = 'https://slava-stanley.myshopify.com/api/2023-04/graphql.json';

async function fetchProducts() {
  const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data.products.edges.map(edge => edge.node);
}

// Example usage: log products to console
fetchProducts().then(products => console.log(products));