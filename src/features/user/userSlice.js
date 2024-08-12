import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchUser = createAsyncThunk("user/fetchUser", async()=>{
  const res = await axios.get("https://b-ebooksmajorproj1.vercel.app/users/66b0c33dab00484b32ea4e1d")
  return res.data
})

export const userSlice = createSlice({
  name:"user",
  initialState:{
    user:{},
    status:"idle",
    error:null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.pending, (state)=>{
      state.status = "loading"
    })
    builder.addCase(fetchUser.fulfilled, (state, action)=>{
      state.status = "success"
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) =>{
      state.status = "error";
      state.error = action.payload.message;
    })

  }
})

export default userSlice.reducer

