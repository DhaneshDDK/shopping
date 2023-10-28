import React from 'react'

const BougtItem = (item) => {
    console.log(item.item.item)
  return (
    <div className='w-[80%] h-24 border-2 relative border-slate-900 bg-gray-100 rounded-lg px-4 py-2 flex items-center justify-between gap-2'>

        <div className='flex items-start gap-x-4 w-[50%]'>
        <img src={item.item.item?.image} alt="Its a image" width={50} className=' rounded-md'/>
        <div className='text-[16px] font-semibold'>{item.item.item?.title}</div>
        </div>
        
        <div className='flex flex-col gap-y-2 items-center justify-center w-[25%]'>
        <div className='text-[16px] font-semibold text-gray-500'>Price:</div>
        <div  className='text-[16px] font-semibold'>₹ {item.item.item?.price}</div>
        </div>
           
        <div className='flex flex-col gap-y-2 items-center justify-center w-[25%]'>
        <div  className='text-[16px] font-semibold text-gray-500'>No of orders:</div>
        <div  className='text-[16px] font-semibold'>{item.item?.count}</div>
        </div>
           
           
       
    </div>
  )
}

export default BougtItem
