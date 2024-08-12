import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchCart = createAsyncThunk("cart/fetchCart", async ()=>{
  const res = await axios.get("https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d")
  return res.data
})

export const addToCart = createAsyncThunk("cart/addToCart", async(productData)=>{
  const res = await axios.post(`https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d/items`,{
    productId: productData._id,
      quantity: 1
  })
  return res.data
})


export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async (productId) => {
  const response = await axios.post(`https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d/items/${productId}/increase`);
  return response.data;
});

export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async (productId) => {
  const response = await axios.post(`https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d/items/${productId}/decrease`);
  return response.data;
});


export const movetoWishlist = createAsyncThunk('cart/movetoWishlist', async(productId)=>{
  const res = await axios.post(`https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d/items/${productId}/wishlist`)
    return res.data
})


export const deleteitemfromCart = createAsyncThunk('cart/deleteitemfromCart', async(productId)=>{
  const res = await axios.delete(`https://b-ebooksmajorproj1.vercel.app/carts/66b0c33dab00484b32ea4e1d/items/${productId}`)
  return res.data
})
  
export const cartSlice = createSlice({
name:"cart",
  initialState:{
    cart:{
      items:[],
    },
    status:"idle",
    error:null
  },
  reducers:{
    incrementQuantity: (state, action) => {
      const item = state.cart.items.find(item => item.productId._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.items.find((item) => item.productId._id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cart.items = state.cart.items.filter((i) => i.productId._id !== action.payload);
        }
      }
    },

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchCart.pending, (state)=>{
      state.status = "loading"
    })
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      state.status = "success"
      state.cart = action.payload
    })

    builder.addCase(fetchCart.rejected, (state, action) =>{
      state.status = "error";
      state.error = action.payload.message;
    })

    .addCase(addToCart.fulfilled, (state, action) => {
      state.cart.push(action.payload);
    })
    
    .addCase(increaseQuantity.fulfilled, (state, action) => {
      const item = state.cart.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    })
    .addCase(decreaseQuantity.fulfilled, (state, action) => {
      const item = state.cart.items.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    })
    .addCase(movetoWishlist.fulfilled, (state, action) => {
      state.cart.items = state.cart.items.filter(item => item.productId._id !== action.meta.arg);
      //item.productId._id !== action.payload);here result is not updated instantly and on refreshing it was updating so used meta.arg instead of payload
    })
    .addCase(deleteitemfromCart.fulfilled, (state, action) => {
      state.cart.items = state.cart.items.filter(item => item.productId._id !== action.meta.arg);
        //item.productId._id !== action.payload);
    });

  }
  
})

export const {incrementQuantity, decrementQuantity} = cartSlice.actions

export default cartSlice.reducer