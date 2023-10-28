import React from 'react'
import { useEffect } from 'react'
import apiConnector from '../Services/ApiConnector';
import { apiEndPoints } from '../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {SpinnerRoundOutlined} from 'spinners-react'
import BougtItem from '../Components/BougtItem';
import { setLoading } from '../redux/Slices/MyProductsSlice';

const {FETCHPRODUCTS_API} = apiEndPoints;

const MyProducts = () => {

    const user = useSelector((state)=>state.auth);
    const {posts,loading} = useSelector((state)=>state.myproducts);
    const [data, setData] = useState([]);
    const email = user.user.email;
    const dispatch = useDispatch();

    const fetchProducts = async (email)=>{
        dispatch(setLoading(true));
        let res = await apiConnector("post",FETCHPRODUCTS_API,{email});
        res = res.data.data.products;
        setData(res);
        dispatch(setLoading(false));
        
        const data = res;
        // console.log(data)
          const newData = {};
          data.forEach((ele)=>{
            if(newData[ele]) newData[ele] += 1;
             else newData[ele] = 1;
          })

          let items = [];
          
          for(let key in newData){
            // console.log(posts[key-1])
             let obj = {
                count : newData[key],   
                item : posts[key-1]
             };
             items.push(obj);
          }

          setData(items);  
        //  console.log(items)
      
    }


    useEffect( ()=>{
        fetchProducts(email); 
    },[posts]);

    
  

  return (
    <div>
        {
            loading ? 
              <SpinnerRoundOutlined  className=' mt-5 w-[100vw] mx-auto flex justify-center items-center'/>
             :  data.length > 0 ? (
                     <div className="flex flex-col gap-y-8 items-center justify-center mt-10">
                         { 
                            data.map((item,id)=>{
                            return <BougtItem item={item} key={id} />
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

export default MyProducts
