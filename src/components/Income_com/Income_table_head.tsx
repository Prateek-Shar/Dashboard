import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useState } from 'react';




const Income_table_head = () => {

    const [OptionsDiv , setOptionsDiv] = useState(false)

    const enableOptionsTab = () => {
        setOptionsDiv(true)
    }

    const disableOptionsTab = () => {
        setOptionsDiv(false)
    }
    

    return (
        <>
            <div className="w-full">
                <div className="w-[20%]">
                    <p className="text-2xl font-Poppins pl-6 pb-2 pt-6">Visualize</p>
                </div>  

                {/* <div className="w-[10%] flex flex-col justify-center items-center mr-4 border-2 mt-2 border-gray-200 rounded-2xl hover:text-[#4095fe]" onMouseEnter={enableOptionsTab} onMouseLeave={disableOptionsTab}>

                    <div className='w-full  p-3 rounded-[12px]'>
                        <button className='w-full  font-Poppins'>Action</button>
                    </div>

                    {OptionsDiv && (
                    <div className='w-[90%] bg-white flex flex-col items-center rounded-b-[13px] mb-2'>
                        <div className='hover:bg-[#f5f5f5] w-full flex justify-center rounded-2xl'>
                            <p className='p-2 hover:cursor-pointer text-black font-Poppins' >Monthly</p>
                        </div>

                        <div className='hover:bg-[#f5f5f5] w-full rounded-2xl flex justify-center'>
                            <p className='p-2 hover:cursor-pointer text-black font-Poppins'>Yearly</p>
                        </div>
                    </div>
                    )}

                </div> */}
            </div>
        </>
    )
}

export default Income_table_head;