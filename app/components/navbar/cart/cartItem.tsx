import Image from "next/image";
import { useStore } from "../../../store/store";
import * as types from "../../../types/types";
type CartItemProps = {
  cartItem: types.CartItem;
};
const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { removeFromCart, addToCart, currency } = useStore();
  const increaseCount = (item: types.CartItem) => {
    removeFromCart(item.id);
    const cartItem: types.CartItem = {
      attributes: item.attributes,
      brand: item.brand,
      count: item.count + 1,
      image: item.image,
      id: item.id,
      prices: item.prices,
      name: item.name,
      selectedAttributes: item.selectedAttributes
    };
    addToCart(cartItem);
  };
  const decreaseCount = (item: types.CartItem) => {
    if (item.count === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      const cartItem: types.CartItem = {
        attributes: item.attributes,
        brand: item.brand,
        count: item.count - 1,
        image: item.image,
        id: item.id,
        prices: item.prices,
        name: item.name,
        selectedAttributes: item.selectedAttributes
      };
      addToCart(cartItem);
    }
  };
  return (
    <div className="flex flex-row px-2 pb-5">
      <div className="flex flex-col space-y-3 ">
        <div className="flex flex-col">
          <h2>{cartItem.name}</h2>
          <h3>{cartItem.brand}</h3>
        </div>

        <h4>
          {currency.symbol}&nbsp;
          {
            cartItem.prices.filter(
              (price) => price.currency.label === currency.label
            )[0].amount
          }
        </h4>
        <div
          className="space-y-3 text-xs"
          // style={{ paddingTop: "100%" }}
        >
          {cartItem?.attributes.map((attribute, attributeIndex) => {
            return (
              <div key={attributeIndex} className="flex flex-col">
                {/* <h3 className="font-bold ">{attribute.name}:</h3> */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
                  {attribute.items.map((singleItem, itemIndex) => {
                    return cartItem.selectedAttributes.filter(
                      (val) =>
                        val.item.displayValue === singleItem.displayValue &&
                        val.name === attribute.name
                    )[0] ? (
                      <button key={itemIndex} className="bg-black text-white ">
                        {singleItem.displayValue}
                      </button>
                    ) : (
                      <button
                        key={itemIndex}
                        className={
                          "border-2 border-gray-400  hover:opacity-75 r"
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
        <button
          className="border-2 px-1 border-gray-400"
          onClick={() => {
            increaseCount(cartItem);
          }}
        >
          +
        </button>
        <h6>{cartItem.count}</h6>
        <button
          className="border-2 px-1 border-gray-400"
          onClick={() => decreaseCount(cartItem)}
        >
          -
        </button>
      </div>

      <div className="pl-auto w-28 h-32">
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
