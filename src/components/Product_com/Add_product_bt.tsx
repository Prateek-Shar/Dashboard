import add from "../../images/add.png"
import { useNavigate } from "react-router-dom"

const Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewProduct = () => {
        navigate("/addProduct")
    }
    return (
        <div className="w-full flex">
            <div className="w-[80%] flex items-center p-4">
                <p className="font-Poppins text-[18px]">Add New Product</p>
            </div>

            <div className="w-[15%] flex justify-center items-center">
                <img src={add} onClick={handleClickToNewProduct} className="w-[60%] hover:cursor-pointer"/>
            </div>
        </div>
    )
}

export default Add_product;