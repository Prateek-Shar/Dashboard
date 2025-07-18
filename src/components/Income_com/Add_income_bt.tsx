import add from "../../images/add.png"
import { useNavigate } from "react-router-dom"

const Add_Income_bt = () => {
    
    const navigate = useNavigate()

    const handleClicktoNewIncome = () => {
        navigate("/addIncome")
    }

    
    return (
        <div className="w-[70%] bg-white rounded-2xl">
            <div className="w-full flex ">
                <div className="w-[85%]  flex items-center p-4 ">
                    <p className="font-Poppins text-[16px] text-[#495057]">Add New Income</p>
                </div>

                <div className="w-[15%] flex justify-center items-center ">
                    <img src={add} onClick={handleClicktoNewIncome} className="w-[60%] hover:cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default Add_Income_bt