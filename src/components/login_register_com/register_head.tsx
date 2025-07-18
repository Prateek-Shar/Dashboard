interface Register {
    onSwitch : () => void;
}

const Register_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="w-[80%] flex justify-evenly mt-2">
            <div className="w-[40%]">
                <div className="w-full rounded-3xl flex justify-center mt-2">
                    <p className="font-Poppins p-3 text-[#3b60e7]">Sign Up</p>
                </div>  

                <div className="w-full flex justify-center items-center">
                    <div className="w-[10%]">
                        <hr className="border-[#3b60e7] border-2 w-full rounded-4xl" />
                    </div>
                </div>
            </div>

            <div className="w-[40%] bg-white rounded-3xl flex justify-center mt-2 mb-2 shadow-lg">
                <p className="font-Poppins p-3 hover:cursor-pointer" onClick={onSwitch}>Sign In</p>
            </div>
        </div>
    )
}

export default Register_Head;