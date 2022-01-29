export type Product = {
  _typename: string;
  id: string;
  name: string;
  inStock: boolean;
  gallery: Array<string>;
  brand: string;
  description: string;
  category: string;
  prices: Array<Price>;
  attributes: Array<Attribute>;
};

export type Price = {
  amount: string;
  currency: Currency;
};

export type Attribute = {
  name: string;
  id: string;
  items: Array<item>;
};

export type item = {
  displayValue: string;
  value: string;
};

export type Category = {
  _typename: string;
  name: string;
};

export type Currency = {
  _typename: string;
  label: string;
  symbol: string;
};

export type Value = {
  item: item;
  name: string;
};
export type CartItem = {
  count: number;
  name: string;
  image: string;
  brand: string;
  prices: Array<Price>;
  attributes: Array<Attribute>;
  selectedAttributes: Array<Value>;
  id: string;
};
