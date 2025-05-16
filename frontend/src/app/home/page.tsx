"use client"

import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation'
import Navbar from '../components/navBar'

export default function HomePage () {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    
        useEffect(() => {
            const t = localStorage.getItem("token");
            if (t == "null") router.push('/login');
            const u = localStorage.getItem("userId");
            setToken(t);
            setUserId(u);
        }, []);
    //Conversations to be hentet from the database corresponding to username
    const [conversations,setConversations] = useState(
        [   ]
    );
    const [refreshKey, setRefreshKey] = useState(0);

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            console.log(e.target.title);
            const response = await fetch("http://localhost/conversations/" + e.target.title, {
              method: "DELETE",
              headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });
        
            if (!response.ok) {
                const text = await response.text();
                console.error("Fetch error:", text);
                throw new Error("Failed to fetch: " + response.status);
            }

            const responseData = await response.json();
            console.log(responseData);
            setRefreshKey(refreshKey + 1);
        
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchNOget();
    }, [userId, refreshKey]);
    const fetchNOget = async () => {        
        if (userId == null) return;
        console.log("Trying to fetch")
        try {
            const response = await fetch(("http://localhost/conversations/user/"+ userId), {
              method: "GET",
              headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });
      
            if (!response.ok) {
                const text = await response.text();
                console.error("Fetch error:", text);
                throw new Error("Failed to fetch: " + response.status);
            }
      
            const responseData = await response.json();
            console.log(responseData);

            //hjælp sina
            let list = [];
            responseData.conversations.map((data, i) => (

                list.push(data)

            ))
            
            setConversations(list);
      
          } catch (error){
            console.error(error);
          }
    }
    
    return (
        
        <div>
            <Navbar />
            <div>
                <h1 className="text-[100px] font-bold text-gray-800 text-center tracking-wide drop-shadow-lg"> HOME </h1>
                

                <div className="mt-5 mx-auto w-[95vw] shadow-xl border rounded-3xl border-4 bg-gray-100 p-8">
                    <button onClick={e => {router.push('/create')}} className="bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all">Create new</button> 
                
                { //Map all the conversations
                    conversations.map((conversation, i) => (
                        <div key={i} onClick={ e => {router.push('/conversation/' + conversation.id)}} className="mt-5 mx-4 bg-white flex border-gray-700 justify-between items-center hover:scale-101 w-full mx-auto shadow-xl border rounded-md border-4 flex border-grey-600 bg-grey-400 p-8 bg-grey-400">
                            <h1 className="text-[50px]">{conversation.title} </h1>
                            <p>{conversation.completed ? "Completed" : "Ongoing"}</p>
                            <p>Date: {new Date(conversation.createdAt).toUTCString()}</p>
                            <img title={conversation.id.toString()} key={i} className="w-6 h-6 hover:scale-125 hover:cursor-pointer" src={"/trashcan.png"}
                                onClick={handleDelete}>
                            </img>
                        </div>
                    ))
                    
                }

                
                </div>
            </div>
        </div>
    );
}