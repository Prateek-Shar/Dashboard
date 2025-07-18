import rupee from "../../images/rupee.png"
import customer_growth from "../../images/customer_growth.png"
import catagories from "../../images/categories.png"
import transaction from "../../images/transaction.png"
import { useEffect, useState } from "react"


const Income_stats = () => {

    const [total_income , setTotalIncome] = useState()
    const [monthly_growth , setMonthlyGrowth] = useState()
    const [total_transaction , setTotalTransaction] = useState()
    const [top_category , setTopCategory] = useState()

    const handleAPI = async() => {
        const res = await fetch(`http://localhost:8080/getIncomeStats` , {
            method: "GET"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()

        setTotalIncome(data.Total_Income)
        setMonthlyGrowth(data.Monthly_Growth)
        setTotalTransaction(data.Total_Transaction)
        setTopCategory(data.Top_Category)
    }

    useEffect(() => {
        handleAPI()
    } , [])

    return (

        <div className="w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
            <div className="w-[20%] flex">

                <div className="w-[30%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={rupee} className="object-contain w-[70%]"/>       
                </div>

                <div className="w-[70%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Total Income</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins text-[13px] p-2">{total_income}</p>
                    </div>
                </div>

            </div>

            <div className="w-[20%] flex">

                <div className="w-[30%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={customer_growth} className="object-contain w-[70%]" />
                </div>

                <div className="w-[70%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Monthly Growth</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins text-[13px] p-2">{monthly_growth}</p>
                    </div>
                </div>

            </div>

            <div className="w-[20%]  flex ">

                <div className="w-[30%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={transaction} className="object-contain w-[70%]"/>
                </div>

                <div className="w-[70%] flex flex-col">

                    <div className="w-full ">
                        <p className="font-Poppins p-2">No of Trasaction</p>
                    </div>

                    <div className="w-full ">
                        <p className="font-Poppins text-[13px] p-2">{total_transaction}</p>
                    </div>
                </div>

            </div>

            <div className="w-[20%]  flex ">

                <div className="w-[30%] bg-[#e5fff1] rounded-4xl flex justify-center items-center">
                    <img src={catagories} className="object-contain w-[70%]"/>
                </div>

                <div className="w-[70%] flex flex-col">

                    <div className="w-full ">
                        <p className="font-Poppins p-2">Top Catagory</p>
                    </div>

                    <div className="w-full ">
                        <p className="font-Poppins text-[13px] p-2">{top_category}</p>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Income_stats