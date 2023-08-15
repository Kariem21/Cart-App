import { createSlice } from "@reduxjs/toolkit";

export const CartSlice= createSlice({
    initialState:[],
    name:"CartSlice",
    reducers:{
        addToCart:(state,action)=>{
             
            const foundProduct =  state.find((product)=> product.id === action.payload.id);
            if(foundProduct){
                foundProduct.quantity+=1;

            }
            else{

                const productClone= {...action.payload,quantity:1}
                state.push(productClone);
            }
            localStorage.setItem("cart", JSON.stringify(state));

        },
        removeFromCart:(state,action)=>{
            const removed = state.filter((product)=>product.id!==action.payload.id);
            localStorage.setItem("cart", JSON.stringify(removed));
            return removed;

            
        },
        clear:(state,action)=>{
            return []
        },
        updateQuantityPlus: (state, action) => {
            const { id } = action.payload;
            const updatePlus = state.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatePlus));
            return updatePlus

            
        },
        updateQuantityMinus: (state, action) => {
            const { id  } = action.payload;
            const updateMinus =  state.map(item => 
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            localStorage.setItem("cart", JSON.stringify(updateMinus));
            return updateMinus;

        },
         isProductInCart : (state, action) => {
            // return state.filter(cartItem => cartItem.id === action.payload.id);
            return state.find((product)=> product.id === action.payload.id);
        }
        

    }
})

export const {addToCart,removeFromCart,clear,handlePrice,updateQuantityPlus,updateQuantityMinus,isProductInCart} = CartSlice.actions;
export default CartSlice.reducer