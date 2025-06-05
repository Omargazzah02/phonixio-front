'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
         credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = Array.isArray(data.errors)
          ? data.errors.map((err: any) => err.message).join(', ')
          : 'Identifiants invalides';
        throw new Error(msg);
      }



      router.push('/products');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main  className='flex justify-center items-center w-full h-screen flex-col space-y-7'>
      <img src="/images/logo-mobelixy.png" alt=""  className='w-32'/>
      <h1 className='title'>Connexion</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='div-input'>

          <label>
          Email
        </label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />


        </div>


                <div className='div-input'>

        <label>
          Mot de passe
        </label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />


          </div>
        <button type="submit" disabled={loading} className='submit-button' >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <a href='/register' className='mini-href' > Register</a>

        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </main>
  );
}
