import React from 'react';
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Header from './Header'


const Checkout = ()=>{
  const navigate= useNavigate()
  const  addresses = useSelector((state) => state.addresses.addresses);
  const selectedAddressId = useSelector(state=> state.addresses.selectedAddressId)
const cart = useSelector(state=> state.cart.cart)

  const selectedAddress = addresses.find(address=> address._id === selectedAddressId)

  const totalPrice = cart.items.reduce((acc, curr)=>{
    return acc + curr.productId.price * curr.quantity
  }, 0)




  return(<>
  <Header/>
    <div className='container py-4'>
    <h2>Order Summary</h2>
      {selectedAddress &&  selectedAddress ? (<>
      <div className='card p-3 m-3 ' >
        <h4>Deliver here</h4>
        <p>{selectedAddress.addressLine1}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}, {selectedAddress.country}</p>
      </div>
      <div className='card p-3 my-3 '>
        <h4>Cart Items</h4>
        {cart.items.map(item => (
          <div key={item._id} className='d-flex justify-content-between'>
            <p>{item.productId.title} - {item.quantity} x Rs.{item.productId.price}</p>
            <p>Rs. {item.quantity * item.productId.price}</p>
          </div>
        ))}
      </div>
      <div className='card p-3 my-3'>
        <h4>Total Price: Rs. {totalPrice}</h4>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
      <button className='btn btn-primary' onClick={() => navigate('/order-confirm')}>Confirm Order</button> 
      <Link to="/cart" className='btn btn-primary'>Want to Re-check</Link>
        </div></>):(<div><p className='container py-4'>No address selected. Please select an address and try again.</p>
        <Link to="/cart" className='btn btn-primary'>Back to Cart</Link>
        </div>)}
    </div>
  
  </>)
}
export default Checkout