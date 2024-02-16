import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import MobileMenu from "../../components/1_super_admin/mobile_menu";
import NavHeader from "../../components/1_super_admin/nav_header";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';
// import { RiEyeCloseLine } from "react-icons/ri";
// import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import axios from "axios";
import { api_root } from "../../api/api_variables";
import { handleDeleteCookie } from "../../api/delete_cookie";


export default function SuperUsersAdd(){
    const [mobileMenu, setMobileMenu]= useState(false);

    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }
    

    const [username_value, set_username_value]= useState('');
    const [role, setRole]= useState("Reviewer");
    const [password_value, set_password_value]= useState('');
    const [password_value2, set_password_value2]= useState('');
 
    const [hidePassword, setHidePassword]= useState(false);
    const [rememberMe, setRememberMe]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);
 
 
    const navigate= useNavigate();
 
    var access_token;
 
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
 
      for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.trim().split('=');
 
          if (cookieName === name) {
          return decodeURIComponent(cookieValue);
          }
      }
      return null;
    };
 
    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
    };
 
 
 
 
 
 
 
 
 
    var bearer_token= null;
 
    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
 
      const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
 
      document.cookie = `${name}=${cookieValue}; path=/`;
    };
 
 
 
 
    const [error_disp, set_error_disp]= useState(false);
    const error_disp_= () => {
      set_error_disp(!error_disp);
    }
 
    const [api_error_disp, set_api_error_disp]= useState('');
    const api_error_disp_= (e) => {
      try{
        set_api_error_disp(e.response.data.detail);
      }
      catch(e){
        set_api_error_disp(" something went wrong or please check your internet connection");
      } 
      setshowProcessing(false);
    }
 
 
 
    useEffect(() => {
     const getUsername= localStorage.getItem('username');
     const getPassword= localStorage.getItem('password');
 
     if (getUsername != null) {
         set_username_value(getUsername);
     }
 
     if (getPassword != null) {
         set_password_value(getPassword);
     }
 
    }, [])
 
    
    function loginPostRes(res){
     bearer_token= res.data.token_type + " " + res.data.access_token;
     axios.get(api_root + 'admin/manual_verify_user', {
         headers: {
             'Authorization': bearer_token,
             'Content-Type': 'application/json', // Add other headers if needed
           },
     }).then(res => {
 
         handleDeleteCookie();
         // localStorage.removeItem('username');
         // localStorage.removeItem('password');
 
         setCookie('access_token', bearer_token, 1);
         setCookie("login_role", res.data, 1);
 
         if (rememberMe){
             localStorage.setItem("username", username_value);
             localStorage.setItem("password", password_value);
         }
 
       
 
         if (res.data === "admin"){navigate("/admin-model-management", {relative: true});}
         else if (res.data === "superuser"){navigate("/admin-super-management", {relative: true})}
         else{
             navigate("/", {relative: true})
         }
     })
     .catch(e => alert(bearer_token));
 
     setshowProcessing(false);
     
   }
 
   function loginPost(){
     setshowProcessing(true);
 
     const username= username_value.toLowerCase().trim();
     const password= password_value;
 
     if (username.length=== 0 || password.length=== 0){
       return error_disp_();
     }
 
     const json_data= {'username': username,'password': password}
     
     try{
       axios.post(
         api_root + 'login',
         json_data,
         {
           headers:{
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           // withCredentials: true
         }
       ).then(res => loginPostRes(res))
       .catch(e =>api_error_disp_(e));
       // setLoggedIn(true);
     }
 
     catch(e){
       api_error_disp_("Something went wrong, please try again.");
       console.log(e.message);
     }
   }


    return(
        <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
            {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
            <DesktopMenu sendActive= {"users"}/>

            {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
            <div className="relative lg:col-span-4 flex flex-col w-full h-screen">

                <div className=' scale-75 py-4 absolute left-0 right-0 top-12 bottom-0 flex mx-auto justify-center items-center h-screen'>
                    <div className='space-y-4 bg-white rounded-2xl shadow-md shadow-gray-500 py-12 mb-2 px-6 w-[570px]'>
                        <div>
                            <h1 className='font-bold text-3xl text-center '>
                                Add New User
                            </h1>

                            <h1 className='text-center text-gray-500 py-2 '>
                                Please enter new user details.
                            </h1>
                        </div>

                        <div className='pt-4 text-gray-700 flex flex-col gap-y-4' >
                            {/* ++++++++++++++ EMAIL ++++++++++++++++++++ */}
                            <div className='flex flex-col'>
                                <label className='font-bold pl-2'>
                                    Username
                                </label>
                                <input value={username_value} onChange={e => set_username_value(e.target.value)} type='email' placeholder='Enter your email' className='shadow-md py-3 px-2 border rounded-xl'/>
                            </div>


                            <div className='flex flex-col'>
                                <label className='font-bold pl-2'>
                                    User Role
                                </label>

                                <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer w-full py-3 px-6 border border-gray-300 rounded-2xl text-[12px]">
                                    <option >Admin</option>
                                    <option >Tagger</option>
                                    <option >Reviewer</option>
                                </select>
                            </div>


                            {/* +++++++++++++++++++ PASSWORD ++++++++++++++++++++++ */}
                            <div className='flex flex-col'>
                                <label className='font-bold pl-2 pb-2'>
                                    Password
                                </label>

                                <div className='flex relative items-center mt-6'>
                                    <input value={password_value} onChange={e => set_password_value(e.target.value)} type={`${hidePassword ? 'text' : 'password'}`} placeholder='Enter your password' className='absolute left-0 right-0 shadow-md py-3 px-2 border rounded-xl'/>

                                    {
                                        !hidePassword 
                                            ? <FaEyeSlash onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                            
                                            :  <FaEye onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                    }
                                </div>
                            </div>


                            <div className='flex flex-col'>
                                <label className='font-bold mt-4 pl-2 pb-2'>
                                    Re-type Password
                                </label>

                                <div className='flex relative items-center mt-6'>
                                    <input value={password_value} onChange={e => set_password_value(e.target.value)} type={`${hidePassword ? 'text' : 'password'}`} placeholder='Enter your password' className='absolute left-0 right-0 shadow-md py-3 px-2 border rounded-xl'/>

                                    {
                                        !hidePassword 
                                            ? <FaEyeSlash onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                            
                                            :  <FaEye onClick={(e) => {setHidePassword(!hidePassword)}} className='scale-[120%] cursor-pointer absolute right-0 mr-3'/>
                                    }
                                </div>
                            </div>

                            {/* +++++++++++ BUTTON +++++++++++++++++ */}
                            <button onClick={loginPost} className={`${showProcessing ? 'pointer-events-none opacity-85' : ''} my-button-style my-shadow-style mt-8`}>
                                {/* <svg class="h-6 w-6 mr-3 rounded-full border-[3px] border-l-0 border-t-0 border-e-0" viewBox="0 0 24 24"> */}
                                {
                                    showProcessing 
                                        ? 
                                            <svg class="animate-spin h-6 w-6 mr-5 rounded-full border-[2px] border-t-0 border-e-0" viewBox="0 0 24 24">
                                            </svg>
                                        
                                        : ""
                                }

                                Create Account
                            </button>
                        </div>
                    </div>
                </div>


                            {/* ++++++++ SUCCESSFULLY ADDED +++++++ */}
            {/* <div className="fixed flex flex-col items-center justify-center mx-auto bg-black/75 w-full h-full">
                <h1 className="font-medium">Account Created Successfully</h1>
            </div> */}

                <NavHeader navTitle= {"Users"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

            </div>


            <MobileMenu mobileMenu= {mobileMenu} sendActive= {"users"} />

        </div>
    );
}