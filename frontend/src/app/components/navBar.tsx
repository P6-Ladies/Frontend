'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';



const Navbar = () => {
  useEffect(() => {
    Modal.setAppElement('#navBar'); // Now it waits until navBar exists in the DOM
  }, []);

  const [token,setToken] = useState("")
  const [userId,setUserId] = useState("")
  //fixed bg-white flex flex-col border border-black rounded
  const router = useRouter();

          useEffect(() => {
                  const t = localStorage.getItem("token");
                  if(t == "null") router.push('/login');
                  const u = localStorage.getItem("userId");
                  setToken(t);
                  setUserId(u);
              }, []);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [PasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({password: ""});
  const [formData, setFormData] = useState({oldPassword : "", newPassword : "", confirmNewPassword : "", DPassword : ""});  
  
  

  const deleteUserModal = (e) => {
    console.log("Clicked");
    setDeleteModalOpen(true);

  }

  const changePasswordModal = (e) => {
    setPasswordModalOpen(true);
    console.log("clicked");

  }

  const handleDelete = async(id, password) => {
    //check om password er rigtigt

    console.log("Sending request:", JSON.stringify({id,password}));

    try {
      const response = await fetch("http://localhost/users/"+userId, {
        method: "DELETE",
        headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify({id, password})
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const responseData = await response.json();
      localStorage.setItem("token",null);
      localStorage.setItem("userId",null);
      router.push("/login");
      return responseData;

    } catch (error){
      console.error(error);
    }


    setDeleteModalOpen(false);

  }  

  const changePassword = async (oldPassword, newPassword) => {

    //endpoint ligsom

    console.log("Sending request:", JSON.stringify({oldPassword,newPassword}));

    try {
      const response = await fetch("http://localhost/users/"+userId+"/change-password", {
        method: "PUT",
        headers:  {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify({oldPassword, newPassword})
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    //Check på gammelt password er rigtigt
    if(formData.newPassword == formData.confirmNewPassword) {
      setValidationErrors({...validationErrors, password: ""});
      const update = await changePassword(formData.oldPassword, formData.newPassword);
      console.log(update);
      
      if (true){
        //confirmation popup
        setPasswordModalOpen(false);
      } else {
        console.log("hjælp");
      }
      
    } else setValidationErrors({...validationErrors, password: "The passwords don't match"})



  }

  const handleInput = async(e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
  }

  return (
    
    <nav id="navBar" className='sticky top-0 w-full shadow-md bg-black-300 py-6 text-black'>

      <div>

        <Modal isOpen={DeleteModalOpen} className="w-2/3 p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100"
        style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              inset: "unset", // override default positioning
              padding: "2rem",
              borderRadius: "0.5rem",
              background: "#f3f4f6",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90%",
              overflow: "auto",
            },
          }}>
          <img src="/cross.png" className=" mt-2 float-right w-6 h-6 hover:scale-125 hover:cursor-pointer" 
          onClick={ (e) => setDeleteModalOpen(false)}></img>

          <h1 className="text-3xl font-bold text-center text-gray-700">Are you sure that you want to delete your user?</h1>
          <div className="mb-2">
                <label 
                  htmlFor="DPassword" 
                  className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password" 
                  id="DPassword" 
                  onChange ={handleInput}
                  autoComplete="password" 
                  name="DPassword"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div> 

          <button className='bg-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-500 transition-all'
          onClick={(e) => handleDelete(userId, formData.DPassword)}
          >YES</button>
          <button className='bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-500 transition-all'
          onClick={ (e) => setDeleteModalOpen(false)}
          >Cancel</button>

        </Modal>

      </div>

      <div id="container" className=''>
        <Modal isOpen={PasswordModalOpen} className="w-2/3 p-6 rounded-md shadow-md lg:max-w-xl bg-gray-100"
        style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              inset: "unset", // override default positioning
              padding: "2rem",
              borderRadius: "0.5rem",
              background: "#f3f4f6",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90%",
              overflow: "auto",
            },
          }}>
          
          <img src="/cross.png" className=" mt-2 float-right w-6 h-6 hover:scale-125 hover:cursor-pointer" 
          onClick={ (e) => setPasswordModalOpen(false)}></img>

          

            <h1 className="text-3xl font-bold text-center text-gray-700">Change your password ligsom</h1>
            <form 
              className="mt-6" 
              onSubmit={handleSubmit}>

              <div className="mb-2">
                <label 
                  htmlFor="oldPassword" 
                  className="block text-sm font-semibold text-gray-800">
                  Old Password
                </label>
                <input
                  type="password" 
                  id="oldPassword" 
                  onChange ={handleInput}
                  autoComplete="old-password" 
                  name="oldPassword"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>   
              <div className="mb-2">
                <label 
                  htmlFor="newPassword" 
                  className="block text-sm font-semibold text-gray-800">
                  New Password
                </label>
                <input
                  type="password" 
                  id="newPassword" 
                  onChange ={handleInput}
                  autoComplete="new-password" 
                  name="newPassword"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div> 
              <div className="mb-2">
                <label
                  htmlFor="repeatNewPassword"
                  className="block text-sm font-semibold text-gray-800">
                  Confirm New Password
                </label>
                <input
                  type="password" 
                  id="repeatNewPassword" 
                  onChange = {handleInput}
                  autoComplete='new-password'  
                  name="confirmNewPassword"
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
                  Change Password
                </button>
              </div>
            </form>
                      
        </Modal>

      </div>
      


      <div className='mx-auto w-full max-w-screen-2x1 px-6 xs:px-8 sm:px-16 flex justify-between items-center'>

        
        <Link 
            href={"/home"}
            className='body-text text-palette-400 !font-bold'>
            Home Page
        </Link>
        

        <ul className='gap-x-6 max-md:hidden flex'>
        
            <>
            <li 
                className='bg-yellow-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all'
                onClick={()=>{
                  localStorage.setItem("token",null);
                  localStorage.setItem("userId",null);
                  router.push('/login');
                }
                }>
                Logout 
            </li>
            <li className='pr-8'>                
              <img
                title="Settings"
                className="w-10 h-10 ml-2 cursor-pointer hover:scale-125 transition-transform"
                src="/cog.png"
                onClick={() => setSettingsOpen(!settingsOpen)}
                ></img>
                
                <div className="text-nowrap fixed"hidden={!settingsOpen} >
                  <p className="bg-gray-200 hover:bg-gray-300 transition-all" onClick={changePasswordModal}>Change Password</p> 
                  <p className="bg-gray-200 hover:bg-gray-300 transition-all" onClick={deleteUserModal}>Delete User</p>               
                </div>
            </li>
            </>
        
        </ul>

      </div>
    </nav>
  )
}

export default Navbar