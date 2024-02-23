import p1 from "../../assets/images/p1.jpeg";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


export default function NavHeader (props) {
    const titleMenuProp_= props.navTitle;
    const mobileMenuProp_= props.mobileMenuProp_;
    const mobileMenu= props.mobileMenu;

    const navigate= useNavigate();


    const GoBack= () => {
        navigate(-1);
    }


    {/* ++++++++++++++++++++++ HEADER +++++++++++++++++ */}
    {/*IF YOU APPLY STICKY TO AN ELEMENT, IT WILL SCROLL BUT WHEN IT GETS TO THE TOP IT STICKS*/}
    return (
        <div className="sticky top-0 lg:py-4 py-2 lg:px-16 sm:px-10 px-3 border gap-x-8 bg-green-100 flex justify-between items-center shadow-md ">
            
            <div className='flex items-center gap-x-4 md:w-full'>
                <button onClick={(e) => {GoBack(e)}} className='border p-[4px] rounded-full bg-black/20 hover:bg-white my-shadow-style'>
                    <IoArrowUndo className='sm:size-[25px]'/>
                </button>

                <div className=" md:flex hidden flex-row justify-between w-full border-0 ">  
                    <h1 className=" font-bold text-2xl scale-100">{titleMenuProp_}</h1>

                    <div className="flex items-center space-x-4 scale-100 ">
                        <div className="my-picture-style w-10">
                            <img alt="profile picture" src={p1} className="object-cover"/>
                        </div>
                        <h1 className="font-bold">Jakande Bablola</h1>
                    </div>
                </div>
            </div>


            <div className="md:hidden w-full flex flex-col items-center border shadow">  
                <h1 className=" font-bold text-2xl scale-75">{titleMenuProp_}</h1>

                <div className="flex items-center space-x-4 scale-75">
                    <div className="my-picture-style w-10">
                        <img alt="profile picture" src={p1} className="object-cover"/>
                    </div>
                    <h1 className="font-bold">Jakande Bablola</h1>
                </div>
            </div>


            {/* +++++++++++++++ SMALL DISPLAY ++++++++++++++++++ */}
            <div className="lg:hidden flex ">
                {
                    mobileMenu 
                        ?
                            <IoClose onClick={ (e) => {mobileMenuProp_()}} className="sm:scale-[320%] scale-[220%] cursor-pointer" />
                        : 
                            <TiThMenu onClick={ (e) => {mobileMenuProp_()}} className="sm:scale-[240%] scale-[180%] cursor-pointer" />
                }
            </div>

        </div>
    );
}
