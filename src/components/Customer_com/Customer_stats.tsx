import customers from "../../images/customers.png";
import member from "../../images/members.png";
import active from "../../images/active.png";
import { useEffect, useState } from "react";

const Stats = () => {

const [totalActive , setTotalActive] = useState(0)
const [totalCustomer , setTotalCustomer] = useState(0)

// useEffect(() => {
//     fetch("http://localhost:8080/get_customer_stats")
//     .then(res => res.json())
//     .then(data => {
//         setTotalActive(data.active_member)
//         setTotalCustomer(data.total_customer)
//     })
//     .catch(error => console.log(error))
// }, [])

    const fetchCustomerStats = async() => {
        const res = await fetch(`http://localhost:8080/get_customer_stats` , {
            method : "GET",
            credentials : "include"
        })

        if(!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setTotalCustomer(data.total_customer)
        setTotalActive(data.active_member)

    }


    useEffect(() => {
        fetchCustomerStats()
    } , [])

    return (
        
        <div className="w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
            <div className="w-[25%] flex">

                <div className="w-[35%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={customers} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[65%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Total Customers</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2">{totalCustomer}</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%] flex">

                <div className="w-[35%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={member} className="object-contain w-[50%]" />
                </div>

                <div className="w-[65%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Members</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2">0</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%] flex">

                <div className="w-[35%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={active} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[70%] flex flex-col">

                    <div className="w-full ">
                        <p className="font-Poppins p-2">Active Now</p>
                    </div>

                    <div className="w-full ">
                        <p className="font-Poppins p-2">{totalActive}</p>
                    </div>
                </div>

            </div>
        </div>
        
    )

}


export default Stats;