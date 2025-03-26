"use client"
import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({username: "", password: ""});

  const handleInput = async (e) => {
    const {name, value} = e.target;
        setFormData({...formData, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //Check login with password from database, currently hardcoded as test, test
    if(formData.username == "test" && formData.password == "test"){
      router.push('/home');
    }
  }

    return (
<div 
      className="relative flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 min-h-screen overflow-hidden">
      <div 
        className="w-full p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100 transition-colors duration-300 px-4 py-2 rounded-lg t shadow-2xl">
        <h1 
          className="text-3xl font-bold text-center text-black">
          Login
        </h1>
        <form className="mt-6"
        onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text" 
              id="username" 
              onChange={handleInput}
              autoComplete="username" 
              name='username'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div 
            className="mb-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password" 
              id="password" 
              onChange={handleInput}
              autoComplete="current-password" 
              name='password'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2 flex justify-between items-center">
            <button 
              type="button" 
              className="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 hover:scale-105" 
              title="submitButton">
              <Link href="/register" className="font-medium text-palette-500 hover:underline">
                Create User
              </Link>
            </button>
            <button 
              type="submit" 
              className="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 hover:scale-105" 
              title="submitButton">
              Login
            </button>
          </div>
          <Link href="/register" className="font-medium text-palette-500 hover:underline">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
    );
}