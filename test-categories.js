const { getClient } = require('./lib/apollo-client');
const { gql } = require('graphql-tag');

async function testCategories() {
    const client = getClient();
    const GET_CATS = gql`
    query {
      categories {
        nodes {
          name
          slug
        }
      }
    }
  `;
    try {
        const { data } = await client.query({ query: GET_CATS });
        console.log(JSON.stringify(data.categories.nodes, null, 2));
    } catch (e) {
        console.error(e);
    }
}

testCategories();
