"use client"

import React, {useState} from 'react';
import {useRouter} from 'next/navigation'

export default function CreateApp() {
    const router = useRouter();

    const [formData, setFormData] = useState({title: ""});

    const handleInput = async (e) => {
        const {name, value} = e.target;
            setFormData({...formData, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        //Push a new conversation to the database, and route to its ID. Currently hardcoded
        let id = 3;
        router.push('/conversation/' + id);
    }


    return (
        <div>
            <h1 className="text-[100px] font-bold text-gray-800 text-center tracking-wide drop-shadow-lg"> NEW CONFLICT </h1>
        
            <div className= "fixed top-5 right-5">
                <button className="bg-yellow-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all"
                onClick={ e => {//Also add so that your web token is delete
                router.push('/login')}}> Log out</button>
            </div> 

            <div className="relative flex flex-col items-center min-h-screen overflow-hidden">       
                <div className="relative w-full p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100 transition-colors duration-300 px-4 py-2 rounded-lg t shadow-2xl">
                <h1 className="object-center">Customize conflict</h1>
                
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                            Title
                            </label>
                            <input
                            type="text" 
                            id="title" 
                            onChange={handleInput}
                            autoComplete="title" 
                            name='title'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agent" className="block text-sm font-semibold text-gray-800">
                            Agent
                            </label>
                            
                            <select name="agent" onChange={handleInput} id="agent" className="bg-white">
                                <optgroup label="Escalating agents">
                                <option value="Christina"> Christina </option>
                                <option value="Albert"> Albert </option>
                                </optgroup>
                                <optgroup label="Avoiding agents">
                                <option value="Bart"> Bart </option>
                                <option value="Donna"> Donna </option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="scenario" className="block text-sm font-semibold text-gray-800">
                            Scenario
                            </label>
                            
                            <select name="scenario" onChange={handleInput} id="scenario" className="bg-white">
                                <option value="customersupport"> Customer support </option>
                                <option value="jobinterview">Job interview </option>
                            </select>

                            <div className= "absolute bottom-5 right-5">
                        <button className="bg-green-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
                        onClick={ e => {
                        handleSubmit}}> Create</button>
                        </div> 
                        </div>
                    </form>

                </div> 
            </div>               
        </div>
    )
}