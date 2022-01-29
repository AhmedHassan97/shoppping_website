import { FC, Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useStore } from "../../store/store";
import Image from "next/image";
import Dropdown from "./dropdown";
import CartItem from "./cart/cartItem";
import { useCategories, useCategory, useCurrency } from "../../hooks/useApi";
import * as types from "../../types/types";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: FC = () => {
  const { error, data, loading } = useCategories();
  const { currencies, loadingCurrencies, errorCurrency } = useCurrency();
  const [total, setTotal] = useState<number>(0);
  const { category, setCategory, cart, currency } = useStore();
  const { getCategory } = useCategory();
  const router = useRouter();
  const onSelectCategory = (category: types.Category) => {
    setCategory(category);
    getCategory(category);
    if (router.pathname !== "/") {
      router.push("/");
    }
  };
  useEffect(() => {
    let totalAmount = 0;
    cart.map((cartItem) => {
      totalAmount += parseFloat(
        cartItem.prices.filter(
          (price) => price.currency.label === currency.label
        )[0].amount
      );
    });
    setTotal(totalAmount);
  }, [cart, currency]);
  if (loading || loadingCurrencies) {
    return <div>Loading ...</div>;
  } else if (error || errorCurrency) {
    return (
      <div className="flex flex-row font-bold text-2xl justify-center align-middle">
        Server is down
      </div>
    );
  } else {
    return (
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto">
              <div className="relative flex items-center justify- h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* 1 */}
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-2">
                      {data.categories?.map((item: types.Category) => (
                        <button
                          key={item.name}
                          onClick={() => onSelectCategory(item)}
                          className={classNames(
                            item.name === category?.name
                              ? "text-green-600 underline underline-offset-8 "
                              : "text-black  hover:text-green-600",
                            "px-3 py-2 rounded-md font-medium text-lg"
                          )}
                          aria-current={
                            item.name === category?.name ? "page" : undefined
                          }
                        >
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex">
                  <Image
                    src="/Group1.svg"
                    alt="market-icon"
                    width={30}
                    height={30}
                  />{" "}
                </div>
                {/* 3 */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Dropdown icon="/Group2.svg" items={currencies.currencies} />
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          src="/Group3.svg"
                          width={30}
                          height={30}
                          alt="dollar-icon"
                        ></Image>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="space-y-5 origin-top-right z-50 absolute right-0 mt-2 w-96 p-4 py-4 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <h1 className="font-bold">My Bag,&nbsp;</h1>
                            <h3>&nbsp;{cart.length}&nbsp; items</h3>
                          </div>
                        </div>
                        {cart?.map((cartItem) => {
                          return (
                            <Menu.Item key={cartItem.id}>
                              <CartItem cartItem={cartItem} />
                            </Menu.Item>
                          );
                        })}
                        <div className="flex flex-row">
                          <h3 className="font-semibold">Total</h3>
                          <h4 className="ml-auto">
                            {currency.symbol}&nbsp;
                            {total}
                          </h4>
                        </div>
                        <div className="flex flex-row space-x-2">
                          <button
                            className="border-black border-2 w-1/2"
                            onClick={() => router.push("/cart")}
                          >
                            VIEW BAG
                          </button>
                          <button className=" w-1/2 bg-green-400 text-white">
                            CHECK OUT
                          </button>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {data.categories?.map((item: types.Category) => (
                  <Disclosure.Button
                    key={item.name}
                    onClickCapture={() => onSelectCategory(item)}
                    className={classNames(
                      item.name === category?.name
                        ? "text-green-600 underline underline-offset-8 "
                        : "text-black  hover:text-green-600",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={
                      item.name === category?.name ? "page" : undefined
                    }
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
};
export default Navbar;
