import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useApi";
import { useStore } from "../../store/store";
import * as types from "../../types/types";

const ProductList = () => {
  const { category, setCategory, products, currency, setProduct } = useStore();
  const { getCategory, loadingCategory } = useCategory();

  const [categoryName, setCategoryName] = useState<string>("");
  useEffect(() => {
    if (category) {
      setCategoryName(
        category?.name.charAt(0).toUpperCase() + category?.name.slice(1)
      );
    } else {
      setCategoryName("");
    }
  }, [category]);

  useEffect(() => {
    if (category === null) {
      setCategory({ _typename: "Category", name: "all" });
      getCategory({ _typename: "Category", name: "all" });
    }
  }, []);
  if (loadingCategory) {
    return <div>Loading...</div>;
  }

  const showProduct = (product: types.Product) => {
    setProduct(product);
    Router.push(`/${product.name}`);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl tracking-tight text-gray-700 pb-16">
          {categoryName}
        </h2>

        <div
          className="mt-6 grid grid-cols-1  gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
          style={{ rowGap: "8rem" }}
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="group"
              onClick={() => showProduct(product)}
            >
              <div className="group relative space-y-6 group-hover:shadow-2xl p-2">
                <div className="overflow-visible relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md  lg:h-80 lg:aspect-none">
                  <img
                    src={product.gallery[0]}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    alt="mainImage"
                  />
                  <div className="hidden absolute -bottom-6 right-7 bg-green-400 rounded-full h-12 w-12 group-hover:flex flex-row justify-center align-middle">
                    <Image
                      src="/Group3.svg"
                      width={20}
                      height={20}
                      alt="add-to-cart"
                    ></Image>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      {/* <a href={product.href}> */}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                      {/* </a> */}
                    </h3>
                    <p
                      className="text-sm font-medium text-gray-900"
                      key={"price"}
                    >
                      {currency.symbol}&nbsp;
                      {
                        product.prices.filter(
                          (price) => price.currency.label === currency.label
                        )[0].amount
                      }
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
