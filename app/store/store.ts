import create, { GetState, SetState } from "zustand";
import { devtools, persist, StoreApiWithPersist } from "zustand/middleware";
import * as types from "../types/types";
interface ShoppingApp {
  categories: Array<types.Category>;
  addCategories: (categories: Array<types.Category>) => void;
  category: types.Category | null;
  setCategory: (category: types.Category) => void;

  product: types.Product | null;
  setProduct: (product: types.Product) => void;

  products: Array<types.Product> | [];
  addProducts: (products: Array<types.Product>) => void;

  currency: types.Currency;
  setCurrency: (currency: types.Currency) => void;

  cart: Array<types.CartItem>;
  addToCart: (product: types.CartItem) => void;
  removeFromCart: (productId: string) => void;
}

export const useStore = create<
  ShoppingApp,
  SetState<ShoppingApp>,
  GetState<ShoppingApp>,
  StoreApiWithPersist<ShoppingApp>
>(
  persist(
    devtools((set, get) => ({
      // initial state
      categories: [],
      addCategories: (categories: Array<types.Category>) => {
        set(() => ({
          categories: categories
        }));
      },
      products: [],
      addProducts: (products: Array<types.Product>) => {
        set(() => ({
          products: products
        }));
      },
      product: null,
      setProduct: (product: types.Product) => {
        set(() => ({
          product: product
        }));
      },
      category: null,
      setCategory: (category: types.Category) => {
        set(() => ({
          category: category
        }));
      },
      currency: { _typename: "Currency", label: "USD", symbol: "$" },
      setCurrency: (currency: types.Currency) => {
        set(() => ({
          currency: currency
        }));
      },
      cart: [],
      addToCart: (product: types.CartItem) => {
        set(() => ({
          cart: [...get().cart, product]
        }));
      },
      removeFromCart: (productId: string) => {
        set(() => ({
          cart: get().cart.filter(
            (product: types.CartItem) => product.id !== productId
          )
        }));
      }
    })),
    {
      name: "shopping-app" // unique name,
    }
  )
);
