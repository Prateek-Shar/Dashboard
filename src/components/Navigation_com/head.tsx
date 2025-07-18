import Hello from "../../images/Hello.png"
import { useUser } from "../../context/login_context";
import { useNavigate } from "react-router-dom";

const Head = () => {

    const { userDetails } = useUser();

    const navigate = useNavigate()


    const handleClickToSignIn = async () => {
        try {
            const res = await fetch("http://localhost:8080/logout", {
                method: "GET",
                credentials: "include"
            });

            if (res.ok) {
                navigate("/"); // redirect to login page
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    return (
    
    <div className="w-full flex justify-between">
        
        <div className="w-[15%] flex">
            <div className="w-[80%]  flex justify-center items-center">
                <p className="font-Poppins text-2xl p-4">Hello {userDetails?.Username}</p>
            </div>

            <div className="w-[20%] flex justify-center items-center">
                <img src={Hello} className="object-contain w-[90%] "/>
            </div>
        </div>

        <div className="w-[10%] mr-10 rounded-4xl mt-2 mb-2 shadow-lg">
            <div className="w-full bg-red-600 p-3 rounded-4xl flex justify-center hover:cursor-pointer">
                <p className="font-Poppins text-shadow-white" onClick={handleClickToSignIn}>Sign Out</p>
            </div>
        </div>
    </div>
    
    )
}


export default Head;