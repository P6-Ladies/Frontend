"use client"

import React, {useState, useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import { Conversation } from '../../classes/Conversation';
import { Message } from '../../classes/Message';
import { text } from 'stream/consumers';
import Navbar from '../../components/navBar';

export default function ConversationPage() {
    
    const router = useRouter();
    const pathname = usePathname();
    const conversationId = pathname.split("/")[2];

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const timezone : number = new Date().getTimezoneOffset();

    //Add title to top of page later?
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false)

    function messageCompare(a,b) {
        return new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
    }

    useEffect(() => {
            fetchMessages();
            fetchConversation();
        }, [refreshKey]);

    const onKeyDownHandler = (e) => {
        if (e.key == 'Enter') {
            handleSend(e);
        }
    }

    const fetchConversation = async () => {        
        console.log("Trying to fetch")
        try {
            const response = await fetch(("http://localhost/conversations/"+ conversationId), {
                method: "GET",
                headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });
        
            if (!response.ok) {
                throw new Error(await response.json());
            }
        
            const responseData = await response.json();
            console.log(responseData);
            setCompleted(responseData.completed);
            setTitle(responseData.title);
        
            } catch (error){
            console.error(error);
            }
    }
        
    const fetchMessages = async () => {        
        console.log("Trying to fetch")
        try {
            const response = await fetch(("http://localhost/conversations/"+ conversationId + "/messages"), {
                method: "GET",
                headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });
        
            if (!response.ok) {
                throw new Error(await response.json());
            }
        
            const responseData = await response.json();
            console.log(responseData);
            setMessages(responseData.sort(messageCompare));
            console.log(responseData[0]);
            console.log(responseData[1]);
        
            } catch (error){
            console.error(error);
            }
    }
    
    const handleInput = async (e) => {
        console.log(e.target.value);
        setTextInput(e.target.value);
    }

    const handleSend = async (e) => {
        
        setLoading(true);
        if(textInput == ""){
            throw new Error("Tomt ligsom");
        } else {
            
            e.preventDefault();
            
            try {
                const response = await fetch("http://localhost/conversations/" + conversationId + "/messages", {
                  method: "POST",
                  headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                  body: JSON.stringify({Message: textInput})
                });
          
                if (!response.ok) {
                  throw new Error(await response.json());
                }
          
                const responseData = await response.json();
          
              } catch (error){
                console.error(error);
              }

            setTextInput("");
            setRefreshKey(refreshKey + 1);
            setLoading(false);
        }
        
    }

    const finishConversation = async (e) => {
        setCompleted(true);
        
        try {
            const response = await fetch(("http://localhost/conversations/" + conversationId + "/complete"), {
              method: "GET",
              headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            });
      
            if (!response.ok) {
              throw new Error(await response.json());
            }
      
            const responseData = await response.json();
            console.log(responseData);
      
          } catch (error){
            console.error(error);
          }

        router.push(pathname + '/feedback');
    }

    return (
        <div>

            <Navbar></Navbar>
            <div className="relative w-full h-screen flex justify-center items-center">
                
                <div className= "fixed top-30 left-5">
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-700 transition-all"
                    onClick={ e => {//
                        router.push(URL + '/feedback')}}>STATS</button>
                </div> 
                <div className= "fixed top-30 right-5">
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-700 transition-all"
                    onClick={finishConversation}>Finish conversation</button>
                </div> 

                <div className="w-4/5 h-2/3 mb-20 fixed bg-gray-200 mx-auto my-5 rounded flex shadow-lg absolute flex-col p-4 space-y-2">
                    <div className="h-full overflow-y-scroll p-4 space-y-2 flex flex-col-reverse">
                            {loading ? <img
                                title="Loading"
                                src="/loading.gif"
                                className="w-1/7 h-1/5"
                            /> : <></>}
                        {messages.map((message, i) => ( message.sender == "User" ? 
                        <div key={i} className="flex justify-end">
                            <div className='flex-col'>
                                <div className="bg-white p-2 rounded shadow text-sm max-w-xs">
                                    <p>{message.body}</p>
                                </div>
                                <p className="text-[7px]">{new Date(message.receivedAt).toUTCString()}</p>
                            </div>
                        </div>
                        : 
                        <div key={i} className="flex justify-start">
                            <div className='flex-col'>
                                <div className="bg-white p-2 rounded shadow text-sm max-w-xs">
                                    <p>{message.body}</p>
                                </div>
                                <p className="text-[7px]">{new Date(message.receivedAt).toUTCString()}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            id="textInput"
                            onChange={handleInput}
                            onKeyDown={onKeyDownHandler}
                            value={textInput}
                            autoComplete="wazwaza"
                            name="textInput"
                            className="flex-grow px-4 py-2 w-full text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            disabled={completed}
                        />
                        <img
                            title="Submit"
                            className="w-10 h-10 ml-2 cursor-pointer hover:scale-125 transition-transform"
                            src="/paper_plane.png"
                            onClick={handleSend}
                        />
                    </div>

            </div>

            </div> 
        </div>        

    );
}