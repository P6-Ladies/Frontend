"use client"

import React, {useState} from 'react';
import {useRouter} from 'next/navigation'
import Navbar from '../components/navBar'

export default function HomePage () {
    const router = useRouter();

    //Conversations to be hentet from the database corresponding to username
    const [conversations,setConversations] = useState(
        [{id: 1, title: "Test", startDate: "18/03/2025", completed: false}, 
         {id: 2, title: "Test2", startDate: "17/03/2025", completed: true}]
    );

    const handleDelete = (e) => {
        e.preventDefault();
        //Handle deleting clicked element e
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
                            <p>Date: {conversation.startDate}</p>
                            <img title={"TrashCan"} key={i} className="w-6 h-6 hover:scale-125 hover:cursor-pointer" src={"/trashcan.png"}
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