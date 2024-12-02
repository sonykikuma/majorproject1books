import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { fetchWishlist, deleteWishlistItem, moveToCart } from "./wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlists = useSelector((state) => state.wishlists.wishlists);
  const status = useSelector((state) => state.wishlists.status);
  const error = useSelector((state) => state.wishlists.error);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const deleteHandler = (productId) => {
    dispatch(deleteWishlistItem(productId));
    setAlertMessage("Product removed successfully!");

    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  const movetocartHandler = async (productId) => {
    await dispatch(moveToCart(productId));
    setAlertMessage("Product added to cart successfully!");

    setTimeout(() => {
      setAlertMessage("");
      navigate("/cart");
    }, 2000);
  };

  const wishlistCount = wishlists.items?.length || 0;

  return (
    <>
      <Header />
      <div className="container py-3">
        <h1 className="pt-4 text-center">Wishlists({wishlistCount})</h1>
        <div className="mt-3">
          {status === "loading" && <p>fetching wishlist.....</p>}
          {error && <p>An error occured while fetching wishlist</p>}
          {alertMessage && (
            <div className="alert alert-success ">{alertMessage}</div>
          )}

          <div className="row mt-3">
            {wishlists?.items?.map((item) => (
              <div className="col-md-3" key={item?._id}>
                <Link
                  to={`/products/${item?.productId?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card mb-4">
                    <div className="card-header">
                      <img
                        src={item?.productId?.coverImageUrl}
                        alt="book image"
                        style={{
                          height: "450px",
                          objectFit: "cover",
                          width: "350px",
                        }}
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body">
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1, //here limiting summary to one line only
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item?.productId?.title}
                      </p>
                      <p>Author: {item?.productId?.author}</p>
                      <p>Rating: {item?.productId?.rating}</p>
                      <p>Genre: {item?.productId?.genre.join(", ")}</p>

                      <p>Price: Rs.{item?.productId?.price}</p>
                    </div>
                    <div className="container pb-3 d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => movetocartHandler(item?.productId?._id)}
                      >
                        Move to Cart
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteHandler(item?.productId?._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default Wishlist;
