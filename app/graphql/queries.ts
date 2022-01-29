import { gql } from "@apollo/client";

export const CATEGORY = gql`
  query category($title: String!) {
    category(input: { title: $title }) {
      products {
        category
        brand
        name
        description
        attributes {
          name
          id
          items {
            displayValue
            value
          }
        }
        inStock
        gallery

        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
