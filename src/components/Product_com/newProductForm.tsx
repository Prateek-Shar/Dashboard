import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select } from 'antd';
import { useState } from 'react';
import type { UploadProps } from 'antd';
import check from "../../images/check.png";

const NewProductForm = () => {

    const defaultForm = {
        P_id : "",  // Will auto-assign below
        Product_name: "",
        Product_catagory: "",
        Product_price: "",
        Product_quantity: "",
    };

    const [productId, setProductId] = useState(1); // Start ID from 1
    const [form, setForm] = useState({ ...defaultForm, P_id: 1 }); // First product gets ID 1
    const [showheading1 , setShowHeading1] = useState(false)
    const [showheading2 , setShowHeading2] = useState(false)
    const [showheading3 , setShowHeading3] = useState(false)
    const [placeholderName , setPlaceholderName] = useState("Enter Product Name")
    const [placeholderQuantity , setPlaceholderQuantity] = useState("Enter Product Quantity")
    const [placeholderPrice , setPlaceholderPrice] = useState("Enter Product Price")
    const [finalDiv , setFinalDiv] = useState(false)

    const sendProducts = async (e: React.FormEvent) => {
        e.preventDefault();

        const formToSend = { ...form };
        console.log(formToSend)

        try {
            const res = await fetch("http://localhost:8080/send_products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials : "include",
                body: JSON.stringify(formToSend),
            });

            if (!res.ok) throw new Error("Request failed");

            await res.json();
            setFinalDiv(true)

            // Increment productId for next product
            const newProductId = productId + 1;
            setProductId(newProductId);

            // Reset form with new Product ID
            setForm({ ...defaultForm, P_id: newProductId });

        } catch (err) {
            console.log("Failed to submit data")
        }
    };

    const showHeading = () => {
        setShowHeading1(true)
        setPlaceholderName("")
    }

    const showHeading2 = () => {
        setShowHeading2(true)
        setPlaceholderQuantity("")
    }

    const showHeading3 = () => {
        setShowHeading3(true)
        setPlaceholderPrice("")
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Product_catagory: value
        }));
    };

    return (    
        <>
        <div className="w-full">
            <form onSubmit={sendProducts} method='post'>

                <div className='w-full flex justify-between mt-15'>
                {showheading1 && 
                    <div className="w-[30%] flex justify-between">
                        <div className='w-full bg-[#e9ecef] ml-55 animate-wiggle rounded-2xl'>
                            <p className='font-Poppins p-2'>Product Name</p>
                        </div>
                    </div>    
                }

                {showheading2 && 
                    <div className='w-[15%] bg-[#e9ecef] mr-85 animate-wiggle p-2 rounded-2xl'>
                        <p className='font-Poppins'>Product Quantity</p>
                    </div>
                }
                </div>


                <div className="w-full flex justify-evenly mt-2 ">
                    <div className="w-[25%] bg-white border-2 border-[#adb5bd] rounded-3xl mt-3 mb-3">
                        <input
                            type="text"
                            name="Product_name"
                            value={form.Product_name}
                            onChange={handleInputChange}
                            onClick={showHeading}
                            placeholder={placeholderName}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>

                    <div className="w-[25%] border-2 rounded-3xl mt-3 mb-3 border-[#adb5bd] bg-white">
                        <input
                            type="number"
                            name="Product_quantity"
                            value={form.Product_quantity}
                            onClick={showHeading2}
                            onChange={handleInputChange}
                            placeholder={placeholderQuantity}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>
                
                {showheading3 && 
                    <div className='w-full mt-10'>
                        <div className='w-[12%] bg-[#e9ecef] ml-55 animate-wiggle rounded-2xl'>
                            <div className='w-full p-2'>
                                <p className='font-Poppins'>Product Price</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="w-full flex justify-evenly mt-5">
                    <div className="w-[25%] bg-white border-2 rounded-3xl  mb-3 border-[#adb5bd]">
                        <input
                            type="number"
                            name="Product_price"
                            value={form.Product_price}
                            onClick={showHeading3}
                            onChange={handleInputChange}
                            placeholder={placeholderPrice}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>

                    <div className="w-[25%] mt-3 mb-3 flex items-center">
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            className='w-full'
                            onChange={handleSelectChange}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                { value: 'Food', label: 'Food' },
                                { value: 'Daily Items', label: 'Daily Items' },
                                { value: 'Grocery', label: 'Grocery' },
                                { value : "Others" , label : "Others" }
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

export default NewProductForm;
