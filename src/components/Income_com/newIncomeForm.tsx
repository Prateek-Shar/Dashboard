import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select } from 'antd';
import { useState } from 'react';
import type { UploadProps } from 'antd';
import check from "../../images/check.png";

const NewIncomeForm = () => {

    const defaultForm = {
        // Created_at : new Date(),
        Source : "",
        Amount : "",
        Catagory : "",
        Created_at : new Date()
    };

    const [productId, setProductId] = useState(1); // Start ID from 1
    const [form, setForm] = useState({ ...defaultForm }); // First product gets ID 1
    const [showheading1 , setShowHeading1] = useState(false)
    const [showheading2 , setShowHeading2] = useState(false)
    const [showheading3 , setShowHeading3] = useState(false)
    const [placeholderAmount , setPlaceholderAmount] = useState("Enter Amount")
    const [finalDiv , setFinalDiv] = useState(false)

    const sendIncome = async (e: React.FormEvent) => {
        e.preventDefault();

        const formToSend = { ...form };
        console.log(formToSend)

        try {
            const res = await fetch("http://localhost:8080/send_income", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formToSend),
            });


            if (!res.ok) throw new Error("Request failed");

            const data = res.json()
            console.log(data)
            setFinalDiv(true)
            setForm({ ...defaultForm });
            reload_all_divs()

            

        } catch (err) {
            console.log("Failed to submit data")
        }

    };

    const showHeading = () => {
        setShowHeading1(true)
    }

    const showHeading2 = () => {
        setShowHeading2(true)
    }

    const showHeading3 = () => {
        setShowHeading3(true)
        setPlaceholderAmount("")
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const reload_all_divs = () => {
        setShowHeading1(false)
        setShowHeading3(false)
        setShowHeading2(false)
        setPlaceholderAmount("Enter Amount")

    }

    const handleSourceChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Source: value
        }));
    };

    const handleCatagoryChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Catagory: value
        }));
    };``

    return (    
        <>
        <div className="w-full">
            <form onSubmit={sendIncome} method='post'>

                <div className='w-full flex justify-between mt-15'>
                {showheading1 && 
                    <div className="w-[30%] flex justify-between">
                        <div className='w-full bg-[#e9ecef] ml-55 animate-wiggle rounded-2xl'>
                            <p className='font-Poppins p-2'>Mode of Payment</p>
                        </div>
                    </div>    
                }

                {showheading2 && 
                    <div className='w-[15%] bg-[#e9ecef] mr-85 animate-wiggle p-2 rounded-2xl'>
                        <p className='font-Poppins'>Catagory</p>
                    </div>
                }
                </div>


                <div className="w-full flex justify-evenly mt-2 ">
                    <div className='w-[25%] mt-3 mb-3 flex items-center'>
                        <Select
                            showSearch
                            placeholder="Mode of Payment"
                            optionFilterProp="label"
                            className='w-full'
                            onClick={showHeading}
                            value={form.Source}
                            style={{paddingTop : ""}}
                            onChange={handleSourceChange}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                // { value: 'Online Sales', label: 'Online Sales' },
                                // { value: 'COD', label: 'Cash on Delivery (COD)' },
                                { value: 'Bank Transfer', label: 'Bank Transfer' },
                                { value: 'UPI', label: 'UPI (Google Pay / PhonePe / etc.)' },
                                { value: 'Cash Payment', label: 'Cash Payment' },
                            ]}
                        />
                    </div>

                    <div className="w-[25%] mt-3 mb-3 flex items-center">
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            className='w-full'
                            value={form.Catagory}
                            onClick={showHeading2}
                            onChange={handleCatagoryChange}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                { value: 'Grocery', label: 'Grocery' },
                                { value: 'Daily Items', label: 'Daily Items' },
                                { value: 'Product Sales', label: 'Product Sales' },
                                { value: 'Freelance Work', label: 'Freelance Work' },
                                { value: 'Salary', label: 'Salary' },
                                { value: 'Stock Dividends', label: 'Stock Dividends' },
                                { value: 'Gift Received', label: 'Gift Received' },
                                { value: 'Other', label: 'Other' },
                                { value: 'Interest Income', label: 'Interest Income' },
                            ]}
                        />
                    </div>
                </div>
                
                {showheading3 && 
                    <div className='w-full mt-10'>
                        <div className='w-[12%] bg-[#e9ecef] ml-55 animate-wiggle rounded-2xl'>
                            <div className='w-full p-2'>
                                <p className='font-Poppins'>Amount</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="w-full flex mt-5">

                    <div className="w-[25%] ml-53 border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd] bg-white">
                        <input
                            type="number"
                            name="Amount"
                            value={form.Amount}
                            onClick={showHeading3}
                            onChange={handleInputChange}
                            placeholder={placeholderAmount}
                            className="w-full p-4 font-Poppins focus:outline-0"
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

export default NewIncomeForm;
