import { useStore } from "../../store/store";
import CartItem from "./cartItem";
const Cart = () => {
  const { cart } = useStore();
  return (
    <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-xl space-y-10 ">
      <hr />
      {cart.map((cartItem) => (
        <div key={cartItem.id} className="">
          <CartItem cartItem={cartItem} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Cart;
