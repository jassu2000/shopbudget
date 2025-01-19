import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory:[],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers:{
    STORE_ORDERS(state,action) {
      console.log(action.payload);
      state.orderHistory = action.payload;
      console.log(`Order History: ${JSON.stringify(state.orderHistory)}`);
    },
    CALC_TOTAL_ORDER_AMOUNT(state,action){
      console.log(`Order Payload for amount: ${JSON.stringify(action.payload)}`);
      const array = [];
        state.orderHistory.map((item) =>{
          const {orderAmount} = item;
          console.log(orderAmount);
          return array.push(orderAmount);
        });
        const totalAmount = array.reduce((a,b) =>{
          return a+b;
        },0);
        console.log(`Total Order Amount: ${totalAmount}`);
        state.totalOrderAmount = totalAmount;
      console.log(`Total Order Amount final: ${state.totalOrderAmount}`);
    },
  },
});
export const { STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer;
