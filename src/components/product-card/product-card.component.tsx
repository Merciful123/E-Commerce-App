import { useDispatch, useSelector } from "react-redux";
import "./product-card.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CategoryItem } from "../../store/categories/category.type";
import { FC } from "react";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import { Card } from "antd";
const { Meta } = Card;

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  return (
    <div className="product-card-container">
      {/* <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        button-type={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add To Cart
      </Button> */}
      <Card
        className="card-global"
        hoverable
        style={
          {
            // marginTop: "6px",
            // width: 240,
          }
        }
        cover={<img alt={`${name}`} src={imageUrl} />}
        // actions={[
        //   <Button
        //     button-type={BUTTON_TYPE_CLASSES.inverted}
        //     onClick={addProductToCart}
        //   >
        //     Add To Cart
        //   </Button>,
        // ]}
      >
        <Meta title={name} description={`Price $${price}`} />
        <Button
          button-type={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add To Cart
        </Button>
      </Card>
    </div>
  );
};
export default ProductCard;
