import Image from "next/image";
import React from "react";
import { useStore } from "../../store/store";
import * as types from "../../types/types";

type CartProps = {
  cartItem: types.CartItem;
};
const CartItem: React.FC<CartProps> = ({ cartItem }) => {
  const { currency } = useStore();
  return (
    <div className="flex flex-row space-y-6 pb-10">
      <div className="flex flex-col space-y-5">
        <div>
          <h1 className="text-xl font-semibold">{cartItem.name}</h1>
          <h3 className="text-xl">{cartItem.brand}</h3>

          <h2 className="text-gray-600 text-lg"></h2>
        </div>
        <h5 className="font-bold">
          {currency.symbol}
          {
            cartItem.prices.filter(
              (price) => price.currency.label === currency.label
            )[0].amount
          }
        </h5>
        <div className="grid grid-rows-1 gap-y-3 lg:gap-y-0 lg:grid-cols-3 gap-x-1">
          {cartItem?.attributes.map((attribute, attributeIndex) => {
            return (
              <div key={attributeIndex} className="flex flex-col ">
                <h3 className="font-bold ">{attribute.name}:</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-2 ">
                  {attribute.items.map((singleItem, itemIndex) => {
                    return cartItem.selectedAttributes.filter(
                      (val) =>
                        val.item.displayValue === singleItem.displayValue &&
                        val.name === attribute.name
                    )[0] ? (
                      <button
                        key={itemIndex}
                        className="bg-black text-white text-sm text-center "
                      >
                        {singleItem.displayValue}
                      </button>
                    ) : (
                      <button
                        key={itemIndex}
                        className={
                          "border-2 border-gray-400  text-sm hover:opacity-75 text-center"
                        }
                      >
                        {singleItem.displayValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-between pr-2 ml-auto">
        <button className="border-2 px-1 border-gray-400 ">+</button>
        <h6>1</h6>
        <button className="border-2 px-1 border-gray-400">-</button>
      </div>
      <div className="pl-auto w-28 h-full">
        <img
          src={cartItem.image}
          alt="text"
          className="object-scale-down object-top w-full h-full"
        />
      </div>
    </div>
  );
};

export default CartItem;
