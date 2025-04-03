"use client"

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import { Conversation } from '../../classes/Conversation';
import { Message } from '../../classes/Message';
import { text } from 'stream/consumers';
import Navbar from '../../components/navBar';

/**
 * Test function adds messages to a conversation
 * @param c A conversations
 */
function addTestMessages(c : Conversation) {

    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true,1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", true, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    c.getMessages().push(new Message("hej", true, 1519211811670))
    c.getMessages().push(new Message("hej med dig", false, 1519211811670))
    c.getMessages().push(new Message("kamilla skal dø", true, 1519211811670))
    
}

export default function ConversationPage() {
    
    const router = useRouter();

    const timezone : number = new Date().getTimezoneOffset();

    const conversation = new Conversation(3,"Conflict with Merete",0,"Christina","Customer support");

    const [messages, setMessages] = useState(conversation.getMessages());
    const [completed, setCompleted] = useState(conversation.isCompleted())
    const [textInput, setTextInput] = useState("");
    
    const handleInput = async (e) => {
        console.log(e.target.value);
        setTextInput(e.target.value);
    }

    const handleSend = async (e) => {

        if(textInput == ""){
            throw new Error("Tomt ligsom");
        } else {
            e.preventDefault();
            setMessages((prev) => [new Message(textInput,true,Date.now()), ...prev]);
            console.log(messages);
            //ALSO UPDATE IN DATABASE TAK
            setTextInput("");
        }
        
    }

    function finishConversation() {
        setCompleted(true);
        //Update in database as well
        router.push('/conversation/'+ conversation.getId() + '/feedback');
    }

    addTestMessages(conversation);

    return (
        <div>

            <Navbar></Navbar>
            <div className="relative w-full h-screen flex justify-center items-center">
                
                <div className= "fixed top-30 left-5">
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-700 transition-all"
                    onClick={ e => {//
                        router.push('/conversation/'+ conversation.getId() + '/feedback')}}>STATS</button>
                </div> 
                <div className= "fixed top-30 right-5">
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-700 transition-all"
                    onClick={ e => {//
                    finishConversation()}}>Finish conversation</button>
                </div> 

                <div className="w-4/5 h-2/3 mb-20 fixed bg-gray-200 mx-auto my-5 rounded flex shadow-lg absolute flex-col p-4 space-y-2">
                    <div className="h-full overflow-y-scroll p-4 space-y-2 flex flex-col-reverse">
                        {messages.map((message : Message, i) => ( message.isUserSent() ? 
                        <div key={i} className="flex justify-end">
                            <div className='flex-col'>
                                <div className="bg-white p-2 rounded shadow text-sm max-w-xs">
                                    <p>{message.getBody()}</p>
                                </div>
                                <p className="text-[7px]">{new Date(message.getReceivedAt()).toUTCString()}</p>
                            </div>
                        </div>
                        : 
                        <div key={i} className="flex justify-start">
                            <div className='flex-col'>
                                <div className="bg-white p-2 rounded shadow text-sm max-w-xs">
                                    <p>{message.getBody()}</p>
                                </div>
                                <p className="text-[7px]">{new Date(message.getReceivedAt()).toUTCString()}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            id="textInput"
                            onChange={handleInput}
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