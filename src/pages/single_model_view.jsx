import Nav_New from "../components1/nav_new";
import { IoSearchSharp } from "react-icons/io5";




export default function SingleModelView() {

    // <div className={`bg-black col-span-3 h-[${main_view_height}px]`} >
    
    return (
      <div className="max-h-screen flex flex-col">
        <Nav_New />
        <div className= "overflow-hidden grid grid-cols-4 h-screen  bg-[#EEEEEE]">
            {/* <div className="bg-black col-span-3 " >

            </div> */}

            {/* <ThreeFiberApp /> */}
            {/* <img alt="/" src={image1} className="col-span-3 object-cover w-screen h-screen"/> */}
{/*             
            <h1 className="overflow-y-auto mt-6 ml-10 text-center flex flex-row relative">
                <input className="absolute  mt-[0px] justify-center items-center align-middle text-left px-4 pl-16 py-3 shadow-lg rounded-xl bg-[#D3D3D3] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Search Object"/>
                <IoSearchSharp className="absolute ml-5  mt-[12px] size-7" color="#714E2C"/>

                <ul className="absolute top-20 left-0 right-0">
                <li className="text-[18px] text-left font-bold text-[#714E2C]">Chair Information:</li>
                    <hr />
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Color: <span className="font-normal">Brown and Gold</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Height: <span className="font-normal">300</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Width: <span className="font-normal">600</span></li>


                    <br />
                    <br />
                    
                    <li className="text-[18px] text-left font-bold text-[#714E2C]">Types of sample result:</li>
                    <hr />
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Listeria: <span className="font-normal">Pro</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">APC: <span className="font-normal">300</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Salmonella: <span className="font-normal">Negative</span></li>


                    <br />
                    <br />
                    <li className="text-[18px] text-left font-bold text-[#714E2C]">Tag Details:</li>
                    <hr />
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Date: <span className="font-normal">29 December, 2023</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Time of sample:: <span className="font-normal">14:15 Pm</span></li>
                    <li className="text-[14px] font-bold text-left text-[#714E2C]">Type of sample:: <span className="font-normal">Urus</span></li>
                </ul>
            </h1> */}
        </div>
      </div>
    );
  }
