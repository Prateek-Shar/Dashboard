import Income_stats from "../components/Income_com/Income_stats"
import Head from "../components/Navigation_com/head"
import Income_table from "../components/Income_com/Income_table"
import Income_visualize from "../components/Income_com/income_visualize"
import Add_product_bt from "../components/Product_com/Add_product_bt"
import Add_Income_bt from "../components/Income_com/Add_income_bt"
import { DetailContext } from '../context/Chart';
import type {Prop} from '../context/Chart'
import { useEffect, useState } from "react"
import Income_table_head from "../components/Income_com/Income_table_head"


interface MonthlyDetails {
    Catagory : string,
    Amount : number
}

interface YearlyDetails {
    Catagory : string;
    Amount : number
}

interface DailyDetails {
    Amount : number;
    Catagory : string;
}

const Income = () => {

    const [dataByMonth , setDataByMonth] = useState<MonthlyDetails[]>([])
    const [dataByYear , setDataByYear] = useState<YearlyDetails[]>([])
    const [dataDaily, setDataByDay] = useState<DailyDetails[]>([])

    const [activeView, setActiveView] = useState<'daily' | 'monthly' | 'yearly'>('daily');
    
    // const handleData = () => {
    //     fetch(`http://localhost:8080/get_data_by_month`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setDataByMonth(data.detail)
    //     })

    //     fetch(`http://localhost:8080/get_data_by_year`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setDataByYear(data.detail)
    //     })

    //     fetch(`http://localhost:8080/get_data_by_day`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setDataByDay(data.detail)
    //     })
    // }

    const handleData = async() => {
        const response1 = await fetch(`http://localhost:8080/get_data_by_month` , {
            method : "GET",
            credentials : "include"
        })

        if (!response1.ok) {    
            console.log("Something Broke Up")
        }

        const data = await response1.json()
        setDataByMonth(data.detail)



        const response2 = await fetch(`http://localhost:8080/get_data_by_year` , {
            method : "GET",
            credentials : "include"
        })

        if (!response2.ok) {
            console.log("Something Broke Up")
        }

        const data2 = await response2.json()
        setDataByYear(data2.detail)



        const response3 = await fetch(`http://localhost:8080/get_data_daily` , {
            method : "GET",
            credentials : "include"
        })

        if (!response3.ok) {
            console.log("Something Broke Up in response3")
        }

        const data3 = await response3.json()
        setDataByDay(data3.detail)

    }

    useEffect(() => {
        handleData()
    }, [])


    return (

        <div className="w-full bg-[#f8f9fa]">
            <div className="w-full">
                <Head />
            </div>

            <div className="w-full flex justify-center mt-10">
                <div className="w-[70%]">
                    <Income_stats />
                </div>

                <div className="w-[20%] flex justify-center items-center">
                    <Add_Income_bt />
                </div>
            </div>

            <div className="w-full flex justify-center">
                <Income_table />
            </div>

            <div className="w-full flex justify-center"> 
                <div className="w-[80%] bg-white flex justify-center items-center flex-col rounded-4xl mt-20 mb-20">

                   
                    <div className="w-full">
                        <Income_table_head />
                    </div>
                    
                    {/* <DetailContext.Provider value={{ 
                        detailDaily : dataDaily , setDetailDaily : setDataByDay , 
                        detailByMonth : dataByMonth , setDetailByMonth : setDataByMonth , 
                        detailByYear : dataByYear , setDetailByYear : setDataByYear }}>

                        <div className="w-full mb-5">
                            <Income_visualize  />
                        </div>
                    </DetailContext.Provider> */}

                    <DetailContext.Provider value={{
                        detailByMonth : dataByMonth , setDetailByMonth : setDataByMonth , 
                        detailDaily : dataDaily , setDetailDaily :  setDataByDay ,
                        detailByYear : dataByYear , setDetailByYear : setDataByYear
                    }}>
                        <Income_visualize />
                    </DetailContext.Provider>
                </div>
            </div>

        </div>
    )
}

export default Income