"use client"


import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import { Conversation } from '../../../classes/Conversation';
import { Message } from '../../../classes/Message';
import Navbar from '../../../components/navBar';

export default function FeedbackPage() {
    
    //TEST CONVERSATION
    const conversation = new Conversation(3,"Conflict with Merete",0,"Christina","Customer support");

    const personality = [3,5,7,8,1]; //Mocked test data, should get from database as always
    
    const strategy = [45, 5, 4.5, 0.5, 45]; //Mocked test data for conflict management strategies

    const strategies = ["avoiding","dominating","co-operating"] //Mocked test data for strategy evolution

    const assesment = "du ik særlig venlig";

    const pil = " --> ";

    const router = useRouter();


    return (
        <div>
            <Navbar></Navbar>
            <div className="relative flex justify-center items-center">
                <div className="my-2 flex flex-row w-5/6 justify-between">
                    
                    <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-700 transition-all"
                    onClick={ e => {//
                    router.push('/conversation/' + conversation.getId())}}>Conversation</button>
                    
                </div>
            </div>
            <div className="relative w-full h-screen flex justify-center items-center">

                
                <div className="relative w-4/5 bg-gray-200 mx-auto my-10 rounded flex shadow-lg flex-row p-4 space-y-2 items-center">

                <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full h-full">

                    <div className="border-2 border-black">
                        <div className="flex justify-center">
                            <p>Strategy assessment</p>
                        </div>

                        <div className="grid grid-rows-5 grid-cols-2 gap-4 w-full h-full">
                            <p>Avoiding</p>
                            <p>{strategy[0]}%</p>
                            <p>Yielding</p>
                            <p>{strategy[1]}%</p>
                            <p>Dominating</p>
                            <p>{strategy[2]}%</p>
                            <p>Compromising</p>
                            <p>{strategy[3]}%</p>
                            <p>Problem-Solving</p>
                            <p>{strategy[4]}%</p>
                        </div>


                    </div>
                        
                    <div className="relative mb-6 flex flex-col justify-between border-2 border-black">
                        <div className="flex justify-center">
                        <h1>Personality assessment</h1>
                        </div>
                        <label htmlFor="openness">Openness</label>
                        <input readOnly id="openness" name="labels-range-input" type="range" value={personality[0]} min="1" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-purple-300"></input>
                        <div className="flex flex-row justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">MIN</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">MAX</span>
                        </div>
                        <label htmlFor="conscientiousness">Conscientiousness</label>
                        <input readOnly id="conscientiousness" name="labels-range-input" type="range" value={personality[1]} min="1" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-300"></input>
                        <div className="flex flex-row justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">MIN</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">MAX</span>
                        </div>
                        <label htmlFor="extraversion">Extraversion</label>
                        <input readOnly id="extraversion" name="labels-range-input" type="range" value={personality[2]} min="1" max="10" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-green-400"></input>
                        <div className="flex flex-row justify-between">    
                            <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">MIN</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">MAX</span>
                        </div>
                        <label htmlFor="agreeableness">Agreeableness</label>
                        <input readOnly id="agreeableness" name="labels-range-input" type="range" value={personality[3]} min="1" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-red-300"></input>
                        <div className="flex flex-row justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">MIN</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">MAX</span>
                        </div>
                        
                        <label htmlFor="neuroticism">Neuroticism</label>
                        <input readOnly id="neuroticism" name="labels-range-input" type="range" value={personality[4]} min="1" max="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-yellow-200"></input>
                        <div className="flex flex-row justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400 start-0 -bottom-6">MIN</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 end-0 -bottom-6">MAX</span>
                        </div>
                    </div>

            
                    <div className="border-2 border-black">
                        <div className="flex justify-center">
                            <p>Strategy evolution</p>
                        </div>

                        <div className="flex flex-rows justify-left">
                        {strategies.map((strategy : string, i) => (
                            
                            (strategies.length == i+1) ?
                            <p key={i}> {strategy}</p>
                            :
                            <p key={i}>{strategy} {pil} </p>                                
                            ))}
                            </div>
                    </div>

                    <div className="border-2 border-black">
                        <div className="flex justify-center">
                            <p>Overall assesment</p>
                        </div>
                        <p>{assesment}</p>
                    </div>

                </div>

                </div>

            </div>       
        </div>
    )
}