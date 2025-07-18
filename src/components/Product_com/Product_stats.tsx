import total_customers from "../../images/total_products.png"
import in_stock from "../../images/in_stock.png"
import out_of_stock from "../../images/out_of_stock.png";
import { useEffect, useState } from "react";

const Product_stats = () => {

    const [inStockCount , setInStockCount] = useState(0)
    const [outOfStockCount , setOutOfStockCount] = useState(0)
    const [productLength , setProductLength] = useState(0)

    const GetProductStatstics = async() => {
        try {
            const res = await fetch(`http://localhost:8080/product_stats` , {
                method : "GET",
                credentials : "include"
            })

            if (!res.ok) {
                console.log("Error fetching data..........")
            }

            const data = await res.json()

            setInStockCount(data.product_stats1)
            setOutOfStockCount(data.product_stats2)
            setProductLength(data.product_stats3)
            
        }

        catch(error) {
            console.log("Error Fetching data : " , error)
        }
    }

    useEffect(() => {
        GetProductStatstics()
    } , [])

   
    return (
        <div className="w-[90%] bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
            <div className="w-[25%] flex">

                <div className="w-[40%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={total_customers} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Total Products</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2">{productLength}</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%] flex">

                <div className="w-[40%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={in_stock} className="object-contain w-[50%]" />
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">In Stock</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2">{inStockCount}</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%]  flex ">

                <div className="w-[40%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={out_of_stock} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full ">
                        <p className="font-Poppins p-2">Out Of Stock</p>
                    </div>

                    <div className="w-full ">
                        <p className="font-Poppins p-2">{outOfStockCount}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product_stats;