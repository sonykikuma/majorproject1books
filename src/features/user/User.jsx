import {useDispatch, useSelector} from 'react-redux'
import {fetchUser} from './userSlice'
import Header from '../../components/Header'
import { useEffect } from 'react'

const User = ()=>{
const dispatch = useDispatch()
  const user = useSelector(state=> state.user.user)
  const status = useSelector(state=> state.user.status)
  const error = useSelector(state=> state.user.error)


useEffect(()=>{
  dispatch(fetchUser())
},[dispatch])
  console.log(user)
  return(<>
  <Header/>
    <div>
      {status === "loading" && <p>fetching user...</p>}
      {error && <p>An error occured while fetching user</p>}
    <div className='container py-4'>
      <h2 className='text-center mt-4'>User Profile</h2>
      <div className='d-flex justify-content-center mt-3'>
      <div className='card '>
        <div className=' px-3 pt-3'>
          <h4 className=''>Name:  {user.name}</h4>
        </div>
        <div className=' px-3'>
          <h4 className=''>Email:   {user.email}</h4>
        </div>
        <div className=' px-3'>
          <h4 className=''>Phone Number:{user.phoneNumber}</h4>

        </div>
        <div className=' px-3 '>
          <h4 className=''>Saved Addresses</h4>
          <ol className=''>
          {user.addresses?.map((address) => (
            <li key={address._id}>
              {address.addressLine1}, {address.city}, {address.state}, {address.postalCode}, {address.country}
            </li>
          ))}</ol>
        </div>
      </div>
      </div>
    </div>
      </div>
  </>)
}
 export default User