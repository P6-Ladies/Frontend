"use client"

import jwt from "jsonwebtoken";
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation'
import Navbar from '../components/navBar';

export default function CreateApp() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem("token");
        const u = localStorage.getItem("userId");
        setToken(t);
        setUserId(u);
    }, []);

    



    const [formData, setFormData] = useState({title: "", agent: 2, scenario: 1});
    const [agents, setAgents] = useState([]);
    const [scenarios, setScenarios] = useState([]);

    const handleInput = async (e) => {
        const {name, value} = e.target;
            setFormData({...formData, [name] : value})
    }

    const getAgents = async () => {
        try {
            const response = await fetch("http://localhost/users/" + userId + "/agents", {
                method: "GET",
                headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });

            if (!response.ok) {
                throw new Error(await response.json());
              }

            const responseData = await response.json();

            let list = [];
            responseData.map((data, i) => (

                list.push(data)

            ))

            setAgents(list);

            } catch (error){
                console.error(error);
            }
        }
        getAgents();

        const getScenarios = async () => {
            try {
                const response = await fetch("http://localhost/users/" + userId + "/scenarios", {
                    method: "GET",
                    headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                });
    
                if (!response.ok) {
                    throw new Error(await response.json());
                  }
    
                const responseData = await response.json();
    
                let list = [];
                responseData.map((data, i) => (
    
                    list.push(data)
    
                ))
    
                setScenarios(list);
    
                } catch (error){
                    console.error(error);
                }
            }
            getScenarios();

    const handleSubmit = async (e) => {
        e.preventDefault();        
        //Push a new conversation to the database, and route to its ID. Currently hardcoded
        try {
            const response = await fetch("http://localhost/conversations", {
              method: "POST",
              headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
              body: JSON.stringify({Title: formData.title, AgentId: formData.agent, ScenarioId: formData.scenario, UserId: userId})
            });
      
            if (!response.ok) {
              throw new Error();
            }
      
            const responseData = await response.json();
            //Noget med json web tokens??? spørg maria
            router.push('/conversation/' + responseData.id);
      
          } catch (error){
            console.error(error);
          }
    }


    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-[100px] font-bold text-gray-800 text-center tracking-wide drop-shadow-lg"> NEW CONFLICT </h1>
        

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
                                { //map agents yay
                                    agents.map((agent, i) => (
                                        <option key={i} value={agent.id}> {agent.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="scenario" className="block text-sm font-semibold text-gray-800">
                            Scenario
                            </label>
                            
                            <select name="scenario" onChange={handleInput} id="scenario" className="bg-white">
                            { //map scenarios yay
                                    scenarios.map((scenario, i) => (
                                        <option key={i} value={scenario.id}> {scenario.name}</option>
                                    ))
                                }
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