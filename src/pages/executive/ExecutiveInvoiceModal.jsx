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
  
} from "../../redux/featuer/admin/AdminSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBalance, getExecutiveStore } from "../../redux/featuer/executive/ExecutiveSlice";

const validationSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  invoice_value: Yup.string().required("Invoice Value is required"),
  advance_paid: Yup.string().required("Advance Paid is required"),
  due_date: Yup.date().required("Date is required"),
  // opening_balance: Yup.string() || "",
  payment_method: Yup.string().required("Payment Method is required"),
  reference_no: Yup.string(),
});

const ExecutiveInvoiceModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility
  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,watch
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExecutiveStore(executive_id));

   
  }, [dispatch,])

  const storeData = useSelector(
    (state) => state?.executive?.StoreData.stores || []
  );
  console.log(storeData,'ssssssssssssssss');
  const stores = storeData.map((store) => ({
    id: store.id,
    name: store.store_name,
  }));
  const balance = useSelector((state) => state?.executive?.BalanceStore?.balance);
  

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
        setTimeout(() => {
          onClose();
        }, 2000);
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
      <div className="bg-white border flex-row p-8 rounded-xl  b-slate-700 g-white relative ">
        <div className="flex pb-4 border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Invoice</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="" size={24} />
          </button>
        </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex">

            <div className=" grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
              <div className="flex  flex-col">
                <label htmlFor="car">Select Store</label>
                <div className="">
                  <select
                    className="peer block min-h-[auto] h-12 w-[278px] mb-2 mt-3 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                   
                    id="storeName"
                    {...register("storeName")}
                    placeholder="Store Name"
                    style={{
                      WebkitAppearance: "none", 
                      MozAppearance: "none", 
                      appearance: "none", 
                      paddingRight: "30px" 
                    }}
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
         
              </div>
              
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

          <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
            <Input
              type="number"
              id="invoice_value"
              label="Invoice Value"
              register={register}
              errors={errors}
              placeholder="Invoice Value"
            />

            <Input
              type="number"
              id="advance_paid"
              label="Advance Paid"
              register={register}
              errors={errors}
              placeholder="Advance Paid"
            />
          </div>

          <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">

          <div className="">
              <label className="block mb-2">Payment Method</label>
<div className="flex gap-4 ">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  value="cash"
                  {...register("payment_method")}
                />
                <label htmlFor="cash" className="ml-2">Cash</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="Cheque"
                  name="payment_method"
                  value="Cheque"
                  {...register("payment_method")}
                />
                <label htmlFor="Cheque" className="ml-2">Cheque</label>
              </div>
              </div>
            </div>
            {errors.payment_method && (
              <p className="text-red-500 mt-1">{errors.payment_method.message}</p>
            )}
            {/* Input for check reference number */}
            {watch("payment_method") === 'Cheque' && (
              <div className="mt-4 md:mt-0">
              <Input
                type="text"
                id="reference_no"
                label="Reference Number"
                register={register}
                errors={errors}
                placeholder=" Reference Number"
              />
              </div>
            )}

          
            
          </div>

          <div className="grid  grid-cols-1 sm:mt-4 sm:grid-cols-2 gap:2 md:gap-4">

          {/* <Input
              type="number"
              id="opening_balance"
              label="Opening Balance"
              register={register}
              errors={errors}
              placeholder="Opening Balance"
            /> */}
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
            <div className=" mt-10">
              <button
                type="submit"
                className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Add Invoice
              </button>
            </div>
          </div>
          
        </form>

        
      </div>
    </div>
  );
};

export default ExecutiveInvoiceModal;
