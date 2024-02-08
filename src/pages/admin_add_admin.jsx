import { IoSearchSharp } from "react-icons/io5";
import CardsGridManagement from "../components1/cardsgridmanagement";
import emapping from "../assets1/images/emapping.png"
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import success_mark from "../assets1/images/success_mark.png";
import { useState } from "react";
import SessionExpired from "../components1/session_expired";
import axios from "axios";
import { api_root, keep_json_data } from "../api/api_variables";
import { handleDeleteCookie } from "../api/delete_cookie";




export default function AdminAddadmin() {
    const navigate= useNavigate();

    const [isLoggedIn, setLoggedIn]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);

    function add_model_objects_(event){
      navigate('/add-model-objects', {relative: true});
    }

    const view_admin= useNavigate();
    function view_admin_(event){
      navigate('/view-admin', {relative: true});
    }

    const dashboard_management= useNavigate();
    function dashboard_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/admin-model-management', {relative: true});
    }

    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }

    const handleLogout= () => {
        handleDeleteCookie();
        navigate('/admin-login', {relative: true});
    }



    const [is_expired, set_is_expired]= useState(false);
    const is_expired_ = (e) => {
        if (e.code === "ERR_BAD_REQUEST"){
            set_is_expired(true)
        }
        else{set_is_expired(false)}
    }

    const [validation_text, set_validation_text]= useState("");

    const [admin_name, set_admin_name]= useState('');
    const admin_name_= (e) => {
        if (admin_name.trim().length === 0){
            set_validation_text("");
        }
        set_admin_name(e.target.value);
    }

    const [role, set_role]= useState('');

    const [password1, set_password1]= useState('');
    const [password2, set_password2]= useState('');
    let password_validator= "";
    const password1_= (e) => {
        if (password1.trim().length === 0){
            set_validation_text("");
        }

        set_password1(e.target.value);
    }


    const password2_= (e) => {
        set_password2(e.target.value);
        password_validator += e.target.value;
        const p_trim= password_validator.trim();
        if (p_trim.length === 0){
            set_validation_text("");
        }

        if (password1.trim() !== p_trim){
          return set_validation_text("Password 1 and 2 do not match");
        }
        else{set_validation_text("")}
    }



    let access_token;
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
        return
    };

    const post_request= (string_json_upload) => {
      setshowProcessing(true);
      handleGetCookie();
      if (access_token === null){
          setshowProcessing(false);
          navigate('/admin-login', {relative: true});
      }
      
      else{
          axios.request(
              {
                  method: 'post',
                  data: string_json_upload,
                  maxBodyLength: Infinity,
                  url: api_root + 'admin/register',
                  headers: { 
                    'Authorization': access_token,
                    'Content-Type': 'application/json',
                  }
              }
          )
          .then((response) => {
              setshowProcessing(false);
              keep_json_data.length= 0;
              alert("Admin added successfully!")
              // console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
              console.log(error);
          });
      }
    }


    const form_data= () => {
      const m_name= admin_name.trim();
      const m_password1= password1.trim();
      const m_password2= password2.trim();

      if (m_name.length === 0){
          return set_validation_text("Enter username");
      }

      if (role === "set user role"){
        return set_validation_text("Please set a user role");
    }

      if (m_password1.length === 0){
          return set_validation_text("Enter password1");
      }

      if (m_password2.length === 0){
        return set_validation_text("Enter password2 to verify");
      }


      const new_admin= {'username':m_name, 'role': role, 'password':m_password1};
      post_request(new_admin);
      // navigate('/add-model-objects', {relative: true});
  }




    return (
      <div>
        {!is_expired
          ?
          <div className="relative max-h-screen grid grid-cols-4 justify-center items-center mx-auto bg-[#C3B598] pb-10">
              
              <div className= "text-white relative overflow-hidden h-screen justify-start justify-items-start items-start text-start bg-[#714E2C]"> 
                  <img alt="/" src={emapping}  onClick={home_page_} className="cursor-pointer absolute top-5 left-0 right-0 mx-auto w-[158px]"/>

                  <div className="absolute top-32  left-0 right-0 w-full space-y-5">
                      <h1 onClick={dashboard_} className="cursor-pointer text-center">Dashboard</h1>
                      <h1 onClick={view_admin_} className="cursor-pointer text-center -ml-[1.5rem]">Admins</h1>
                      <h1 className="text-center -ml-[2.0rem]">Report</h1>
                  </div>

                  <h1 onClick={handleLogout} className="cursor-pointer -ml-[2.0rem] text-center absolute bottom-10 left-0 right-0 underline">Logout</h1>
              </div>
              
              <div className="h-screen px-40 col-span-3 flex flex-col  items-center pt-20">
                  <h1 className="flex text-[30px] text-[#714E2C] font-bold text-center mb-7">Add an admin</h1>

                  <h1 className="text-center self-stretch flex flex-col mx-[20%]">
                      <input onChange={admin_name_} className="flex shadow-md shadow-gray-500 text-left my-4 px-4 pl-6 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Username"/>

                        <select  value={role} onChange={e => {set_role(e.target.value)}} className="text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4   py-2  bg-[#B9A88B]">
                            <option >set user role</option>
                            <option >user</option>
                            <option >admin</option>
                        </select>

                      <input onChange={password1_} className="flex shadow-md shadow-gray-500 text-left my-4 px-4 pl-6 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="password" placeholder="Password"/>

                      <input onChange={password2_} className="flex shadow-md shadow-gray-500 text-left my-4 px-4 pl-6 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="password" placeholder="Verify Password"/>
                      
                      
                      <div className="font-bold text-red-700 my-2">{validation_text}</div>

                      
                      <button onClick={form_data} className="shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white mt-4 px-8 py-2 rounded-full font-bold">Create Account</button>
                  
                  </h1>
              </div>

              {/* <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                </svg>
                Uploading data
              </div> */}

              {/* <div className="bg-[#B9A88B] h-screen flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 ">
                <img alt="/" src={success_mark} className="jmx-auto size-[177.19px]" />
                <h1 className="text-[38px] text-center">Upload successful</h1>
              </div> */}



            {showProcessing 
              ? 
                // <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                //   <svg className="animate-spin h-10 w-10 border-[6px] border-[#714E2C] border-t-[#714E2C] rounded-full mb-4" viewBox="0 0 24 24">
                //   </svg>
                //   Please wait...
                // </div>

                <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                  <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                  </svg>
                  Creating admin...
                </div> 
                
                
              : <div> </div>}
              
          </div>

          : <SessionExpired />}
{/* 
          setTimeout(() => {
              <div className="bg-[#B9A88B] h-screen flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 ">
                <img alt="/" src={success_mark} className="jmx-auto size-[177.19px]" />
                <h1 className="text-[38px] text-center">Upload successful</h1>
              </div>
          }, timeout); */}
        
      </div>
    );
  }
