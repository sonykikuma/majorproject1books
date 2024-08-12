import React from 'react';
import { useNavigate } from 'react-router-dom';


const PriceDetails = ({ totalPrice, totalQuantity }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  
  return (
    <div className='card mt-4 p-3 '  >
      <h4>Price Details</h4>
      <div className='d-flex justify-content-between'>
        <p>Total Quantity:</p>
        <p>{totalQuantity} item(s)</p>
      </div>

      <div className='d-flex justify-content-between'>
        <p>Total Price:</p>
        <p>Rs. {totalPrice}</p>
      </div>
      <div className='d-flex justify-content-center'>
      <button className='btn btn-primary mt-3' style={{width:"18rem"}}
        onClick={handleCheckout}
        >Proceed to Checkout</button></div>
    </div>
  );
};

export default PriceDetails;
