'use client';
import { Button, Input } from '@nextui-org/react';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCookies } from 'next-client-cookies';

export default function Singin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const cookie = useCookies();

  useEffect(() => {
    setError(false);
  }, [email, password]);
  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      //todo: fetch api url from .env
      const response = await axios.post(`/api/auth/signin`, {
        email,
        password,
      });


      cookie.set('token', response.data.accessToken, {
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 24 * 7),
      });

      window.location.href = '/';
      
      // const cookieData = {
      //   key: 'token',
      //   value: response.data.accessToken,
      //   options: {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7, // 1 week
      //     httpOnly: true,
      //   },
      // };

      // const cookie = serialize(
      //   cookieData.key,
      //   cookieData.value,
      //   cookieData.options,
      // );

      // document.cookie = cookie;
      //   window.location.href = '/';
    } catch (error: any) {
      console.log('hola');
      console.error(error.response.status);
      if (error.response.status === 401) {
        setError(true);
        toast.error('Invalid email or password');
      }
    }
  };

  // function handleInputChange(e: any) {
  //   setCredentials({
  //     ...credentials,
  //     [e.target.name]: e.target.value,
  //   });
  //   setError(false);
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignin}
        className="max-w-[400px] flex flex-col gap-4 border rounded-md px-12 py-12 shadow-lg"
      >
        <h2 className="font-semibold text-2xl my-4">Login to your account</h2>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          errorMessage={error ? 'Invalid email or password' : null}
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          errorMessage={error ? 'Invalid email or password' : null}
        />

        <Button size="lg" type="submit" color="success" className="text-white">
          Sign in
        </Button>
      </form>
    </div>
  );
}
