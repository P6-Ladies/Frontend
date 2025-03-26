"use client"

import React, {useState} from "react";
import Link from "next/link"

export default function RegisterPage() {


    const [formData, setFormData] = useState({username: "", password: "", confirmPassword: ""});

    const handleInput = async(e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        //This is where the username and password is put in the database???
    }

    return (
        <div 
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div 
          className="w-full p-6 rounded-md shadow-md lg:max-w-xl bg-white-300">
          <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
          <form 
            className="mt-6" 
            onSubmit={handleSubmit}>
              <div 
                className="mb-4">
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-semibold text-gray-800">
                    Username
                  </label>
                  <input
                    type="text" 
                    id="username" 
                    onChange={handleInput}
                    autoComplete="username" 
                    name="username"
                    data-testid="unInput"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
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