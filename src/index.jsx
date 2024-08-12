import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import store from './app/store'
import App from './App'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/productDetail'
import Wishlist from './features/wishlist/Wishlist'
import Cart from './features/cart/Cart'
import AddressForm from './components/AddressForm'
import Checkout from './components/Checkout'
import OrderConfirm from './components/OrderConfirm'
import User from './features/user/User'


const router= createBrowserRouter([
	{path:"/", element:<App/>},
	{path:"/productList/:category", element:<ProductList/>},
	{path:"/products/:productId", element:<ProductDetail/>},
	{path:"/wishlists", element:<Wishlist/>},
	{path:"/cart", element:<Cart/>},
	{path:"/addresses/:addressId", element:<AddressForm/>},
	{path:"/addresses/new", element:<AddressForm/>},
	{path:"/checkout", element: <Checkout/>},
	{path:"/order-confirm", element:<OrderConfirm/>},

	{path:"/user", element:<User/>}
])
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		 <Provider store={store}> 
		<RouterProvider router={router} />
			 </Provider> 
	</React.StrictMode>
)