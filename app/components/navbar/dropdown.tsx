import { FC, Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useStore } from "../../store/store";
import * as types from "../../types/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type DropdownProps = {
  icon: string;
  items?: Array<types.Currency>;
};
const Dropdown: FC<DropdownProps> = ({ icon, items }) => {
  const { setCurrency, currency } = useStore();
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="flex  focus:outline-none focus:ring-2 focus:ring-offset-2 ">
          <span className="sr-only">Open user menu</span>
          <Image src={icon} width={30} height={30} alt="dollar-icon"></Image>
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
        <Menu.Items className="justify-center flex flex-col origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items?.map((item: types.Currency, index) => {
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => setCurrency(item)}
                    className={classNames(
                      currency.label === item.label ? "bg-gray-400" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.symbol} &nbsp; {item.label}
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
