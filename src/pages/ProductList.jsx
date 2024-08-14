import {useParams, useNavigate, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts, resetSort} from '../features/products/productSlice'
import {useEffect, useState} from 'react'
import {addToWishlist} from '../features/wishlist/wishlistSlice'
import {addToCart} from '../features/cart/cartSlice'
import Header from '../components/Header'
import Filter from '../components/Filter'
import {Link} from 'react-router-dom'

const ProductList = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {category} = useParams()
  const location = useLocation()
const products = useSelector(state=> state.products.products)
const status = useSelector(state=> state.products.status)
  const error = useSelector(state=> state.products.error)
  const sortBy = useSelector(state=> state.products.sortBy)
  const [alertMessage, setAlertMessage] = useState('');

  
  useEffect(()=>{dispatch(fetchProducts()) },[])                          
               
const [filterByRating, setFilterByRating] = useState(0)
  const [checkboxFilter, setCheckboxFilter] = useState([])
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  //search functionality
const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('query') || ''
  console.log('Search Term:', searchTerm); 

  
  
const handlePriceFilterChange =(e)=>{
  const {value}= e.target
  setSelectedPriceFilters(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
}


  // const filteredBooks = products?.filter((book) =>  book?.title.toLowerCase().includes(searchTerm.toLowerCase()))// for searching 
  
  // const filteredBooks = products?.filter((book) => book?.genre.includes(category) ) //for filtering based on category directed from homepage


  const filteredBooks = products?.filter(book => {
    let isMatch = true;
    if (category) {
      isMatch = book?.genre.includes(category);
    }
    if (searchTerm) {
      isMatch = book?.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return isMatch;
  });


  
  
  const handleChangeCheckbox= (e)=>{
    const {value,checked} = e.target
    if(checked){
        setCheckboxFilter(prev=> [...prev,value])
    } else {
        setCheckboxFilter(prevVal => prevVal.filter(book => book != value))
    }
  }
  
  const filterBooksByCheckbox = checkboxFilter.length === 0 ? products: products?.filter(book=> checkboxFilter.some(genre=> book.genre.includes(genre)))


const filterBooksByRating = filterBooksByCheckbox?.filter(book=>book.rating >= filterByRating)
  
const handleRatingChange =(e)=>{
  setFilterByRating(e.target.value)
}
  
  const handleClearFilter=()=>{
    setCheckboxFilter([])
    setFilterByRating(0)
    setSelectedPriceFilters([])
    dispatch(resetSort())
  }


const addToCartHandler=(book)=>{
  dispatch(addToCart(book))
  setAlertMessage("Product added to cart successfully!")

  setTimeout(()=>{
    setAlertMessage('')
    navigate("/cart")
  }, 2000)

}
  const addToWishlistHandler=(book)=>{
    dispatch(addToWishlist({productId: book?._id}))
    setAlertMessage("Product added successfully!")

    setTimeout(()=>{
      setAlertMessage('')
    navigate("/wishlists")
    }, 2000)

  }


  const filterBooksByPrice = filterBooksByRating?.filter(book=>{
    if(selectedPriceFilters.length === 0) return true;
    if (selectedPriceFilters.includes('below500') && book.price < 500) return true;
    if (selectedPriceFilters.includes('500to1000') && book.price >= 500 && book.price < 1000) return true;
    if (selectedPriceFilters.includes('above1000') && book.price >= 1000) return true;
    return false;
  })


const sortedBooks = filterBooksByPrice?.sort((a,b)=>{
  if(sortBy === "lowtohigh"){
    return a.price - b.price
  } else if(sortBy === "hightolow"){
    return b.price - a.price
  } else {
    return 0
  }
})
  
  return(<>
    <Header/>
    <main className=" ">
      <div className='row '>
      
      {/* filter
 */}

<Filter
  checkboxFilter={checkboxFilter}
  handleChangeCheckbox={handleChangeCheckbox}
  handleClearFilter={handleClearFilter}
  filterByRating={filterByRating}
  handleRatingChange={handleRatingChange}
  handlePriceFilterChange={handlePriceFilterChange}
  selectedPriceFilters={selectedPriceFilters}
  />
      {/* category books */}
    <div className="col-md-9  py-4  mt-2 ">
      <div className='container'>
        {alertMessage && <div className="alert alert-success mt-3">{alertMessage}</div>} 

       <h2>Books in {category}</h2>
       <div className="row">
        {filteredBooks?.map((book, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <div className="d-flex justify-content-center card-header">
                <Link to={`/products/${book._id}`} style={{textDecoration:"none"}}>

              <img src={book.coverImageUrl} className="card-img-top img-fluid" alt={book.title} style={{objectFit:"cover", height:"300px", width:"250px"}} /></Link> </div>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.summary}</p>
                <p className="card-text"><small className="text-muted">Rating: {book.rating}</small></p>
                <div className='d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={()=>addToCartHandler(book)}>Add to Cart</button>
                <button className='btn btn-secondary' onClick={()=>addToWishlistHandler(book)}>Add to wishlist</button></div>
              </div>
            </div>
          </div>
        ))}
    </div> 


      {/* all books */}
      <div>
        {status === 'loading' && 'loading....'}
        {error && 'an error occured while fetching data'}

        {filterBooksByPrice && <div>
          <h2> Showing All Books ({filterBooksByPrice.length})</h2>
          <div className='row'>
            {sortedBooks.map(book=> (
  <div className='col-md-4 mb-4' key={book._id}>

    <div className="card">
    <div className="card-header">
      <Link to={`/products/${book._id}`} style={{textDecoration:"none"}}>

      <img src={book.coverImageUrl} alt={book.title} className='img-fluid' style={{objectFit:"cover", width:"250px", height:"300px"}}/></Link> 
    </div>
      <div className="card-body">
        <p>Author: {book.author}</p>
        <p>Year Published: {book.publishedYear}</p>
        <p>Genre: {book.genre.join(", ")}</p>
        <p>Summary: {book.summary}</p>
        <p>Rating: {book.rating}</p>
        <div className='d-flex justify-content-between'>
        <button className='btn btn-primary' onClick={()=>addToCartHandler(book)}>Add to Cart</button>
        <button className='btn btn-secondary' onClick={()=>addToWishlistHandler(book)}>Add to wishlist</button></div>
      </div>
    </div>
  </div>
            ))}
          </div>
        </div>}
      </div>
        </div>
    </div>
      </div></main>
  </>)
}
export default ProductList


