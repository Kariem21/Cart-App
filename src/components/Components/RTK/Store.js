


import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../Slices/ProductSlice'
import CartSlice from '../Slices/CartSlice'
const savedCartState = localStorage.getItem("cart");
const initialCartState = savedCartState ? JSON.parse(savedCartState) : [];

export default configureStore({
  reducer: {
    products: ProductSlice,
    cart: CartSlice
  },
  preloadedState: {
    cart: initialCartState,
  },
})