import { useState } from "react";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
import { DUMMY_PRODUCTS } from "./dummy-products";
import { CartContext } from "./store/shopping-cart-context";

function App() {
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  const handleUpdateCartItemQuantity = (productId, amount) => {
    // console.log(productId, amount);
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        // If quantity is zero or less, remove the item from the array
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  };

  const handleAddItemToCart = (id) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };

        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  };

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  // Context API ka Provider ek React component hai jo ek context ko provide karta hai. Context ek tarah ka global state hota hai jo aap apne React tree ke bade hisse mein share kar sakte hain. Jab aap kisi component mein ek Context ka Provider define karte hain, toh us component aur uske sab children (descendant) components us context ke values ko access kar sakte hain.
  return (
    <CartContext.Provider value={ctxValue}>
      <Header />

      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
