import useFetch from "../useFetch";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [alert, setAlert] = useState("");

  const productId = useParams();
  //console.log(productId)
  const productData = products?.find(
    (product) => product._id === productId.productId
  );
  // console.log(productData)

  const addToCartHandler = (productData) => {
    dispatch(addToCart(productData));
    setAlert("product added successfully!");

    setTimeout(() => {
      setAlert("");
      navigate("/cart");
    }, 2000);
  };

  const addToWishlistHandler = (productData) => {
    if (productData) {
      dispatch(addToWishlist({ productId: productData?._id }));
      setAlert("Product added to wishlist successfully!");

      setTimeout(() => {
        setAlert("");
        navigate("/wishlists");
      }, 1000);
    } else {
      console.error("Product data is undefined");
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        {status === "loading" && <p>fetching product detail...</p>}
        {error && <p>An error occured while fetching product detail</p>}
        {alert && <div className="alert alert-success mt-3">{alert}</div>}

        {productData && (
          <div className=" ">
            <h2 className="py-4 text-center">{productData.title}</h2>
            <div className="d-flex justify-content-center">
              <div className="card " style={{ width: "1000px" }}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <img
                      src={productData.coverImageUrl}
                      alt={productData.title}
                      className="img-fluid rounded-start"
                      style={{ minHeight: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div class="col-md-8 px-2 py-3 mt-5">
                    <p className="px-3">Author: {productData.author}</p>
                    <p className="px-3">
                      Year Published: {productData.publishedYear}
                    </p>
                    <p className="px-3">
                      Genre: {productData.genre.join(", ")}
                    </p>
                    <p className="px-3">Price: Rs.{productData.price}</p>
                    <p className="px-3">Summary: {productData.summary}</p>
                    <p className="px-3 mb-4">Rating: {productData.rating}</p>
                    <div className="d-flex justify-content-between px-3 pt-4 mt-5">
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCartHandler(productData)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => addToWishlistHandler(productData)}
                      >
                        Add to wishlist
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="card" style={{width: "20rem",}}>
 <div className="card-header">
        <img src={productData.coverImageUrl} alt={productData.title} className='img-fluid' style={{ height:"250px"}}/></div>
        <div className="card-body">
          <p>Author: {productData.author}</p>
          <p>Year Published: {productData.publishedYear}</p>
          <p>Genre: {productData.genre.join(", ")}</p>
          <p>Price: Rs.{productData.price}</p>
          <p>Summary: {productData.summary}</p>
          <p>Rating: {productData.rating}</p>
          <div className='d-flex justify-content-between'>
          <button className='btn btn-primary' onClick={()=>addToCartHandler(productData)}>Add to Cart</button>
          <button className='btn btn-secondary' onClick={()=>addToWishlistHandler(productData)}>Add to wishlist</button></div>
        </div>
      </div> */}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default ProductDetail;
