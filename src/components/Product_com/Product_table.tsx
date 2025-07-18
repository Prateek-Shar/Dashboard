import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Pagination } from 'antd';
import daily_items from "../../images/daily_items.png";
import Grocery from "../../images/grocery.png";
import Others from "../../images/Others.png";
import Food from "../../images/Food.png";
import default_image from "../../images/default.png";

interface Product_details {
    P_id: number;
    Product_name: string;
    Product_quantity: number;
    Product_price: number;
    Product_catagory: string;
}

// Category to Image mapping
const categoryImages: { [key: string]: string } = {
    Food: Food,
    'Daily Items': daily_items,
    Grocery: Grocery,
    Others: Others,
};

const Product_table = () => {
    const [productDet, setProductDet] = useState<Product_details[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productCount, setProductCount] = useState(0);



    useEffect(() => {
        fetchProductPageData(currentPage)
        getStats()
    } , [])


    const fetchProductPageData = async (page : number) => {
        const res = await fetch(`http://localhost:8080/get_product_statistics?page=${page}` , {
            method : "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setProductDet(data.stats)
    }

    const getStats = async() => {
        
        try {
            const res = await fetch(`http://localhost:8080/product_stats` , {
                method : "GET",
                credentials : "include"
            })

            if(!res.ok) {
                throw new Error("Unauthorized or server error");
            }

            const data = await res.json()
            setProductCount(data.product_stats3);
        }

        catch(error) {
            console.log("Got Error")
        }

    }

    // const handleChange = async (page: number) => {
    //     setCurrentPage(page);

    //     try {
    //         const res = await fetch(`http://localhost:8080/get_product_statistics?page=${page}`, {
    //             method: "GET",
    //             credentials: "include", // ✅ Send cookies like SessionID
    //         });

    //         if (!res.ok) {
    //             throw new Error("Unauthorized or server error");
    //         }

    //         const data = await res.json();
    //         setProductDet(data.stats); // ✅ Update your state here
    //     } 
        
    //     catch (error) {
    //         console.log("Error:", error);
    //     }
    // };

  

    const handleDelete = (P_id: number) => {
        fetch(`http://localhost:8080/delete_product?P_id=${P_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log("Deleted:", data);
                // Refresh after delete
                handleChange(currentPage);
                message.success("Product Deleted Successfully");
            })
            .catch(err => {
                console.error("Delete Error:", err);
                message.error("Delete Failed");
            });
    };
    

    const handleChange = async (page: number) => {
        setCurrentPage(page);
        await fetchProductPageData(page); // ✅ Await to ensure update completes
    };

    return (
        <div className="w-full flex justify-center items-center flex-col">
            <div className="w-[85%] flex flex-col">
                <div className="w-full bg-white">
                    {productDet.length > 0 ? (
                        productDet.map((product) => {
                            const items: MenuProps['items'] = [
                                {
                                    label: 'Delete',
                                    key: product.P_id.toString(),
                                }
                            ];

                            const onClick: MenuProps['onClick'] = (info) => {
                                handleDelete(Number(info.key));
                            };

                            return (
                                <div key={product.P_id} className="w-full flex py-2">
                                    <div className="w-[15%] flex justify-center items-center ml-7">
                                        <img
                                            src={categoryImages[product.Product_catagory] || default_image}
                                            alt={product.Product_catagory}
                                            className="object-contain w-[25%] p-2"
                                        />
                                    </div>
                                    <div className="w-[14%] ml-5 p-5 flex justify-center items-center">
                                        <p className="font-Poppins">{product.Product_name}</p>
                                    </div>
                                    <div className="w-[15%] ml-7 flex justify-center items-center">
                                        <p className="font-Poppins">{product.Product_catagory}</p>
                                    </div>
                                    <div className="w-[14%] ml-5 flex justify-center items-center">
                                        <p className="font-Poppins">₹{product.Product_price}</p>
                                    </div>
                                    <div className="w-[15%] ml-7 flex justify-center items-center">
                                        <p className="font-Poppins">
                                            {Number(product.Product_quantity) <= 0 ? "Out of Stock" : "In Stock"}
                                        </p>
                                    </div>
                                    <div className="w-[15%] ml-7 flex justify-center items-center">
                                        <Dropdown menu={{ items, onClick }}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space className="text-[#6ab1fd]">
                                                    Action
                                                    <DownOutlined />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-full bg-amber-900 text-white p-4 text-center">
                            <p>No Records Found</p>
                        </div>
                    )}
                </div>

                <div className="w-full bg-amber-800 mt-1 mb-1">
                    <hr className="border-[#f2f2f2]"></hr>
                </div>

                <div className="w-full bg-white flex justify-between rounded-b-4xl">
                    <div className="w-[40%] mt-4 mb-4 flex items-center">
                        <p className='font-Poppins pl-4 text-[#d9d2d7] text-[13px]'>
                            Showing {productDet.length} of {productCount}
                        </p>
                    </div>
                    <div className="w-[20%] mt-4 mb-4 ">
                        <Pagination
                            current={currentPage}
                            onChange={handleChange}
                            total={productCount}
                            pageSize={5} // assuming you are showing 5 per page
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product_table;
