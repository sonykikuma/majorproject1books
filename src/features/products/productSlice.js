import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
  const response = await axios.get('https://b-ebooksmajorproj1.vercel.app/products',)

 // console.log(response)
  return response.data
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async ()=>{
  const response = await axios.get('https://b-ebooksmajorproj1.vercel.app/categories',)
  return response.data
})

export const productSlice = createSlice({
  name:"products",
  initialState:{
    products:[],
    status:"idle",
    error:null,
    sortBy:"none"
  },
  reducers:{
    setSortBy:(state, action)=>{
      state.sortBy = action.payload
    },
    resetSort:(state)=>{
      state.sortBy = "none"
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending, (state)=>{
      state.status = "loading"
    })
    builder.addCase(fetchProducts.fulfilled, (state, action)=>{
      state.status = "success"
      state.products = action.payload
    })

    builder.addCase(fetchProducts.rejected, (state, action) =>{
      state.status = "error";
      state.error = action.payload.message;
    })

  }
})

export const {setSortBy, resetSort} = productSlice.actions

export default productSlice.reducer