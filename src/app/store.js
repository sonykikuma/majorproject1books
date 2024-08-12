import {configureStore} from '@reduxjs/toolkit'
import {productSlice} from '../features/products/productSlice'
import {categorySlice} from '../features/category/categorySlice'
import {wishlistSlice} from '../features/wishlist/wishlistSlice'
import {cartSlice} from '../features/cart/cartSlice'
import {addressSlice} from '../features/address/addressSlice'
import {userSlice} from '../features/user/userSlice'

export default configureStore({
reducer:{
  products:productSlice.reducer,
  categories:categorySlice.reducer,
  wishlists: wishlistSlice.reducer,
  cart:cartSlice.reducer,
  addresses:addressSlice.reducer,
  user: userSlice.reducer
}
  
})