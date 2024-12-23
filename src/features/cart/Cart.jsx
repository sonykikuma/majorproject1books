import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  deleteitemfromCart,
  movetoWishlist,
} from "../../features/cart/cartSlice";
import PriceDetails from "../../components/PriceDetails";
import Header from "../../components/Header";
import Address from "../../features/address/Address";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    dispatch({ type: "cart/incrementQuantity", payload: productId });
    dispatch(increaseQuantity(productId));
    setAlertMessage("Product incremented successfully!");
    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  const handleDecrement = (productId) => {
    dispatch({ type: "cart/decrementQuantity", payload: productId });
    dispatch(decreaseQuantity(productId));
    setAlertMessage("Product decremented successfully!");
    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  const movetowishlistHandler = async (productId) => {
    await dispatch(movetoWishlist(productId));
    setAlertMessage("Product added successfully!");

    setTimeout(() => {
      setAlertMessage("");
      navigate("/wishlists");
    }, 2000);
  };

  const deleteHandler = (productId) => {
    dispatch(deleteitemfromCart(productId));
    setAlertMessage("Product deleted successfully");

    setTimeout(() => {
      setAlertMessage("");
    }, 1000);
  };

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item?.productId?.price * item?.quantity;
  }, 0);

  const totalQuantity = cart?.items?.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <>
      <Header />
      <div className="container py-3 mt-3">
        <h2 className="text-center pt-4 ">
          My Cart ({cart.items && cart.items.length})
        </h2>
        {status === "loading" && <p>fetching cart.....</p>}
        {error && <p>An error occured while fetching cart</p>}
        {alertMessage && (
          <div className="alert alert-success">{alertMessage}</div>
        )}
        {cart.items?.length === 0 ? (
          <div className="text-center my-5">
            <h4>Your cart is empty!</h4>
            <p>Please add items to your cart.</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.items?.map((item) => (
                <div className=" " key={item?._id}>
                  <div className="card mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="m-1  col-md-6 text-center">
                        <div className="py-1">
                          <img
                            className="img-fluid "
                            src={item?.productId?.coverImageUrl}
                            alt="cover image"
                            style={{
                              objectFit: "cover",
                              height: "300px",
                              width: "250px",
                            }}
                          />
                        </div>
                        <div className="">
                          <strong>{item?.productId?.title}</strong>
                          <br />
                          {item?.productId?.author}
                        </div>
                      </div>

                      <div className="m-1  col-md-6">
                        <p>Price: Rs.{item?.productId?.price}</p>
                        <p>
                          {" "}
                          Quantity: {item?.quantity}{" "}
                          <button
                            onClick={() =>
                              handleIncrement(item?.productId?._id)
                            }
                          >
                            {" "}
                            +{" "}
                          </button>{" "}
                          <button
                            onClick={() =>
                              handleDecrement(item?.productId?._id)
                            }
                          >
                            {" "}
                            -{" "}
                          </button>
                        </p>
                        <div className="">
                          <button
                            onClick={() =>
                              movetowishlistHandler(item?.productId?._id)
                            }
                            className="btn btn-primary"
                          >
                            Move to wishlist
                          </button>
                          <button
                            onClick={() => deleteHandler(item?.productId?._id)}
                            className="ms-2 btn btn-danger mt-1"
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className=" ">
                <Address />
              </div>
              <div className="">
                {" "}
                <PriceDetails
                  totalQuantity={totalQuantity}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
          </div>
        )}
        {/* <div className="container d-flex justify-content-between ">
          <div className="col-md-4 ">
            <Address />
          </div>
          {/* PriceDetails component */}

        {/* <div className="col-md-4 ps-2">
            {" "}
            <PriceDetails
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Cart;
