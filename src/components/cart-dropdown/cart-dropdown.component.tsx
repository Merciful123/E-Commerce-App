import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownConatainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useCallback } from "react";

// const sleep = (milliseconds: number): void => {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if (new Date().getTime() - start > milliseconds) {
//       break;
//     }
//   }
// };

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  // const [count, setCount] = useState(0);

  // const hundredCount = useMemo(() => {
  //   console.log("start");
  //   sleep(2000);
  //   console.log("end");
  //   return 100 + count;
  // }, [count]);

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, []);

  return (
    <CartDropdownConatainer>
      <CartItems>
        {/* {hundredCount} */}
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your Cart Is Empty. Add Items To Cart</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownConatainer>
  );
};
export default CartDropdown;
