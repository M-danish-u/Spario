import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoices,
  getAllStores,
  getBalance,
} from "../../redux/featuer/admin/AdminSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  invoice_value: Yup.number().required("Invoice Value is required"),
  advance_paid: Yup.number().required("Advance Paid is required"),
  due_date: Yup.date().required("Date is required"),
});

const InvoiceModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  const storeData = useSelector(
    (state) => state?.admin?.AllStoreData?.stores || []
  );
  const stores = storeData.map((store) => ({
    id: store.id,
    name: store.store_name,
  }));
  const balance = useSelector((state) => state?.admin?.BalanceStore?.balance);

  const handleStoreSelect = (store) => {
    dispatch(getBalance(store.id));
    setValue("storeName", store.name);
    setValue("store_id", store.id); // Set the selected store ID in the form state
    setShowStoreList(false);
    setShowBalance(true); // Show the balance div when a store is selected
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("due_date", date); // Set the value in the form using setValue
  };

  const generateInvoiceNumber = () => {
    // Implement your logic to generate the invoice number here
    // For example, you can use a combination of prefix, date, and a sequential number
    const prefix = "INV";
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    const sequentialNumber = Math.floor(Math.random() * 10000); // Generate a random sequential number
    return `${prefix}-${year}${month}${day}-${sequentialNumber}`;
  };

  const onSubmit = (data) => {
    console.log(data);
    data.invoice_number = generateInvoiceNumber(); // Generate invoice number before submission
    dispatch(createInvoices(data))
      .then(() => {
        // Handle success
        console.log("Invoice created successfully:", data);
        toast.success("Invoice created successfully");
        window.location.reload();
        // setTimeout(() => {
        //   onClose();
        // }, 2000);
        // onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating invoice:", error);
        toast.error(error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center p-4 z-50 bg-black/70">
      <ToastContainer
        position="top-right"
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white border flex-row py-8 rounded-xl px-8 sm:px-20 b-slate-700 g-white relative ">
        <div className="flex items-center border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Invoice</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="mt-5" size={24} />
          </button>
        </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex">
            <div className=" flex flex-col sm:flex-row gap:2 md:gap-4">
              <div className="flex  flex-col">
                <label htmlFor="car">Select Store</label>
                <div className="">
                  <select
                    className="peer block min-h-[auto] h-12 w-[278px] mb-2 mt-3 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                   
                    id="storeName"
                    {...register("storeName")}
                    placeholder="Store Name"
                    onChange={(e) => {
                      handleStoreSelect(
                        stores.find((store) => store.name === e.target.value)
                      );
                    }}
                  >
                    {/* Map over stores array to generate options */}
                    <option value=''>Select a Store</option>

                    {stores.map((store) => (
                      <option key={store.id} value={store.name}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <label>Store Name</label>
                <div className="w-fill bg-slate- relative flex mt-2 mb-2 items-center border-[1px] border-slate-200 pr-2  rounded-md justify-end ">
                  <input
                    type="text"
                    id="storeName"
                    onClick={() => setShowStoreList(!showStoreList)}
                    {...register("storeName")}
                    placeholder="Store Name"
                    className="peer block min-h-[auto] h-12  border-none  rounded-lg text-[#718EBF]  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                  />
                  <IoChevronDown className=" mt-  transform -translate-y-1/2 cursor-pointer text-gray-400" />
                </div>
                {showStoreList && (
                  <div className=" absolute   z-10 h-48 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-b-lg">
                    {stores.map((store) => (
                      <div
                        key={store.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleStoreSelect(store)}
                      >
                        {store.name}
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
              {/* balance div */}

              {/* <div className="bg-slate-200 md:mt-6 font-semibold px-8 md:ml-[-20px] py-2 flex items-center rounded-md">
                Balance:
                {showBalance && (
                  <div className="">
                    <p className=""> {balance}</p>
                  </div>
                )}
              </div> */}
              <div className="md:mt- flex flex-col gap-3">
              Balance
              <p className="peer  min-h-[auto] w-[278px]  flex h-12 mb-2  items-center  rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6]    ">
                Balance:
                {showBalance && (
                  <div className="">
                    <p className=""> {balance}</p>
                  </div>
                  
                )}
              </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap:2 md:gap-4">
            <Input
              type="text"
              id="invoice_value"
              label="Invoice Value"
              register={register}
              errors={errors}
              placeholder="Invoice Value"
            />

            <Input
              type="text"
              id="advance_paid"
              label="Advance Paid"
              register={register}
              errors={errors}
              placeholder="Advance Paid"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap:2 md:gap-4">
            <div className="mt- ">
              <label className="block mb-2">Due Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="w-full px-3 py-[0.40rem] mt-1 h-[45px] rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
              />
              {errors.due_date && (
                <p className="text-red-500 mt-1">{errors.due_date.message}</p>
              )}
            </div>
            <div className="md:mt-10">
              <button
                type="submit"
                className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Add Invoice
              </button>
            </div>
          </div>
          <div className="flex gap-4"></div>
        </form>

        
      </div>
    </div>
  );
};

export default InvoiceModal;
