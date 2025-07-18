import Table_content from "../components/Customer_com/Customer_table"
import Stats from "../components/Customer_com/Customer_stats";
import Head from "../components/Navigation_com/head"
import Add_customer from "../components/Customer_com/Add_customer_bt"
// import Table_footer from "../components/Customer_com/customer_table_footer";


const Customer_page = () => {

     

    return (
        <div className="bg-[#f8f9fa] w-full">

            <div className="w-full flex items-center justify-center">
                <Head />
            </div>  

           <div className="w-full flex justify-evenly items-center mt-10">
                <div className="w-[65%] flex items-center justify-center">
                    <Stats />
                </div>

                <div className="w-[20%] flex items-center justify-center">
                    <div className="w-full bg-white rounded-4xl m-4" >
                        <Add_customer />
                    </div>      
                </div>
            </div>

            <div className="w-full flex items-center justify-center">
                <Table_content />
            </div>  

            {/* <div className="w-full flex items-center justify-center">
                <Table_footer />
            </div>   */}

        </div>
    )
}   


export default Customer_page;