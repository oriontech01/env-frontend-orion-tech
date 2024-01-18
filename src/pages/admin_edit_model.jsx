import { IoSearchSharp } from "react-icons/io5";
import CardsGridManagement from "../components1/cardsgridmanagement";
import emapping from "../assets1/images/emapping.png"
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";




export default function AdminEditModel() {
    const navigate= useNavigate();
    function edit_model_objects_(event){
        navigate('/edit-model-objects', {relative: true});
    }

    const view_admin= useNavigate();
    function view_admin_(event){
        view_admin('/view-admin', {relative: true});
    }

    const dashboard_management= useNavigate();
    function dashboard_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        dashboard_management('/admin-model-management', {relative: true});
    }

    const home_page= useNavigate();
    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }
    

    return (
      <div>
        <div className="max-h-screen grid grid-cols-4 justify-center items-center mx-auto bg-[#C3B598] pb-10">
            
            <div className= "text-white relative overflow-hidden h-screen justify-start justify-items-start items-start text-start bg-[#714E2C]"> 
                <img alt="/" src={emapping} onClick={home_page_} className="cursor-pointer absolute top-5 left-0 right-0 mx-auto w-[158px]"/>

                <div className="absolute top-32  left-0 right-0 w-full space-y-5">
                    <h1 onClick={dashboard_} className="cursor-pointer text-center">Dashboard</h1>
                    <h1 onClick={view_admin_} className="cursor-pointer text-center -ml-[1.5rem]">Admins</h1>
                    <h1 className="text-center -ml-[2.0rem]">Report</h1>
                </div>

                <h1 className="-ml-[2.0rem] text-center absolute bottom-10 left-0 right-0 underline">Logout</h1>
            </div>
            
            <div className="h-screen col-span-3 flex flex-col  items-center justify-center">
                <h1 className="flex text-[30px] text-[#714E2C] font-bold text-center mb-7">Edit Model</h1>

                <h1 className="text-center self-stretch flex flex-col mx-[20%]">
                    <input  autoFocus className="flex shadow-md shadow-gray-500 text-left my-4 px-4 pl-6 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Model Name"/>
                    <textarea rows={3} maxLength={87} autoComplete="" className="resize-none flex shadow-md shadow-gray-500 text-left px-4 pl-6 py-3 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Model Description"/>

                    <div className="relative hover:bg-[#714E2C] hover:text-[#B9A88B] my-4 shadow-md shadow-gray-500  bg-[#B9A88B] text-[#714E2C] py-8 rounded-full">
                        <LuImagePlus className="mx-auto size-[65px] my-2" />
                        <h1 className="abolute left-0 right-0 top-0 bottom-0">Click to attach cover image</h1>
                    </div>

                    <div className="h-6 bg-gray-400 rounded-full w-[100%] my-4 shadow-md shadow-gray-500">
                        <div className="text-white bg-blue-700 rounded-full w-[35%]">35%</div>
                    </div>
                    <button onClick={edit_model_objects_} className="shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2  rounded-full font-bold">Edit Objects Interactions</button>
                
                </h1>

            </div>
            
        </div>
      </div>
    );
  }
