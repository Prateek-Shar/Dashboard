import eye_open from "../../images/eye_open.png";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import google from "../../images/google.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import { useState } from "react";
import cross from "../../images/cross.png"
import { useNavigate } from "react-router-dom";
import uncheck_checkbox from "../../images/checkbox_uncheck.png";
import checked_checkbox from "../../images/checkbox_checked.png";
import { set } from "mongoose";

interface ToggleToSwitch {
    onSwitch : () => void
}



const Register_Form:React.FC<ToggleToSwitch> = ( {onSwitch} ) => {

    const navigate = useNavigate()

    const default_form = {
        Username: "",
        Email: "",
        Password: "",
        Profession: "",
    } 

    const [form, setForm] = useState(default_form);
    const [errorDiv , setErrorDiv] = useState(false)
    const [isChecked , setIsChecked] = useState(false)
    const [typeText , setTypeText] = useState(false)



    // const onChange: CheckboxProps['onChange'] = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // }; 

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isChecked) {
            alert("You must agree to Terms and Condition before SignUp")
        }

        const res = await fetch("http://localhost:8080/newUser" , {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (res.ok) {

            // if (data.login_success) {
                console.log("User registered successfully:", data);
                onSwitch()
            // }
        }

        if (!res.ok) {
        
            if (data.existing_error) {
                setErrorDiv(true);
                setForm({ ...default_form });
            }

        console.error("Failed to register user");
        return;

        }   
        // setErrorDiv(false); // clear error on success
        // setForm({ ...default_form });
    };


    
    const togglePassword = () => {
        setTypeText(prev => !prev);
    }

    return (
        <div className="w-[80%] mt-20">
            <form onSubmit={handleSubmit} className="flex flex-col">
                
                <div className="w-full ] flex justify-center mt-5">
                    <input type="text" placeholder="Enter User Name" onChange={handleChange} value={form.Username} name="Username" className="w-[70%] bg-[#e0e6f9] rounded-2xl p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                </div>
                 
                {errorDiv && (
                    <div className="w-full flex justify-center">
                        <div className="w-[70%] flex">
                            <div className="w-[10%] flex justify-center items-center">
                                <img src={cross} className="object-contain w-[80%] p-2" />
                            </div>

                            <div className="w-[90%]">
                                <p className="font-Poppins p-1 text-red-600">Username Already Found</p>
                            </div>
                        </div>
                    </div>
                )}  

                <div className="w-full mt-8 flex justify-center">
                    <input type="text" placeholder="Enter Email" value={form.Email} onChange={handleChange} name="Email" className="p-5 w-[70%] bg-[#e0e6f9] rounded-2xl placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0" />
                </div>

                <div className="w-full flex mt-8 mb-2 justify-center">
                    <div className="w-[60%] bg-[#e0e6f9] rounded-l-2xl">
                        <input type={typeText ? "text" : "password"} placeholder="Enter Password" value={form.Password} onChange={handleChange} name="Password" className="w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                    </div>

                    <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                        <img src={eye_open} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword}/>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-8">
                    <input type="text" placeholder="Enter Profession" onChange={handleChange} value={form.Profession} name="Profession" className="w-[70%] rounded-2xl p-5 bg-[#e0e6f9] placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                </div>

                {/* <div className="w-full p-2 mt-4 flex">
                    <Checkbox onChange={OnChange} style={{fontFamily : "Poppins Medium" , paddingLeft : "90px"}}>Agree to Terms and Condition</Checkbox>
                </div> */}

                <div className="w-full p-2 mt-4 flex justify-center">
                    <div className="w-[10%] flex justify-center">
                        <img src={!isChecked ? uncheck_checkbox : checked_checkbox} onClick={handleCheckbox} className="w-[50%] object-contain"/>
                    </div>

                    <div className="w-[50%] flex items-center">
                        <p className="font-Poppins">Agree To Terms and Conditions</p>
                    </div>
                </div>

                <div className="w-full p-2 flex mt-10  mb-5 justify-center">
                    <div className="w-[40%] bg-[#3062f0] flex rounded-3xl shadow-2xl shadow-blue-400">
                        <button type="submit" className="w-full text-white font-Poppins hover:cursor-pointer p-3">Sign Up</button>
                    </div>
                </div>
            </form>
            
        </div>
    )

}

export default Register_Form;