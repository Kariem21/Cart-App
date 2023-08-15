import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchproducts = createAsyncThunk("ProductSlice/fetchProducts", async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
});
export const searchProducts = createAsyncThunk("ProductSlice/searchProducts", async (name) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${name}`);
    const data = await res.json();
    return data.cart;
})

const ProductSlice = createSlice({
    initialState: [],
    name: "ProductSlice",
    reducers: {

    },
   extraReducers: (builder) => {
        builder
            .addCase(fetchproducts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                return action.payload;
            });
    }
})

export const { } = ProductSlice.actions;
export default ProductSlice.reducer