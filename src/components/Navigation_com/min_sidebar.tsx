import activity from "../images/activity.png"
import customer from "../images/customer.png"
import income from "../images/income.png";
import man from "../images/man.png";
import box from "../images/product.png"

const Min_sidebar = () => {
    

    return (
        <div className="w-[5%] bg-white flex flex-col justify-center items-center">

            <div className="w-[70%] flex justify-center items-center">
                <img src={activity} />
            </div>

            <div className="w-[70%] flex justify-center items-center mt-8 p-4">
                <img src={customer} />
            </div>

            <div className="w-[70%]  flex justify-center items-center mt-4 p-4">
                <img src={income} />
            </div>

            <div className="w-[70%] flex justify-center items-center mt-4 p-4">
                <img src={box} />
            </div>


            <div className="w-[70%] mt-[493px] mb-6">
                <img src={man} className="object-contain w-[90%]"/>
            </div>

        </div>
    )
}


export default Min_sidebar