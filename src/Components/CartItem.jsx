import React from 'react'
import {MdDelete} from "react-icons/md"
import { useDispatch } from "react-redux";
import { remove } from '../redux/Slices/cartSlice';
import { toast } from "react-hot-toast";


const CartItem = ({item, itemIndex, length}) => {
    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(remove(item));
        toast.success("Item Removed");
      }

  return (
     <div className='flex flex-col items-center p-2 md:p-5 justify-between   mt-2 mb-2 md:mx-5 '>
      
      <div className='flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center justify-center'>
       
        <div className='w-[30%]'>
          <img className='object-cover' src={item.image} alt='img' />
        </div>
        
        <div className='md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]'>
          <h1 className='text-xl text-slate-700 font-semibold'>{item.title}</h1>
          <h1 className='text-base text-slate-700 font-medium'>{item.description.slice(0,100)}...</h1>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-lg text-green-600'> ₹ {item.price*100}</p>
            <div className='bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3'
            onClick={removeFromCart}>
              <MdDelete/>
            </div>
          </div>

        </div>

</div>
       
       {
         itemIndex < length-1 && 
         <div className='w-[100%] h-[1px] bg-black my-2'></div>
    }  
 
      </div>


  )
}

export default CartItem
