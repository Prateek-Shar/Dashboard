import Head from "../components/Navigation_com/head"
import Product_stats from "../components/Product_com/Product_stats"
import Add_product from "../components/Product_com/Add_product_bt"
import Product_table from "../components/Product_com/Product_table"


const Products = () => {

    return (
        <div className="w-full bg-[#f8f9fa]">  
            <Head />
            
            <div className="w-full flex justify-center items-center mt-10">

                <div className="w-[65%] flex items-center justify-center">
                    <Product_stats />
                </div>

                <div className="w-[20%] flex items-center justify-center">
                    <div className="w-[80%] bg-white rounded-4xl" >
                        <Add_product />
                    </div>      
                </div>
            </div>


            <div className="w-full flex flex-col justify-center items-center mt-15">
                
                <div className="w-[85%] bg-white flex flex-col rounded-t-4xl items-center">
                    <div className="w-[95%] flex justify-between mt-4">
                        <div className="w-[15%] flex justify-center">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Image</p>
                        </div>

                        <div className="w-[15%] flex justify-center">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Product Name</p>
                        </div>

                        <div className="w-[15%] flex justify-center ">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Catagory</p>
                        </div>

                        <div className="w-[15%] flex justify-center ">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Price</p>
                        </div>

                        <div className="w-[15%] flex justify-center">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Status</p>
                        </div>

                        <div className="w-[15%] flex justify-center">
                            <p className="font-Poppins p-2 text-[#bcc3cc]">Action</p>
                        </div>
                    </div>
                
                
                    <div className="w-[98%] mt-2 mb-2">
                        <hr className="border-[#f2f2f2]" />
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full">
                        <Product_table />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Products