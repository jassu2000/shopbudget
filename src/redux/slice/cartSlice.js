import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs-extra';
import { toast } from 'react-toastify';

const initialState = {
    cartItems : localStorage.getItem("cartItems") ? 
                JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    previousURL: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action){
        console.log(action.payload);
        const productIndex = state.cartItems.findIndex((item) => 
        item.id === action.payload.id)

        if(productIndex >= 0){
            //Item already exist in the cart 
            //Increase the cart count
            state.cartItems[productIndex].cartQuantity += 1
            toast.info(`${action.payload.name} increased by 1`, {position: "top-left"})
        }
        else{
            //Item doen't exist in the cart 
            // Add item to the cart
            const tempProduct = {...action.payload, cartQuantity: 1 };
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.name} added to the cart successfully`, {position: "top-left"})
        }

        //save to Local Storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state,action){
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex((item) => 
        item.id === action.payload.id)
      
      if(state.cartItems[productIndex].cartQuantity > 1){
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by 1`, {position: "top-left"})
      }
      else if(state.cartItems[productIndex].cartQuantity === 1){
        const newCartItem = state.cartItems.filter((item) =>
        item.id !==            action.payload.id)
        state.cartItems = newCartItem
        toast.success(`${action.payload.name} removed from cart`, {position:"top-left"})
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    },

    REMOVE_FROM_CART(state, action){
      console.log(action.payload);
      const newCartItem = state.cartItems.filter((item) =>
        item.id !== action.payload.id)
        state.cartItems = newCartItem
        toast.success(`${action.payload.name} removed from cart`, {position:"top-left"})
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
      CLEAR_CART(state,action){
        console.log(action.payload);
        state.cartItems = [];
        toast.info(`Cart cleared`, {position:"top-left"})
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
      CALCULATE_SUBTOTAL(state, action){
        console.log(action.payload);
        const array = []
        state.cartItems.map((item) =>{
          const {price, cartQuantity} = item;
          const cartItemAmount = price*cartQuantity;
          console.log(cartItemAmount);
          return array.push(cartItemAmount);
        })
        const totalAmount = array.reduce((a,b) =>{
          return a+b;
        },0)
        console.log(totalAmount);
        state.cartTotalAmount = totalAmount;
      },
      CALCULATE_TOTAL_QUANTITY(state,action){
        console.log(action.payload);
        const array = [];
        state.cartItems.map((item) =>{
          const {cartQuantity} = item;
          const quantity = cartQuantity;
          return array.push(quantity);
        });
        const totalQuantity = array.reduce((a,b) =>{
          return a+b;
        },0);
        state.cartTotalQuantity = totalQuantity;
      },
      SAVE_URL(state,action){
        state.previousURL = action.payload;
      },
  }
});

export const {ADD_TO_CART,DECREASE_CART,REMOVE_FROM_CART,CLEAR_CART,CALCULATE_SUBTOTAL,
CALCULATE_TOTAL_QUANTITY,SAVE_URL} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) =>state.cart.previousURL;
export default cartSlice.reducer