import { IoSearchSharp } from "react-icons/io5";
import CardsGridManagement from "../components1/cardsgridmanagement";
import emapping from "../assets1/images/emapping.png";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import avatar_male from "../assets1/images/avatar_male.png";
import { useEffect, useState } from "react";
import { api_root, keep_json_data } from "../api/api_variables";
import axios from "axios";
import SessionExpired from "../components1/session_expired";
import { handleDeleteCookie } from "../api/delete_cookie";



export default function ViewAdmin() {
  var access_token;

  const [is_expired, set_is_expired]= useState(false);
  const is_expired_ = (e) => {
    if (e.code === "ERR_BAD_REQUEST"){
        set_is_expired(true)
    }
    else{set_is_expired(false)}
}

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



  


  const profile_click= (e) => {
    // console.log(e.target.id);
  }


  const [user_id, set_user_id]= useState('');
  const [cancel_delete, setDelete]= useState(false);
  const cancel_delete_= (id_gotten) => {
      set_user_id(id_gotten);
      setDelete(!cancel_delete);
  }



  const [model_json_data, set_model_json_data]= useState([]);
  const admin_lists= [];
  const model_json_data_= (res) => {
      admin_lists.length= 0;
      keep_json_data.length= 0;
      keep_json_data.push(res.data);

      for (let i= 0; i < keep_json_data[0].length; i ++){
        let username= keep_json_data[0][i].username;
        admin_lists.push(
          <div onClick={e => profile_click(e)} value={username} key={username} className="hover:scale-105 duration-300 rounded-3xl relative flex items-center bg-[#B9A88B] px-4 py-2 mt-2">
            <img alt="/" src={avatar_male} className="flex w-[40px]" />

            <h1 className="font-bold px-4">{username}</h1>

            <div onClick={ e => cancel_delete_(keep_json_data[0][i].id)} value={keep_json_data[0][i].id} className="cursor-pointer absolute right-0 mx-px scale-75 shadow-md shadow-gray-600 drop-shadow w-[7rem] h-[2.5rem] border text-white border-[#714E2C] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C]  py-2">
                <MdDelete className="size-[20px] mt-[0.6rem] absolute top-0 bottom-0 left-[1.05rem]"/>
                <button className="absolute top-0 bottom-0 right-[1.80rem] text-[15px]">Delete</button>
            </div>
          </div>
        );
        // console.log(keep_json_data[0][i].username);
        set_model_json_data(admin_lists);
        // model_json_data.push(admin_lists);
        // console.log(model_json_data);
      }
  };



  useEffect(() => {

    if (keep_json_data.length === 0){
      handleGetCookie();
      if (access_token === null){
          navigate('/admin-login', {relative: true});
      }

      else{
          axios.get(api_root + 'admin/get-all-users', {
              headers: {
                  'Authorization': access_token,
                  'Content-Type': 'application/json', // Add other headers if needed
                },
          }).then(res => model_json_data_(res))
          .catch(e => is_expired_(e));
      }
    }

    else{
      admin_lists.length= 0;

      for (let i= 0; i < keep_json_data[0].length; i ++){
        let username= keep_json_data[0][i].username;
        admin_lists.push(
          <div onClick={e => profile_click(keep_json_data[0][i].id)} id={username} key={username} className="hover:scale-105 duration-300 rounded-3xl relative flex items-center bg-[#B9A88B] px-4 py-2 mt-2">
            <img alt="/" src={avatar_male} className="flex w-[40px]" />

            <h1 className="font-bold px-4">{username}</h1>

            <div onClick={ e => cancel_delete_(keep_json_data[0][i].id)} value={keep_json_data[0][i].id} className="cursor-pointer absolute right-0 mx-px scale-75 shadow-md shadow-gray-600 drop-shadow w-[7rem] h-[2.5rem] border text-white border-[#714E2C] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C]  py-2">
                <MdDelete className="size-[20px] mt-[0.6rem] absolute top-0 bottom-0 left-[1.05rem]"/>
                <button className="absolute top-0 bottom-0 right-[1.80rem] text-[15px]">Delete</button>
            </div>
          </div>
        );
        set_model_json_data(admin_lists);
      }
    }
  }, [access_token]); 







  function allow_search(){
    document.getElementById('search_input').focus();
  }

  const [continue_delete, setContinueDelete]= useState(false);
  const continue_delete_= () => {
      cancel_delete_();
      setContinueDelete(!continue_delete);

      handleGetCookie();
      if (access_token === null){
          navigate('/admin-login', {relative: true});
      }
      
      else{
          axios.request(
              {
                  method: 'delete',
                  url: api_root + 'admin/delete-admin',
                  headers: { 
                    'Authorization': access_token,
                  },
                  params: {
                      id: user_id
                  },
              }
          )
          .then((response) => {
              setContinueDelete(false);
          })
          .catch((error) => {
              console.log(error);
              setContinueDelete(false);
          });

      }
  }

  const navigate= useNavigate();
  function admin_add_(event){
      // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
      navigate('/add-admin', {relative: true});
  }

  function view_admin_(event){
    navigate('/view-admin', {relative: true});
  }

  function dashboard_(event){
      // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
      navigate('/admin-model-management', {relative: true});
  }

  function home_page_(event){
      navigate('/', {relative: true});
  }


  const handleLogout= () => {
      handleDeleteCookie();
      navigate('/admin-login', {relative: true});
  }

  return (
    <div>
      {!is_expired 
        ?  
          <div className="overflow-hidden relative max-h-screen grid grid-cols-4 justify-center items-center mx-auto bg-[#C3B598] pb-10">
              
              <div className= "text-white relative overflow-hidden h-screen justify-start justify-items-start items-start text-start bg-[#714E2C]"> 
                <img alt="/" src={emapping}  onClick={home_page_} className="cursor-pointer absolute top-5 left-0 right-0 mx-auto w-[158px]"/>

                <div className="absolute top-32  left-0 right-0 w-full space-y-5">
                    <h1 onClick={dashboard_} className="cursor-pointer text-center">Dashboard</h1>
                    <h1 onClick={view_admin_} className="cursor-pointer text-center -ml-[1.5rem]">Admins</h1>
                    <h1 className="text-center -ml-[2.0rem]">Report</h1>
                </div>

                <h1 onClick={handleLogout} className="cursor-pointer -ml-[2.0rem] text-center absolute bottom-10 left-0 right-0 underline">Logout</h1>
              </div>
              
              <div className= "relative overflow-y-auto overflow-hidden h-screen flex flex-col col-span-3">
                  <div onClick={admin_add_} className="cursor-pointer flex flex-row space-x-5 justify-end mt-4 mr-4">
                      <div className="shadow-md shadow-gray-600 drop-shadow relative w-[13rem] h-[2.5rem] border text-white border-[#714E2C] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] px-8 py-3">
                          <IoAddCircle className="size-[23px] mt-[0.5rem] absolute top-0 bottom-0 left-9 "/>
                          <button className="absolute top-0 bottom-0 right-10 text-[20px]">Add Admin</button>
                      </div>
                  </div>
                  
                  <h1 className="text-center flex flex-row relative">
                      <input id="search_input" type= "search" className="shadow-md shadow-gray-500 absolute  left-32 right-32 mt-[53px] justify-center items-center mx-auto align-middle text-left px-4 pl-16 py-3 rounded-xl bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]" placeholder="Search Admin"/>
                      <IoSearchSharp onClick={allow_search}  className="absolute  left-[9.2rem] right-32 mt-[65px] size-7" color="#714E2C"/>
                      {/* <input className="absolute left-5 right-5 items-center justify-center mx-auto w-[1026px] h-[79] text-left px-4 pl-16 py-3 rounded-xl mt-[50px] bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Search Model"/> */}
                  </h1>

                  <div className="flex flex-col  mt-[125px] mb-32 text-[#714E2C] px-[126px]">
                    <h1 className="text-2xl font-bold mb-2">Admin(s)</h1>

                    {model_json_data}

                  </div>



                  {cancel_delete 
                      ?  <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center  top-0 bottom-0 left-0 right-0">
                              <div className="flex flex-col items-center rounded-xl px-6 py-14 bg-gray-200 text-red-600">
                                  <h1 className="text-center font-bold">Are you sure you want to delete?</h1>
                                  <div className="flex space-x-4 mt-6">
                                      <button onClick={cancel_delete_} className="bg-green-900 text-white w-20 py-2 rounded-3xl">
                                          Cancel
                                      </button>

                                      <button onClick={continue_delete_} className="bg-gray-900 w-20 py-2 rounded-3xl">
                                          Yes
                                      </button>
                                  </div>
                              </div>
                          </div>
                      
                      
                      :   <div> </div> 
                  }

                  {continue_delete 
                      ? 
                          <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                              <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                              </svg>
                              Deleting data
                          </div>
                      
                      :   <div> </div>
                  }

              </div>




              {/* <div className="w-fullshadow-lg drop-shadow shadow-black/70 absolute items-center flex flex-col m-10 bg-white top-0 bottom-0 left-0 right-0">
                <div className="w-full flex-col">

                  <h1 className="text-center p-4  font-bold text-2xl">Admin Data Information</h1>
                  
                  <table className="m-2 ">
                    <thead className=" border border-black ">
                      <tr className=" grid grid-cols-3 w-full p-2 space-x-4">
                        <div className=" col-span-2 w-full">
                          <th className=" uppercase">username</th>
                          <th className=" uppercase">activated</th>
                          <th className=" uppercase">registration_date</th>
                          <th className=" uppercase">role</th>
                        </div>
                   
                        <th className="w-full  justify-center uppercase">user_models</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                
              </div> */}
              
          </div>




        : <SessionExpired />}
    </div>
  );
}
