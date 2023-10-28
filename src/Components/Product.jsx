import React from 'react'
import { toast } from 'react-hot-toast'
import { remove, add } from '../redux/Slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Product = ({post}) => {

  
  const cart = useSelector((state) => state.cart.cart);
  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [readmore, setreadmore] = useState(false);
  const navigate = useNavigate();

  const addToCart = () => { 
    if(!user) navigate('/login');
   else { dispatch(add(post));
    toast.success("Item added to Cart");
   }
  }

  const removeFromCart = () => {
    if(!user) navigate('/login');
    else {
    dispatch(remove(post));
    toast.error("Item removed from Cart");
    }
  }
 

  return (
    <div className="flex flex-col items-center justify-between group
    hover:scale-105 transition duration-300 ease-in gap-3 p-4 mx-4 md:mx-0 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_#00000024]">
       <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{
          readmore ? (post.description)
          : (post.description.split(" ").slice(0,10).join(" ") )
        }
        <span onClick={()=>{
          let val = !readmore; setreadmore(val);
        }} className=' text-blue-600 cursor-pointer'>{readmore ? "... readless" : "... readmore"}</span>
        </p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} className="h-full w-full "  alt='img'/>
      </div>



      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">₹ {post.price*100}</p>
        </div>
        
        {
          cart.some((p) => p.id === post.id) ?
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
           group-hover:bg-gray-700
          group-hover:text-white transition duration-300 ease-in"
          onClick={removeFromCart}>
            Remove Item
          </button>) :
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          group-hover:bg-gray-700
          group-hover:text-white transition duration-300 ease-in"
          onClick={addToCart}>
            Add to Cart
          </button>)
        }
      </div>

    </div>
  )
}

export default Product
