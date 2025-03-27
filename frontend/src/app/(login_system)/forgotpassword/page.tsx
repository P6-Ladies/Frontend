"use client"

import React, {useState} from "react";
import Link from "next/link"
import {useRouter} from 'next/navigation';

export default function ForgotPasswordPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [tempCode, setTempCode] = useState("");
    const [validationErrors, setValidationErrors] = useState({email: "", password: ""});
    const [hidePasswordInput, setHidePasswordInput] = useState(true);

    const handleInputEmail = async(e) => {
        setEmail(e.target.value);
    }

    const handleInputCode = async(e) => {
        setTempCode(e.target.value);
    }

    const handleSubmitEmail = async(e) => {
        e.preventDefault();
        //This is where we call the endpoint for email and check that it exists

        if(email == "sinagaming69@gmail.com") //Replace email with checking if it exists
        {
            //Send the mail and make it so the code thing shows up
            setHidePasswordInput(false);
        } else {
            //Show that email is incorrect
            setValidationErrors({...validationErrors, email: "email does not exist"});
        }
    }

    const handleSubmitCode = async(e) => {
        e.preventDefault();
        //This is where we call the endpoint to check if the code is correct
        if(tempCode == "1234") //Replace 1234 with actual code
        {
            //Update password in database
            //Set up token to log in user
            router.push("/home")
        } else {
            //Show that code is incorrect
            setValidationErrors({...validationErrors, password: "Wrong code"});

        }
    }

    return (
        <div 
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100">
                <h1 className="text-3xl font-bold text-center text-gray-700">Forgot Password</h1>
                    <div hidden={!hidePasswordInput}>
                        <div className="mb-4">
                            <label 
                            htmlFor="username" 
                            className="block text-sm font-semibold text-gray-800">
                            E-mail
                            </label>
                            <input
                            type="text" 
                            id="email" 
                            autoComplete="email" 
                            onChange={handleInputEmail}
                            name="email"
                            data-testid="unInput"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <p className="text-red-600">{validationErrors.email}</p>
                        </div> 
                        <div className="mt-2">
                            <button 
                                type="button"
                                title="sendButton"
                                onClick={handleSubmitEmail}
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 hover:scale-105" >
                                Send Password
                            </button>
                        </div>
                    </div>
                    <div hidden={hidePasswordInput} className="mb-4 mt-7">
                        <div className="flex justify-center">
                            <p className="text-yellow-400">Enter temporary password sent to your mail here</p>
                        </div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password" 
                            id="password" 
                            autoComplete="new-password" 
                            onChange={handleInputCode}
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                
                        <div className="mt-2">
                            <button 
                                type="button"
                                title="loginButton"
                                onClick={handleSubmitCode}
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 hover:scale-105" >
                                Login
                            </button>
                        </div>
                </div>     
                <p className="mt-4 text-sm text-center text-gray-700">
                Back to login?{" "}
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