import React, { useState } from 'react'

import { RiDeleteBinLine } from "react-icons/ri";
// import SearchIcon from '@mui/icons-material/Search';

import profile_pic1 from "../../assets/images/profile_pic1.jpeg";
import profile_pic2 from "../../assets/images/profile_pic2.jpeg";
import profile_pic3 from "../../assets/images/profile_pic3.jpeg";


const UsersLists = () => {
    const [role, setRole]= useState("Tagger");

    return (
        <div className="relative top-[100px] flex flex-col gap-y-4 w-full">
                                
            <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl">     
                <div className="sm:relative sm:flex md:hidden hidden cursor-pointer">
                        <RiDeleteBinLine className="text-red-700 absolute right-0 top-3 flex scale-[150%] cursor-pointer"/>
                </div>

                <div className="flex items-center md:justify-start justify-center md:w-fit w-full">  
                    <div className="flex md:flex-row flex-col gap-x-3 items-center">
                        <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                            <img src={profile_pic2} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                        </div>

                        <div className="flex flex-col sm:w-[150px] w-[90px]">
                            <h1 className="md:text-start text-center text-[20px] truncate">
                                Anike Paul
                            </h1> 

                            <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                Admin
                            </h1> 
                        </div>
                    </div>

                    <div className="sm:hidden relative flex cursor-pointer">
                        <RiDeleteBinLine className="text-red-700 absolute flex scale-[150%] cursor-pointer"/>
                    </div>
                </div>



                <div className="flex md:mt-0 mt-6 md:w-fit w-full">
                    <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                        <option >Admin</option>
                        <option >Tagger</option>
                        <option >Reviewer</option>
                    </select>
                </div>


                <div className="flex items-center gap-x-6 md:w-fit w-full">
                    <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white hover:animate-pulse ">
                        View Profile
                    </button>

                    <RiDeleteBinLine className="text-red-700 md:flex hidden scale-[150%] cursor-pointer"/>
                </div>
            </div>



            <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl">     
                <div className="sm:relative sm:flex md:hidden hidden cursor-pointer">
                        <RiDeleteBinLine className="text-red-700 absolute right-0 top-3 flex scale-[150%] cursor-pointer"/>
                </div>

                <div className="flex items-center md:justify-start justify-center md:w-fit w-full">  
                    <div className="flex md:flex-row flex-col gap-x-3 items-center">
                        <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                            <img src={profile_pic1} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                        </div>

                        <div className="flex flex-col sm:w-[150px] w-[90px]">
                            <h1 className="md:text-start text-center text-[20px] truncate">
                                Ajiun Solomon
                            </h1> 

                            <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                Tagger
                            </h1> 
                        </div>
                    </div>

                    <div className="sm:hidden relative flex cursor-pointer">
                        <RiDeleteBinLine className="text-red-700absolute flex scale-[150%] cursor-pointer"/>
                    </div>
                </div>



                <div className="flex md:mt-0 mt-6 md:w-fit w-full">
                    <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                        <option >Admin</option>
                        <option >Tagger</option>
                        <option >Reviewer</option>
                    </select>
                </div>


                <div className="flex items-center gap-x-6 md:w-fit w-full">
                    <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white hover:animate-pulse ">
                        View Profile
                    </button>

                    <RiDeleteBinLine className="text-red-700 md:flex hidden scale-[150%] cursor-pointer"/>
                </div>
            </div>





            <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl">     
                <div className="sm:relative sm:flex md:hidden hidden cursor-pointer">
                        <RiDeleteBinLine className="text-red-700 absolute right-0 top-3 flex scale-[150%] cursor-pointer"/>
                </div>

                <div className="flex items-center md:justify-start justify-center md:w-fit w-full">  
                    <div className="flex md:flex-row flex-col gap-x-3 items-center">
                        <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                            <img src={profile_pic3} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                        </div>

                        <div className="flex flex-col sm:w-[150px] w-[90px]">
                            <h1 className="md:text-start text-center text-[20px] truncate">
                            Chuwkuebukaeefefeededede
                            </h1> 

                            <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                User
                            </h1> 
                        </div>
                    </div>

                    <div className="sm:hidden relative flexcursor-pointer ">
                        <RiDeleteBinLine className="absolute flex scale-[150%] cursor-pointer text-red-700"/>
                    </div>
                </div>



                <div className="flex md:mt-0 mt-6 md:w-fit w-full">
                    <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                        <option >Admin</option>
                        <option >Tagger</option>
                        <option >Reviewer</option>
                    </select>
                </div>


                <div className="flex items-center gap-x-6 md:w-fit w-full">
                    <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white hover:animate-pulse ">
                        View Profile
                    </button>

                    <RiDeleteBinLine className="md:flex hidden scale-[150%] cursor-pointer text-red-700"/>
                </div>
            </div>




            <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl">     
                <div className="sm:relative sm:flex md:hidden hidden cursor-pointer">
                        <RiDeleteBinLine className="absolute right-0 top-3 flex scale-[150%] cursor-pointer text-red-700"/>
                </div>

                <div className="flex items-center md:justify-start justify-center md:w-fit w-full">  
                    <div className="flex md:flex-row flex-col gap-x-3 items-center">
                        <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                            <img src={profile_pic2} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                        </div>

                        <div className="flex flex-col sm:w-[150px] w-[90px]">
                            <h1 className="md:text-start text-center text-[20px] truncate">
                            Chuwkuebukaeefefeededede
                            </h1> 

                            <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                User
                            </h1> 
                        </div>
                    </div>

                    <div className="sm:hidden relative flex cursor-pointer">
                        <RiDeleteBinLine className="absolute flex scale-[150%] cursor-pointer text-red-700"/>
                    </div>
                </div>



                <div className="flex md:mt-0 mt-6 md:w-fit w-full">
                    <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                        <option >Admin</option>
                        <option >Tagger</option>
                        <option >Reviewer</option>
                    </select>
                </div>


                <div className="flex items-center gap-x-6 md:w-fit w-full">
                    <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white hover:animate-pulse ">
                        View Profile
                    </button>

                    <RiDeleteBinLine className="md:flex hidden scale-[150%] cursor-pointer text-red-700"/>
                </div>
            </div>




            <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl">     
                <div className="sm:relative sm:flex md:hidden hidden">
                        <RiDeleteBinLine className="absolute right-0 top-3 flex scale-[150%] cursor-pointer text-red-700"/>
                </div>

                <div className="flex items-center md:justify-start justify-center md:w-fit w-full">  
                    <div className="flex md:flex-row flex-col gap-x-3 items-center">
                        <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                            <img src={profile_pic1} className="my-image-cover-style w-[100%] h-[100%] flex"/>
                        </div>

                        <div className="flex flex-col sm:w-[150px] w-[90px]">
                            <h1 className="md:text-start text-center text-[20px] truncate">
                            Chuwkuebukaeefefeededede
                            </h1> 

                            <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                User
                            </h1> 
                        </div>
                    </div>

                    <div className="sm:hidden relative flex ">
                        <RiDeleteBinLine className="absolute flex scale-[150%] cursor-pointer text-red-700"/>
                    </div>
                </div>



                <div className="flex md:mt-0 mt-6 md:w-fit w-full">
                    <select  value={"Tagger"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                        <option >Admin</option>
                        <option >Tagger</option>
                        <option >Reviewer</option>
                    </select>
                </div>


                <div className="flex items-center gap-x-6 md:w-fit w-full">
                    <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white hover:animate-pulse ">
                        View Profile
                    </button>

                    <RiDeleteBinLine className="md:flex hidden scale-[150%] cursor-pointer text-red-700"/>
                </div>
            </div>

        </div>
    )
}

export default UsersLists;