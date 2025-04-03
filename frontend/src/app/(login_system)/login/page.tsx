"use client"
import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({email: "", password: ""});
  const [validationErrors, setValidationErrors] = useState("");

  const login = async (Email, Password) => {

    console.log("Sending request:", JSON.stringify({Email,Password}));

    try {
      const response = await fetch("http://localhost/login", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({ Email, Password })
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const responseData = await response.json();
      //Noget med json web tokens??? spørg maria
      return responseData;

    } catch (error){
      console.error(error);
    }
  }


  const handleInput = async (e) => {
    const {name, value} = e.target;
        setFormData({...formData, [name] : value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //Make sure to do the JSON web token thing so the user is remembered

    const user = await login(formData.email, formData.password);
    if(user){
      router.push('/home');
    } else {
      setValidationErrors("email or password is incorrect");
      setFormData({email: "", password: ""});
    }
  }

    return (
<div 
      className="relative flex flex-col items-center justify-center bg-gradient-to-r min-h-screen overflow-hidden">
      <div 
        className="w-full p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100 transition-colors duration-300 px-4 py-2 rounded-lg t shadow-2xl">
        <h1 
          className="text-3xl font-bold text-center text-gray-700">
          Login
        </h1>
        <form className="mt-6"
        onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              E-mail
            </label>
            <input
              type="text" 
              id="email" 
              value = {formData.email}
              onChange={handleInput}
              autoComplete="email" 
              name='email'
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
              value = {formData.password}
              onChange={handleInput}
              autoComplete="current-password" 
              name='password'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <p className="text-red-400">{validationErrors}</p>
          <div className="mt-2 flex justify-between items-center">
            <button 
              type="button" 
              onClick={e => {router.push("/register")}}
              className="w-full mt-2 px-4 py-2 mx-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-green-400 focus:outline-none focus:bg-gray-600 hover:scale-105" 
              title="submitButton">  
              Create User
            </button>
            <button 
              type="submit" 
              className="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-600 rounded-md hover:bg-green-400 focus:outline-none focus:bg-gray-600 hover:scale-105" 
              title="submitButton">
              Login
            </button>
          </div>
          <Link href="/forgotpassword" className="font-medium text-palette-500 hover:underline">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
    );
}