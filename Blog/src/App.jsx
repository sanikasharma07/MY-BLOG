import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'
import {Header,Footer} from './components/index'
import './index.css'

function App() {
 
 const [loading,setLoading]=useState(true)
 const dispatch=useDispatch()
 useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
       dispatch(login(userData))
    }
    else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
 },[])
return !loading ? (
  <div className='min-h-screen flex flex-col bg-gray-400 overflow-x-hidden'>
    
    <Header />

    {/* The flex-grow here is the magic spring that pushes the footer down */}
    <main className="grow w-full">
      <Outlet />
    </main>

    <Footer />
    
  </div>
) : null
}

export default App
