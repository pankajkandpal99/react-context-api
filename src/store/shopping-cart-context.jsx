import { createContext } from "react";

// CartContext provide a object which will need later...
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
