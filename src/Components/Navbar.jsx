import React, { useEffect } from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import { NavLink, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { signout } from '../Services/ApiCalls/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
  const {cart} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(user,cart);
  const [modal,setModal] = useState(false);

  return (
    <div className=" bg-slate-900">
      <div className='flex items-center justify-between h-20 max-w-6xl mx-auto'>
            <NavLink to="/">
                 <div className="ml-5"> <img src="../logo.png" className="h-14" alt='img'/></div>
            </NavLink>
          

            <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
           
            {user && <NavLink to='/myproducts'> <p>Orders</p></NavLink>}
            

            <NavLink to="/cart">
              <div className="relative">
                  <FaShoppingCart className="text-2xl"/>
                  {
                    cart.length > 0 && user && 
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
                  }
                  
              </div>
            </NavLink>
             
             
            {!user && <NavLink to='/login' className="border-2  px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Login</NavLink>}
            {!user && <NavLink to='/signup' className="border-2  px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Signup</NavLink>}
            {user && <div onClick={()=>setModal(true)} className="border-2 cursor-pointer  px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Signout</div>}
            
          </div>
             

      </div>

      {
        modal &&
       <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
       
      <div className="w-11/12 flex flex-col items-center justify-center gap-8 max-w-[450px] rounded-lg border border-gray-950 bg-slate-800 p-6 py-12">
        <p className="text-2xl font-semibold text-white">
          Do u really want to signout
        </p>
       
        <div className="flex items-center gap-x-4">
      
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold  text-red-500 border-2"
            onClick= {()=>{signout(navigate,dispatch); setModal(false);}}
          >
            Signout
          </button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-green-300 border-2"
            onClick={()=>setModal(false)}
          >
            Cancel
          </button>
        </div>
       </div>

      </div>
      }
      
    </div>
  )
}

export default Navbar
