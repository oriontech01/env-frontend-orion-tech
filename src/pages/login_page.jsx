import { useNavigate } from "react-router-dom";
import emapping from "../assets1/images/emapping.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { api_root } from "../api/api_variables";

export default function LoginPage() {
    const dashboard_management= useNavigate();

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

    useEffect(() => {
        handleGetCookie();
        if (access_token !== null){
          dashboard_management('/admin-model-management', {relative: true});
        }
    }, []);







    var bearer_token= null;

    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);

      const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');

      document.cookie = `${name}=${cookieValue}; path=/`;
    };

    // const handleSetCookie = () => {
    //   // Set a cookie named "exampleCookie" with the value "exampleValue" that expires in 7 days
    //   setCookie('access_token', bearer_token, 1);
    // };






    const [isLoggedIn, setLoggedIn]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);

    const [username_value, set_username_value]= useState('');
    const [password_value, set_password_value]= useState('');
    // const get_values= (event) => {
    //   set_username_value(event.target.value);
    //   console.log(event.target.value)
    // }


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




    function loginPostRes(res){
      bearer_token= res.data.token_type + " " + res.data.access_token;
      console.log(bearer_token);
      setCookie('access_token', bearer_token, 1);
      setLoggedIn(true);
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


    useEffect(() => {
        if (isLoggedIn){
          // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
          dashboard_management('/admin-model-management', {relative: true});
        }
    }, [isLoggedIn]); //this effect when isLoggedIn changes







    return (
      <div className="relative mt-[-15px] flex flex-col max-h-screen h-screen items-center justify-center">

        <img alt="/" src={emapping} className="w-[180px] mx-auto pb-4"/>

        <div className="items-center mx-auto py-16 bg-[#9c856e] w-[25%] shadow-md shadow-gray-800 rounded-xl">          
          <h1 className="text-[30px] text-[#ecdec4] font-bold text-center mb-7">Welcome Back!</h1>

          <h1 className="text-center space-y-3 flex flex-col mx-6">
            <input value={username_value} onChange={e => set_username_value(e.target.value)} className="text-left px-4 pl-4 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Username"/>
            <input value={password_value} onChange={e => set_password_value(e.target.value)} className="text-left px-4 pl-4 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="password" placeholder="Password"/>

            {!error_disp 
              ? <div className="text-red-100 hidden"> Please all the fields must be filled</div>
              
              : <div className="text-red-100"> Please all the fields must be filled</div>
            }
            <button onClick={loginPost} className="border border-white hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2 w-30 mx-auto rounded-full font-bold">LOGIN</button>

            <div className="text-red-100">{api_error_disp}</div>
          </h1>
        </div>


        {showProcessing 
          ? 
            <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
              <svg className="animate-spin h-10 w-10 border-[6px] border-[#714E2C] border-t-[#714E2C] rounded-full mb-4" viewBox="0 0 24 24">
              </svg>
              Please wait...
            </div>
            
          : <div> </div>}
      </div>
    );
  }