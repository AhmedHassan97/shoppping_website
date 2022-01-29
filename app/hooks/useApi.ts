import { useStore } from "../store/store";
import { useLazyQuery, useQuery } from "@apollo/client";
import * as queries from "../graphql/queries";
import { useMemo, useState } from "react";
import * as types from "../types/types";
const useCategories = () => {
  const { data, loading, error } = useQuery(queries.CATEGORIES);

  return { error, loading, data };
};
export const useCurrency = () => {
  const {
    data: currencies,
    loading: loadingCurrencies,
    error: errorCurrency
  } = useQuery(queries.CURRENCY);

  return { errorCurrency, loadingCurrencies, currencies };
};

const useCategory = () => {
  const { addProducts } = useStore();
  const [
    categoryQuery,
    { data: category, loading: loadingCategory, error: errorCategory }
  ] = useLazyQuery(queries.CATEGORY);

  const getCategory = async (category: types.Category) => {
    const result = await categoryQuery({ variables: { title: category.name } });

    addProducts(result.data.category.products);
  };

  return { errorCategory, loadingCategory, category, getCategory };
};

export { useCategories, useCategory };
