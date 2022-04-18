import { CategoryItem } from "../categories/category.type";

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
  SET_CART_TOTOAL = "cart/SET_CART_TOTAL",
}

export type CartItem = {
  quantity: number;
} & CategoryItem;
