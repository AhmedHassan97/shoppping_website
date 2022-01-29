import { useEffect, useState } from "react";
import * as types from "../../types/types";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../../store/store";

type Values = {
  item: types.item;
  name: string;
};
const Product: React.FC = () => {
  const [mainImage, setMainImage] = useState<string>();
  const [values, setValues] = useState<Array<types.Value>>([]);
  const { cart, addToCart, product } = useStore();

  useEffect(() => {
    setMainImage(product?.gallery[0]);
    product?.attributes.map((att) => {
      const newObj = { item: att.items[0], name: att.name };
      setValues((values) => [newObj, ...values]);
    });
  }, []);

  const changeValues = (newValue: types.item, attName: string) => {
    const newValues = values.filter((item) => item.name !== attName);
    newValues.push({ item: newValue, name: attName });
    setValues(newValues);
  };

  const onAddToCart = (product: types.Product | null) => {
    if (product?.inStock == false) {
      toast.error("Sorry this product is out of stock ");
    } else {
      if (product) {
        const cartItem: types.CartItem = {
          attributes: product.attributes,
          brand: product.brand,
          count: 1,
          image: product.gallery[0],
          id: (Math.random() * 1000).toString(),
          prices: product.prices,
          name: product.name,
          selectedAttributes: values
        };
        addToCart(cartItem);
      }

      toast.success("Successfully added to your cart ");
    }
  };
  if (product === null) {
    <div>404 Not Found</div>;
  }
  return (
    <div className=" flex flex-col lg:flex-row max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8   ">
      <div>
        <Toaster />
      </div>

      <div className="flex flex-col-reverse lg:flex-row">
        <div
          className="grid grid-cols-3 gap-y-1 lg:flex lg:flex-col lg:space-y-3 space-y-0 space-x-2 lg:space-x-0 pt-2 lg:pt-0"
          id="col1"
        >
          {product?.gallery.map((item, index) => (
            <img
              key={index}
              src={item}
              width={100}
              height={100}
              alt="images"
              onClick={() => setMainImage(item)}
              className="hover:ring-2 "
            />
          ))}
        </div>
        <div className="lg:pl-2 pl-0 w-11/12 max-w-xl ">
          <img
            className="h-1/2 object-contain object-top w-full"
            src={mainImage}
            alt="images"
          />
        </div>
      </div>

      <div
        id="col2"
        className="flex-col lg:ml-10 space-y-10"
        style={{
          width: "400px"
        }}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="font-semibold text-3xl">{product?.name}</h1>
          <h2 className="text-2xl font-medium">{product?.brand}</h2>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            {product?.inStock === true ? (
              <h5 className="font-bold text-sm">in stock</h5>
            ) : (
              <h5 className="font-bold text-sm">out of stock</h5>
            )}
          </div>
          {product?.attributes.map((attribute, attributeIndex) => {
            if (product.inStock === true) {
              return (
                <div key={attributeIndex} className="flex flex-col ">
                  <h3 className="font-bold ">{attribute.name}:</h3>
                  <div className="grid grid-cols-3 lg:grid-cols-5">
                    {attribute.items.map((singleItem, itemIndex) => {
                      return values.filter(
                        (val) =>
                          val.item.displayValue === singleItem.displayValue &&
                          val.name === attribute.name
                      )[0] ? (
                        <button
                          key={itemIndex}
                          className="bg-black text-white mr-1 text-sm p-2"
                        >
                          {singleItem.displayValue}
                        </button>
                      ) : (
                        <button
                          key={itemIndex}
                          className={
                            "border-2 border-gray-400 mr-1 text-sm hover:opacity-75 p-2 "
                          }
                          onClick={() =>
                            changeValues(singleItem, attribute.name)
                          }
                        >
                          {singleItem.displayValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={attributeIndex} className="flex flex-col ">
                  <h3 className="font-bold ">{attribute.name}:</h3>
                  <div className="grid grid-cols-3 lg:grid-cols-5">
                    {attribute.items.map((singleItem, itemIndex) => {
                      return (
                        <button
                          key={itemIndex}
                          className="border-2 border-gray-400 mr-1 text-sm p-2 text-gray-500"
                        >
                          {singleItem.displayValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="">
          <button
            className="bg-green-400 w-full text-white h-14"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
        <div
          className="max-w-md"
          dangerouslySetInnerHTML={{ __html: product?.description as string }}
        ></div>
      </div>
    </div>
  );
};

export default Product;
