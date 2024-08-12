import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async ()=>{
  const response = await axios.get('https://b-ebooksmajorproj1.vercel.app/categories',)
  return response.data
})

export const categorySlice = createSlice({
  name:"categories",
  initialState:{
    categories:[],
    status:"idle",
    error:null
  }, 
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }

})

export default categorySlice.reducer