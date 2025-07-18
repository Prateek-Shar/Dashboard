import React from "react"
import activity from "../../images/activity.png"
import customer from "../../images/customer.png"
import income from "../../images/income.png";
import man from "../../images/man.png";
import box from "../../images/product.png";
import right from "../../images/right.png"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/login_context";


const Sidebar = () => {

    const { userDetails } = useUser();

    const navigate = useNavigate()

    const handleClickToCustomers = () => {
        navigate("/customer")
    }

    const handleClickToProducts = () => {
        navigate("/products")
    }

    const handdleClicktoIncome = () => {
        navigate("/Income")
    }

    return (
        <div className="w-[20%] bg-white">

            <div className="w-full flex flex-col justify-center items-center">
                <div className='w-full flex justify-center mt-2'>
                    <div className='w-[15%] flex items-center'>
                        <img src={activity} />
                    </div>

                    <div className='w-[75%] flex pl-2 items-center'>
                        <p className='font-Poppins text-3xl pl-2'>Dashboard</p>
                    </div>
                </div>

                <div className="w-[80%] flex mt-10">
                    <div className="w-[20%] b">
                        <img src={box} className="object-contain w-[70%] m-2" />
                    </div>

                    <div className="w-[60%] flex items-center ml-2">
                        <p className="font-Poppins text-[16px] text-[#9197b3]">Product</p>
                    </div>

                    <div className="w-[20%] flex items-center justify-center">
                        <img src={right} onClick={handleClickToProducts} className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                    </div>
                </div>

                <div className="w-[80%] mt-2 flex">
                    <div className="w-[20%]">
                        <img src={customer} className="object-contain w-[70%] m-2" />
                    </div>

                    <div className="w-[60%] flex items-center ml-2">
                        <p className="font-Poppins text-[16px] text-[#9197b3]">Customers</p>
                    </div>

                    <div className="w-[20%] flex items-center justify-center">
                        <img src={right} onClick={handleClickToCustomers} className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                    </div>
                </div>

                <div className="w-[80%] mt-2 flex">
                    <div className="w-[20%]">
                        <img src={income} className="object-contain w-[70%] m-2" />
                    </div>

                    <div className="w-[60%] flex items-center ml-2">
                        <p className="font-Poppins text-[16px] text-[#9197b3]">Income</p>
                    </div>

                    <div className="w-[20%] flex items-center justify-center">
                        <img src={right} onClick={handdleClicktoIncome} className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                    </div>
                </div>

                <div className="w-[80%] flex justify-center items-center mt-22">
                    <div className="w-[80%] bg-linear-to-r from-[#e8a9f0] to-[#512ce9]  flex flex-col justify-center items-center mt-50 mb-4 rounded-4xl">
                        <div className="w-[80%]  mt-2 mb-2 flex justify-center items-center">
                            <p className="font-Poppins p-2 text-amber-50 text-[14px]">Upgrade to PRO to get access to  all the features</p>
                        </div>

                        <div className="w-[80%] rounded-3xl mt-6 mb-4 bg-white">
                            <button className="w-full font-Poppins pt-3 pb-3 rounded-3xl text-[#4925e9]">Get Pro Now !</button>
                        </div> 
                    </div>
                </div>

                <div className="w-[80%] flex mt-12 mb-9 justify-center items-center">
                    <div className="w-[20%]  flex justify-center items-center mr-2">
                        <img src={man} className="w-[80%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">
                        <div>
                            {userDetails ? (
                                <>
                                <div className="w-full pt-1 pb-1 pl-2">
                                    <h1 className="font-Poppins">{userDetails.Username}</h1>
                                </div>

                                <div className="w-full pt-1 pb-1 pl-2">
                                    <p className="font-Poppins text-[#989898] text-[13px]">{userDetails.Profession}</p>
                                </div>
                                </>
                            ) : (
                                <p className="font-Poppins">Loading user...</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Sidebar