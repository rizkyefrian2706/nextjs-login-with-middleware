import React from 'react';
import { useRouter } from 'next/router'
import { useState } from "react";
import axios from "axios";
import { setCookie } from 'cookies-next';

const Index = (props) => {
  const router = useRouter()
  const [data, setData] = useState({
    email: props.dataPost ? props.dataPost.email : '',
    password: props.dataPost ? props.dataPost.password : ''
  })

  const handleChange = (e) => {
    setData(prevState => (
      {
        ...prevState, [e.target.name]: e.target.value
      }
    ))
  }

  const login = async (e) => {
    try {
      const res = await axios.post('http://localhost:3009/login', data, {
        headers: {
          'accept': 'application/json',
        }
      })
      setCookie('token', res.data.token, {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      router.push('/home')
    } catch (err) {
      return err
    }

  }

  return (
    <div className=' flex justify-center items-center min-h-screen'>
      <div className=' h-auto w-2/6 shadow-md shadow-slate-600 rounded-md'>
        <form className=' p-5'>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="email"
              name="email"
              value={data.email}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="text" id="password"
              name="password"
              value={data.password}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***********" />
          </div>
          <a className="rounded text-gray-100 px-3 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300" onClick={login}>Submit</a>
        </form>
      </div>
    </div>
  );
}

export default Index;
