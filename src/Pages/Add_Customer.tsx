import Head from "../components/Navigation_com/head";
import NewCustomerForm from "../components/Customer_com/newCustomerForm"

const Add_Customer = () => {

    return (
        <div className="w-screen h-screen bg-[#f8f9fa]"> 
            <div className="w-full">
                <Head />
            </div>

            <div className="w-full flex justify-center items-center mt-10">
                <div className="w-[80%] bg-white rounded-4xl mt-2">

                    <div className="w-full flex justify-center items-center rounded-t-4xl">
                        <p className="font-Poppins text-[24px] p-4">Add Customer</p>
                    </div>
                    
                    <div className="w-full mt-4">
                        <NewCustomerForm />
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Add_Customer;