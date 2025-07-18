import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Divider, Flex, Tag, Select, Input, Space, Pagination } from "antd";
import { useEffect, useState } from "react";
import React from "react";

interface Customer {
  _id?: string;
  UserID?: string;
  Customer_name: string;
  Company_name: string;
  Contact_no: number;
  Email: string;
  Country: string;
  Status: string;
}

const Table_content: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);

  const { Search } = Input;

  // Fetch total customers and first page data on mount
  useEffect(() => {
    fetchTotalCustomers();
    fetchPageData(currentPage);
  }, []); 

  // Fetch total customers count
  const fetchTotalCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8080/get_customer_stats", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Something broke up. Status:", res.status);
        return;
      }

      const data = await res.json();
      setTotalCustomer(data.total_customer);
    } catch (error) {
      console.error("Total Fetch Error:", error);
    }
  };


  // Fetch paginated customer data
  const fetchPageData = async(page: number) => {
    // fetch(`http://localhost:8080/get_customers_statistics?page=${page}`)
    //   .then((res) => res.json())
    //   .then((data) => setCustomers(data.customer_stats))
    //   .catch((error) => console.log("Page Data Fetch Error:", error));

    const res = await fetch(`http://localhost:8080/get_customers?page=${page}` , {
      method: "GET",
      credentials : "include"
    })

    if(!res.ok) {
      console.log("Something Broke Up")
    }

    const data = await res.json()
    setCustomers(data.customer_stats)
  };


  // On search submit
  const onSearch = async (value: string) => {
    if (!value) {
      fetchPageData(currentPage); // Reset to paginated data
      console.log("Search value is empty, resetting to paginated data.");
      setSearchValue(""); // Clear search input
      return; 
    }

    try {
      console.log("Searching for:", value);
      const response = await fetch(`http://localhost:8080/search_customer?name=${value}` , {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        console.error("Search request failed with status:", response.status);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      setCustomers([]);
    }
  };

  // On page change
  const handleChange = (page: number) => {
    setCurrentPage(page);
    fetchPageData(page);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    console.log(`Selected: ${value}`);
    // Sorting logic can go here
  };

  return (
    <div className="w-[90%] flex flex-col mb-10">
      <div className="w-full flex flex-col items-center mt-15">
        <div className="w-[90%] rounded-t-3xl p-2 flex justify-between bg-white">
          <div className="w-[20%] p-4">
            <p className="font-Poppins text-2xl">All Customers</p>
          </div>
          <div className="w-[35%] flex justify-between">
            <div className="w-[60%] flex items-center">
              <Space direction="vertical" className="w-full">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  onChange={handleInputChange}
                  value={searchValue}
                  enterButton
                />
              </Space>
            </div>
            <div className="w-[30%] flex items-center justify-center ml-10">
              <Select
                showSearch
                placeholder="Sort By"
                className="w-[80%]"
                onChange={handleSelectChange}
                options={[
                  { value: "Newest", label: "Newest" },
                  { value: "Oldest", label: "Oldest" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[90%] flex flex-col mb-2 rounded-b-4xl bg-white">
          <div className="w-full flex mt-10">
            <div className="w-[10%] flex justify-center p-2 ml-8">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Customer</p>
            </div>
            <div className="w-[13%] flex justify-center p-2 ml-28">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Company Name</p>
            </div>
            <div className="w-[13%] flex justify-center p-2 ml-25">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Contact Number</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-21">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Email</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-35">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Country</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-20">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Status</p>
            </div>
          </div>

          <div className="w-full mt-4">
            {customers.length > 0 ? (
              customers.map((cust, index) => (
                <div className="w-full flex mt-2" key={index}>
                  <div className="w-[15%] ml-4">
                    <p className="font-Poppins pb-4 pl-13 pt-4">{cust.Customer_name}</p>
                  </div>
                  <div className="w-[15%] p-2 ml-8 flex justify-center">
                    <p className="font-Poppins">{cust.Company_name}</p>
                  </div>
                  <div className="w-[16%] flex items-center justify-center ml-17">
                    <p className="font-Poppins">{cust.Contact_no}</p>
                  </div>
                  <div className="w-[16%] ml-11 flex items-center">
                    <p className="font-Poppins pl-6">{cust.Email}</p>
                  </div>
                  <div className="w-[14%] flex justify-center items-center ml-2 pl-5">
                    <p className="font-Poppins">{cust.Country}</p>
                  </div>
                  <div className="w-[8%] ml-12 pl-2 flex justify-center items-center">
                    <Flex gap="4px 0" wrap>
                      <Tag color={cust.Status.toLowerCase() === "active" ? "success" : "error"}>
                        {cust.Status}
                      </Tag>
                    </Flex>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full py-5 font-Poppins">No Customers Found.</p>
            )}
          </div>

          <div className="w-full bg-amber-200 mt-4">
            <hr className="w-full border-[#f2f2f2]" />
          </div>

          <div className="w-full flex justify-between rounded-b-4xl">
            <div className="w-[40%] mt-4 mb-4 flex items-center">
              <p className="font-Poppins pl-4 text-[#d9d2d7] text-[13px]">
                Showing {customers?.length || 0} of {totalCustomer}
              </p>
            </div>
            <div className="w-[20%] mt-4 mb-4">
              <Pagination
                current={currentPage}
                onChange={handleChange}
                total={totalCustomer}
                pageSize={5}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Table_content;
