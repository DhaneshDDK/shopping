import React from 'react'
import { useState, useEffect } from 'react';
import {SpinnerRoundOutlined} from 'spinners-react'
import Product from '../Components/Product';
import { useSelector } from 'react-redux';


const Home = () => {

    const {posts,loading} = useSelector((state)=>state.myproducts);

    

  return (
    <div>
       {
        loading ? 
              <SpinnerRoundOutlined  className=' mt-5 w-[100vw] mx-auto flex justify-center items-center'/>
             :  posts.length > 0 ? (
                     <div className="grid gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mt-10 mx-auto gap-5 ">
                       {
                        posts.map((post)=>{
                           return <Product key={post.id} post = {post} />
                        })
                       }
                     </div>
            ) : 
            
                <div className="flex justify-center items-center">
                        <p className='text-center text-[35px] font-bold mt-10'>No Data Found</p>
                </div>
            
       
       }
    </div>
  )
}

export default Home
