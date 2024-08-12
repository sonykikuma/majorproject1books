import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWishlist = createAsyncThunk("wishlists/fetchWishlist", async()=>{
  const response = await axios.get("https://b-ebooksmajorproj1.vercel.app/wishlists/66b0c33dab00484b32ea4e1d")//here after wishlists it is predefined userId
  console.log(response)
  return response.data
})

export const addToWishlist = createAsyncThunk("wishlists/addToWishlist", async ({productId})=>{
  const res = await axios.post("https://b-ebooksmajorproj1.vercel.app/wishlists/66b0c33dab00484b32ea4e1d/items", {productId})
  return res.data
})

export const deleteWishlistItem = createAsyncThunk("wishlists/deleteWishlistItem", async (productId) => {
  await axios.delete(`https://b-ebooksmajorproj1.vercel.app/wishlists/66b0c33dab00484b32ea4e1d/items/${productId}`);
  return productId;
});


export const moveToCart = createAsyncThunk('wishlists/moveToCart', async (productId) => {
  const response = await axios.post(`https://b-ebooksmajorproj1.vercel.app/wishlists/66b0c33dab00484b32ea4e1d/items/${productId}/move-to-cart`);
  return productId
  //return response.data;
});



export const wishlistSlice = createSlice({
name:"wishlists",
  initialState:{
    wishlists:{
     items: [] },
    status:"idle",
    error:null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchWishlist.pending, (state)=>{
      state.status = "loading"
    })
    builder.addCase(fetchWishlist.fulfilled, (state, action)=>{
      state.status = "success"
      state.wishlists = action.payload
    })

    builder.addCase(fetchWishlist.rejected, (state, action) =>{
      state.status = "error";
      state.error = action.payload.message;
    })

    .addCase(addToWishlist.fulfilled, (state, action) => {
      state.wishlists.push(action.payload);
    });

    //for deleting product from wishlist
    builder.addCase(deleteWishlistItem.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteWishlistItem.fulfilled, (state, action) => {
      state.status = "success";
      state.wishlists.items = state.wishlists.items.filter(item => item.productId._id !== action.payload);
    });
    builder.addCase(deleteWishlistItem.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(moveToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(moveToCart.fulfilled, (state, action) => {
      state.status = "success";
      state.wishlists.items = state.wishlists.items.filter(item => item.productId._id !== action.payload);
    });
    builder.addCase(moveToCart.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

  }
  
})

export default wishlistSlice.reducer