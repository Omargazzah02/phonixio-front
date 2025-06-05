'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { json } from 'stream/consumers';

export default function RegisterPage ( ) {
    const router = useRouter ()
    const [formData , setFormData ] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : ''
    })

      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError (null)
        try {
            const res = await fetch('api/register' , {
                method : 'POST' ,
                headers: { 'Content-Type': 'application/json' },
               body : JSON.stringify(formData)



                
            })

            const data = await res.json()
            

            if (!res.ok ) {
                 const msg = Array.isArray(data.errors)
                 ? data.errors.map((err: any) => err.message).join(', ')
                 : 'Erreur inconnue';
                 setError(msg)
                 throw new Error(msg);
            }

            router.push('/login')



        }  catch (err : any ) {
                  setError(err.message || 'Erreur lors de l’inscription');

        } finally {
            setLoading(false);
        }
    }




    return (
       <main className='flex justify-center items-center w-full h-screen flex-col space-y-7'>

        <h1 className='title'>Register</h1>


        <form onSubmit={handleSubmit} className='form' >

            <div className='div-input'>

            <label> First Name
                
            </label>
                            <input  name='firstName' value={formData.firstName} onChange={handleChange} required/> 

</div>


            <div className='div-input'>
            
            <label> Last Name
             
            </label>

                <input  name='lastName' value={formData.lastName} onChange={handleChange}  /> 
</div>


                        <div className='div-input'>

            <label> Email
                
            </label>

                            <input type='email' name='email' value={formData.email} onChange={handleChange} required/> 

   </div>

            <div className='div-input'>

            
            <label> Password
            </label>

                            <input type='password' name='password' value={formData.password} onChange={handleChange} required/> 

</div>
       <button type="submit" disabled={loading} className='submit-button'>
          {loading ? 'Patiente...' : 'S’inscrire'}
        </button>

{error && (
  <div role="alert" >
    ⚠️ {error}
  </div>
)}

   <a href='/login' className='mini-href'>Login</a>
        </form>

       </main>

    )




}