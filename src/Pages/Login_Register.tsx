import login_img from "../images/login_side_image.png";
import human from "../images/human.png";
import rocket from "../images/boost.png"
import eye_open from "../images/eye_open.png";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import Login_form from "../components/login_register_com/login_form";
import Register_Head from "../components/login_register_com/register_head";
import Login_Head from "../components/login_register_com/login_head";
import Register_Form from "../components/login_register_com/register_form";
import { useState } from "react";

const Login_Register = () => {

    // const onChange: CheckboxProps['onChange'] = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log("Form submitted");
    // };

    const [isRegister, setIsRegister] = useState(false);
    const [isLogin , setIsLogin] = useState(false)
    const [handleDefault , setHandleDefault] = useState(true)

    const handleToggleToSignupPage = () => {
        setIsRegister(true)
        setIsLogin(false)
        setHandleDefault(false)
    }

    const handleToggleToLoginPage = () => {
        setIsLogin(true)
        setIsRegister(false)
        setHandleDefault(false)
    }

    return (

    <div className="w-screen h-screen bg-[#a8b0ff] flex justify-center items-center">

        <div className="w-[90%] h-[95%] flex justify-center items-center">
        
            <div className="absolute top-20 left-82 w-[63%] h-[86%] bg-[#e4e7f4] rounded-xl shadow-lg z-0" />
            <div className="absolute top-10 left-93 w-[63%] h-[86%] bg-[#e4e7f4] rounded-xl shadow-xl z-10" />

        
            <div className="relative z-20 w-[70%] h-[90%] rounded-2xl shadow-2xl flex bg-[#e8ecf8]">
                
                <div className="w-[40%] p-10 flex flex-col justify-evenly">
                    <div className="w-[80%]">
                        <h1 className="font-Poppins text-[#4a79ff] p-2 text-4xl"><span className="text-blue-700 font-Poppins">Welcome</span> to our Communtiy</h1>
                    </div>

                    <div className="w-[70%] mt-2">
                        <p className="text-gray-600 p-2 font-Poppins">A whole new productive journey starts right here</p>
                    </div>
                    <div className="w-[50%] flex mt-10">
                        <div className="w-[50%]">
                            <img src={human} />
                        </div>

                        <div className="w-[50%] flex justify-center items-center">
                            <img src={rocket}/> 
                       </div>
                    </div>

                </div>

                {handleDefault && (
                <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center ">
                    <Login_Head onSwitch={handleToggleToSignupPage} />
                    <Login_form />    
                </div>
                )}


                {/* <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center">
                {isRegister ? (
                    <>
                        <Register_Head onSwitch={handleToggleToLoginPage} />
                        <Register_Form />
                    </>

                    ) : (

                    <>
                        <Login_Head onSwitch={handleToggleToSignupPage} />
                        <Login_form />
                    </>
                    )}
                </div> */}


                {isRegister && (
                    <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center">
                        <Register_Head onSwitch={handleToggleToLoginPage} />
                        <Register_Form onSwitch={handleToggleToLoginPage}/>
                    </div>
                )}


                {isLogin && (
                    <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center">
                        <Login_Head onSwitch={handleToggleToSignupPage} />
                        <Login_form />
                    </div>
                )}

                
            </div>

        </div>
    </div>

    );
};

export default Login_Register;
