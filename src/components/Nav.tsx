
'use client'
import React, { use }  from "react"
import { useRouter } from 'next/navigation';



type Props = {
    username : string 
}

export default function Nav ({username} : Props) {

    const router = useRouter()


  const handleLogout = async () => {
    await fetch('/api/signout', { method: 'POST' });
    router.push('/login')
    
  };
    return ( <div className="w-full p-4 px-10 ">

        <div className="w-full  flex items-center justify-between">
           <div> <img src="/images/logo-mobelixy.png" alt="" className="w-20"/></div>

           <ul className=" flex  justify-between  space-x-16">
            <li>
          <a href="">Home</a>
            </li>



            <li>


        <a href="">About</a>

            </li>

            <li>

                <a href="">Services</a>

            </li>

            <li>

                <a href="">Products

                </a>
            </li>

            <li>
                <a href="">
                    Gallery


                </a>
            </li>

            <li>
                <a href="">Contact</a>
            </li>
           </ul>
 


<div className="flex space-x-10">
    
        <div className="flex flex-col items-center text-white">          <img src="/images/user_icone.png" alt="" className="w-10" />

        <p>{username}</p>

</div>

<button onClick={handleLogout} className="button-signout">
    Sign Out

</button>
</div>




           
        </div>

    </div>

    )
    

    
}