import React from 'react'
import { useState } from 'react';

import { useCart } from '@/context/CartContext';

type Props = {
    key : string
    title : string ,
    price : string , 
    image : string ,
    
    addToCart : any

}
export default function ProductCard ({title , price , image , addToCart} : Props) {

  return (  <div className=' w-72  flex flex-col  rounded-2xl p-4 text-white'>
        
            <img src={image} alt=""  className='w-full h-[60%] rounded-2xl'/>


            <div className='flex-1 p-1'>


                <p>{title}</p>

                <div>
                    <p className='font-bold '>Price : <span className='font-normal'>{price}</span></p>
                

                    <p></p>

                    <button className='submit-button' onClick={addToCart}>Add To Cart</button>

                </div>


            </div>






    </div>

)


}