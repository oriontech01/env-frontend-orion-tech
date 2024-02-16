import { useState } from "react";
import DesktopMenu from "../../components/1_super_admin/desktop_menu";
import HistogramChartSuperAdmin from "../../components/1_super_admin/histogram_chart_super_admin";
import UsersLists from "../../components/1_super_admin/users_lists";
import PieChartSuperAdmin from "../../components/1_super_admin/pie_chart_super_admin";
import MobileMenu from "../../components/1_super_admin/mobile_menu";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavHeader from "../../components/1_super_admin/nav_header";



export default function SuperUsersManagement(){
    const [mobileMenu, setMobileMenu]= useState(false);

    const navigate= useNavigate();

    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }

    const navigate_add_user = (e) => {
        navigate("/admin-user-add", {relative: true});
    }


    return (
        <div className="lg:grid lg:grid-cols-5 relative flex w-screen h-screen overflow-hidden">
            
            {/* ++++++++++++++++++ FULLSCREEN NAV +++++++++++++++++ */}
            <DesktopMenu sendActive= {"users"}/>


            {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
            <div className="relative overflow-y-scroll lg:col-span-4 flex flex-col w-full">
                
                <div className="my-screen-padding absolute md:top-6 top-10 left-0 right-0 grid grid-rows-4 w-full h-screen">
                    <div className="flex flex-col w-full">

                        {/* +++++++++++++ SEARCH INPUT +++++++++ */}
                        <div className="relative top-6 flex items-center w-full">
                            <input type="text" placeholder="Search users" className="absolute border rounded-3xl p-4 w-full sm:h-[53px] h-[40px] my-shadow-style sm:focus:pl-[68px] focus:pl-[40px] focus:placeholder-transparent sm:pl-[64px] pl-[35px] sm:text-base text-sm"/>

                            <FaSearch className="absolute left-0 sm:mx-[30px] mx-[12px] scale-[130%] text-gray-500"/>

                            <button className="my-button-style sm:text-[18px] text-sm my-0 absolute right-0 sm:py-[16px] sm:px-[29px] px-2 sm:h-[55px] h-[43px] ">Search</button>
                        </div>



                        {/* +++++++ USERS LIST ++++++++++ */}
                        <UsersLists />


                        <div className="relative top-[120px] flex w-full justify-end sm:mt-0 -mt-[35px]">
                            <button onClick={ (e) => {navigate_add_user(e)}} className="my-button-style sm:py-2  my-shadow-style flex items-center sm:scale-90 scale-75">
                                <span className="sm:text-[27px] text-[20px]  sm:-mt-[6px] mr-2">+</span> Add User
                            </button>
                        </div>



                        <div className="pb-10 relative top-[140px] flex justify-between w-full md:px-[200px] sm:px-[100px] px-[10px] sm:text-base text-[12px]">
                            <button className="font-medium underline">
                                Prev
                            </button>


                            <div className="flex w-full justify-between sm:px-16 px-4">
                                <button className="hover:bg-gray-300 bg-black text-white sm:px-2 px-[6px] rounded-full">
                                    1
                                </button>

                                <button className="hover:bg-gray-300 text-black px-2 rounded-full">
                                    2
                                </button>

                                <button className="hover:bg-gray-300 text-black px-2 rounded-full">
                                    3
                                </button>

                                <button className="hover:bg-gray-300 text-black px-2 rounded-full">
                                    4
                                </button>

                                <button className="hover:bg-gray-300 text-black px-2 rounded-full">
                                    5
                                </button>

                            </div>


                            <button className="font-medium underline">
                                Next
                            </button>

                        </div>



                    </div>
                </div>


                <NavHeader navTitle= {"Users"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

            </div>




            <MobileMenu mobileMenu= {mobileMenu} sendActive= {"users"} />

        </div>
    );
}