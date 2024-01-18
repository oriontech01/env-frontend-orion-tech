import Nav_ from "../components1/nav";
import { IoSearchSharp } from "react-icons/io5";

import image1 from "../assets1/images/1.png";
import success_mark from "../assets1/images/success_mark.png";


export default function EditObjectsModel() {

    // <div className={`bg-black col-span-3 h-[${main_view_height}px]`} >
    
    return (
      <div className="max-h-screen flex flex-col">
        <div className="relative h-screen object-cover overflow-hidden">
          <div className= "right-0 overflow-hidden grid grid-cols-4 h-screen  bg-[#EEEEEE]">
              {/* <div className="bg-black col-span-3 " >

              </div> */}

              <img alt="/" src={image1} className="col-span-3 object-cover w-screen h-screen"/>
              
              <h1 className=" my-6 overflow-y-auto mt-6 text-center flex flex-col">
                <div className="flex flex-col mx-10 mb-15">
                <h1 className="text-[#714E2C] font-bold text-left text-2xl pb-8">Input Data</h1>


                  <label htmlFor="Listeria" className="flex flex-col text-left text-[#714E2C]">
                    Listeria
                  </label>
                  <select value={'cefevef'} className="text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4   py-2  bg-[#B9A88B]">
                      <option>select value</option>
                      <option>Negative</option>
                      <option>Positive</option>
                  </select>

                  <label htmlFor="APC" className="flex flex-col text-left text-[#714E2C]">
                    APC
                  </label>
                  <input type="number" min={0} max={1000} placeholder="0 - 1000" className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                  <label htmlFor="Salmonella" className="flex flex-col text-left text-[#714E2C]">
                    Salmonella
                  </label>
                  <select value={'cefevef'} className="text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4   py-2  bg-[#B9A88B]">
                      <option>select value</option>
                      <option>Negative</option>
                      <option>Positive</option>
                  </select>

                  <label htmlFor="Date of sample" className="flex flex-col text-left text-[#714E2C]">
                    Date of sample:
                  </label>
                  <input type="date" min={0} max={1000} placeholder="Type here" className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                  <label htmlFor="Time of sample" className="flex flex-col text-left text-[#714E2C]">
                    Time of sample:
                  </label>
                  <input type="time" min={0} max={1000} placeholder="Type here" className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                  <label htmlFor="Type of sample" className="flex flex-col text-left text-[#714E2C]">
                    Type of sample:
                  </label>
                  <input type="text" min={0} max={1000} placeholder="Type here" className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />


                  <button className="shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2 font-bold my-2 mb-6">Save Data</button>
                  <button className="shadow-md shadow-gray-600 drop-shadow hover:bg-[#714E2C] hover:border-white hover:text-white border border-[#714E2C] text-[#714E2C] font-bold text-[15px] px-2 py-2">Cancel</button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </h1>
          </div>



          {/* <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
              <svg className="animate-spin h-10 w-10 bg-blue-700 mb-4" viewBox="0 0 24 24">
              </svg>
              Uploading data
          </div> */}

          {/* <div className="bg-[#B9A88B] h-screen flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 ">
            <img alt="/" src={success_mark} className="jmx-auto size-[177.19px]" />
            <h1 className="text-[38px] text-center">Upload successful</h1>
            <button className="border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2 mt-20 font-bold my-2">Back to dashboard</button>
          </div> */}
          
        </div>
      </div>
    );
  }
