import {useDispatch, useSelector} from 'react-redux'
import {fetchCategories} from '../features/category/categorySlice'
import useFetch from '../useFetch'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'


const Category= ()=>{
  const dispatch = useDispatch()
  const categories = useSelector(state=> state.categories.categories)
  const status = useSelector(state=> state.categories.status)
  const error = useSelector(state=> state.categories.error)
  
                                        
    useEffect(()=>{
        dispatch(fetchCategories())
           },[dispatch])                            
console.log(categories)

  return(<div>
    {status === 'loading' && 'loading...'}
    {error && 'an error occurred in fetching.'}
    {categories && 
      <div className="row">
         {categories.map((category, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card">
            <img src={category.imageUrl} alt={category.name} style={{ width:"300px", height:"180px", objectFit:"cover"}} className='img-fluid'/>
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <Link to={`/productList/${category.name}`} className="btn btn-primary">View Products</Link>

              </div>
            </div>
          </div>
        ))} 
      </div>
    }
  </div>)
}
export default Category