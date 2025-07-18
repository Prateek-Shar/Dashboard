import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select } from 'antd';
import { useState } from 'react';
import type { UploadProps } from 'antd';
import check from "../../images/check.png";

const NewCustomerForm = () => {

    const defaultForm = {
        Customer_name : "",
        Company_name : "",
        Contact_no : "",
        Country : "",
        Email : "",
        Status : "",
        Created_at : new Date()
    };

    // const [productId, setProductId] = useState(1); // Start ID from 1
    const [form, setForm] = useState({ ...defaultForm }); // First product gets ID 1

    const [showheading1 , setShowHeading1] = useState(false)
    const [showheading2 , setShowHeading2] = useState(false)
    const [showheading3 , setShowHeading3] = useState(false)
    const [showheading4 , setShowHeading4] = useState(false)
    const [showheading5 , setShowHeading5] = useState(false)

    const [placeholderCustomerName , setPlaceholderCustomerName] = useState("Enter Customer Name")
    const [placeholderCompamyName , setPlaceholderCompanyName] = useState("Enter Company Name")
    const [placeholderContact , setPlaceholderContact] = useState("Enter Contact Number")
    const [placeholderCountry , setPlaceholderCountry] = useState("Enter Country")
    const [placeholderEmail , setPlaceholderEmail] = useState("Enter Email Address")
    // const [placeholderStatus , setPlaceholderStatus] = useState("")
    
    const [finalDiv , setFinalDiv] = useState(false)

    const divsChange = () => {
        setShowHeading1(false)
        setShowHeading2(false)
        setShowHeading3(false)
        setShowHeading4(false)
        setShowHeading5(false) 
        setPlaceholderCustomerName("Enter Customer Name")
        setPlaceholderCompanyName("Enter Company Name")
        setPlaceholderContact("Enter Contact Number")
        setPlaceholderCountry("Enter Country")
        setPlaceholderEmail("Enter Email Address")
    }


    const sendCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        const formToSend = { ...form };
        console.log(formToSend)

        try {
            const res = await fetch("http://localhost:8080/send_customer", {
                method: "POST",
                credentials : "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formToSend),
            });

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            console.log(data)
            setFinalDiv(true)
            divsChange()

            // Increment productId for next product
            // const newProductId = productId + 1;
            // setProductId(newProductId);

            // Reset form with new Product ID
            setForm({ ...defaultForm });

        } catch (err) {
            console.log("Failed to submit data")
        }
    };

    const showHeading = () => {
        setShowHeading1(true)
        setPlaceholderCustomerName("")
    }

    const showHeading2 = () => {
        setShowHeading2(true)
        setPlaceholderCompanyName("")
    }

    const showHeading3 = () => {
        setShowHeading3(true)
        setPlaceholderContact("")
    }

    const showHeading4 = () => {
        setShowHeading4(true)
        setPlaceholderCountry("")
    }


    const showHeading5 = () => {
        setShowHeading5(true)
        setPlaceholderEmail("")
    }


    // const showHeading6 = () => {
    //     setShowHeading3(true)
    //     setPlaceholderPrice("")
    // }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm(prev => ({
            ...prev,
            [name]: name === "Contact_no" ? Number(value) : value
        }))
    };

    const handleSelectChange = (value: string) => {
        setForm(prev => {
            const updated = { ...prev, Status: value };
            console.log("Updated form:", updated); // Check if Status is present
            return updated;
        });
    };

    return (    
        <>
        <div className="w-full">
            <form onSubmit={sendCustomer} method='post'>

                <div className='w-full flex justify-between mt-15'>
                {showheading1 && 
                    <div className="w-[30%] flex justify-between">
                        <div className='w-full bg-[#e9ecef] ml-53 animate-wiggle rounded-2xl'>
                            <p className='font-Poppins p-2'>Customer Name</p>
                        </div>
                    </div>    
                }

                {showheading2 && 
                    <div className='w-[13%] bg-[#e9ecef] mr-92 animate-wiggle p-2 rounded-2xl'>
                        <p className='font-Poppins'>Company Name</p>
                    </div>
                }
                </div>


                <div className="w-full flex justify-evenly">
                    <div className="w-[25%] bg-white border-2 border-[#adb5bd] rounded-3xl mt-3 mb-3">
                        <input
                            type="text"
                            name="Customer_name"
                            value={form.Customer_name}
                            onChange={handleInputChange}
                            onClick={showHeading}
                            placeholder={placeholderCustomerName}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>

                    <div className="w-[25%] border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd] bg-white">
                        <input
                            type="text"
                            name="Company_name"
                            value={form.Company_name}   
                            onClick={showHeading2}
                            onChange={handleInputChange}
                            placeholder={placeholderCompamyName}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>
                
                <div className='w-full flex justify-between mt-8'>
                    {showheading3 && 
                        <div className="w-[30%] flex justify-between">
                            <div className='w-full bg-[#e9ecef] ml-53 animate-wiggle rounded-2xl'>
                                <p className='font-Poppins p-2'>Contact Number</p>
                            </div>
                        </div>    
                    }

                    {showheading4 && 
                        <div className='w-[13%] bg-[#e9ecef] mr-92 animate-wiggle p-2 rounded-2xl'>
                            <p className='font-Poppins'>Country Name</p>
                        </div>
                    }
                </div>



                <div className="w-full flex justify-evenly">
                    <div className="w-[25%] bg-white border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd]">
                        <input
                            type="text"
                            name="Contact_no"
                            value={form.Contact_no}
                            onClick={showHeading3}
                            onChange={handleInputChange}
                            placeholder={placeholderContact}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>

                    <div className="w-[25%] bg-white border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd]">
                        <input
                            type="text"
                            name="Country"
                            value={form.Country}
                            onClick={showHeading4}
                            onChange={handleInputChange}
                            placeholder={placeholderCountry}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                    
                </div>

                <div className='w-full flex justify-between mt-8 '>
                {showheading5 && 
                    <div className="w-[23%] flex justify-between">
                        <div className='w-full bg-[#e9ecef] ml-55 animate-wiggle rounded-2xl'>
                            <p className='font-Poppins p-2'>Email</p>
                        </div>
                    </div>    
                }
                </div>

                <div className="w-full flex justify-evenly">
                    <div className="w-[25%] bg-white border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd]">
                        <input
                            type="email"
                            name="Email"
                            value={form.Email}
                            onClick={showHeading5}
                            onChange={handleInputChange}
                            placeholder={placeholderEmail}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>

                    <div className="w-[25%] mt-3 mb-3 flex items-center">
                        <Select
                            showSearch
                            placeholder="Select Status"
                            optionFilterProp="label"
                            className='w-full'
                            onChange={handleSelectChange}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    </div>
                </div>


                <div className='w-full flex justify-center mb-8 mt-10'>
                    <div className='w-[20%] bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl mb-6'>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>
                </div>
            </form>
        </div>


        {finalDiv && 
        <div className='w-full flex justify-center p-2 animate-show mt-20'>
            <div className='w-[25%] bg-[#e9ecef] animated-border flex'>
                <div className='w-[20%] flex justify-center'>
                    <img src={check} className='object-contain w-[60%]' />
                </div>

                <div className='w-full flex items-center p-4'>
                    <p className='pl-2 font-Poppins'>Data Entered Successfully</p>
                </div>
            </div>
        </div>
        }

        </>
    );
}

export default NewCustomerForm;
