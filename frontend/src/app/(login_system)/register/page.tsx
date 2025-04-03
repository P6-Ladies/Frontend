"use client"

import React, {useState} from "react";
import Link from "next/link"
import {useRouter} from 'next/navigation';
const path = require("path");

export default function RegisterPage() {
  const router = useRouter();


    const [formData, setFormData] = useState({email : "", password : "", confirmPassword: ""});  
    const [validationErrors, setValidationErrors] = useState({email: "", password: ""});

    const register = async (Email, Password) => {

      console.log("Sending request:", JSON.stringify({Email,Password}));

      try {
        const response = await fetch("http://localhost/users", {
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

    const handleInput = async(e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)) {
            setValidationErrors({...validationErrors, email: ""})
            if(formData.confirmPassword == formData.password) {
              setValidationErrors({...validationErrors, password: ""});
              const user = await register(formData.email, formData.password);
              console.log(user);
              
              if (user){
                router.push("/login");
              } else {
                console.log("hjælp");
              }
              
            } else setValidationErrors({...validationErrors, password: "The passwords don't match"})

        } else setValidationErrors({...validationErrors, email: "This is not an email!"})
        if(formData.confirmPassword != formData.password) {
          setValidationErrors({...validationErrors, password: "The passwords don't match"})
        } else setValidationErrors({...validationErrors, password: ""})
    }

    return (
        <div 
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div 
          className="w-full p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
          <form 
            className="mt-6" 
            onSubmit={handleSubmit}>
              <div 
                className="mb-4">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold text-gray-800">
                    E-mail
                  </label>
                  <input
                    type="text" 
                    id="email" 
                    onChange={handleInput}
                    autoComplete="email" 
                    name="email"
                    data-testid="unInput"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <p className="text-red-400">{validationErrors.email}</p>
              </div> 
            <div className="mb-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password" 
                id="password" 
                onChange ={handleInput}
                autoComplete="new-password" 
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div> 
              <div className="mb-2">
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-semibold text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password" 
                  id="repeatPassword" 
                  onChange = {handleInput}
                  autoComplete='new-password'  
                  name="confirmPassword"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <p className="text-red-400">{validationErrors.password}</p>
            <div 
              className="mt-2">
              <button 
                type="submit"
                title="submitButton"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 hover:scale-105" >
                Register
              </button>
            </div>
          </form>
            <p 
              className="mt-4 text-sm text-center text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-palette-500 hover:underline">
                Log in
              </Link>
            </p>
        </div>
      </div>
      );
}