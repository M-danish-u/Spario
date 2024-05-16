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
  invoice_value: Yup.string().required("Invoice Value is required"),
  // advance_paid: Yup.string().required("Advance Paid is required"),
  due_date: Yup.date().required("Date is required"),
  // payment_method: Yup.string().required("Payment Method is required"),
  // reference_no: Yup.string(),
  invoice_number:Yup.string().required("Payment Method is required"),

});

const InvoiceModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
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

  let invoiceCounter = 0; // Initialize the counter outside the function

  // const generateInvoiceNumber = () => {
  //     // Increment the counter for each invoice
  //     invoiceCounter++;
  
  //     // Implement your logic to generate the invoice number here
  //     // For example, you can use a combination of prefix, date, and the sequential number
  //     const prefix = "INV";
  //     const today = new Date();
  //     const year = today.getFullYear();
  //     const month = `${today.getMonth() + 1}`.padStart(2, "0");
  //     const day = `${today.getDate()}`.padStart(2, "0");
  //     const sequentialNumber = invoiceCounter.toString().padStart(4, "0"); // Convert counter to string and pad with zeros
  //     return `${prefix}-${year}${month}${day}-${sequentialNumber}`;
  // };

  const [paymentMethods, setPaymentMethods] = useState({
    cash: false,
    check: false,
  });
  const [checkNumber, setCheckNumber] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethods(prevState => ({
      ...prevState,
      [method]: !prevState[method],
    }));
    // Reset check number when unchecking payment method
    if (!paymentMethods[method]) {
      setCheckNumber('');
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // data.invoice_number = generateInvoiceNumber(); // Generate invoice number before submission
      const result = await dispatch(createInvoices(data));
      if (createInvoices.fulfilled.match(result)) {
        console.log("Invoice created successfully:", result.payload);
        toast.success("Invoice created successfully");
        // onClose(); // Close the modal after successful submission
      } else if (createInvoices.rejected.match(result)) {
        console.log("Error creating invoice:", result);
        // Handle error if invoice creation fails
        toast.error(result.payload.message);
      }
      setTimeout(() => {
        onClose()
      }, 2000);
    } catch (error) {
      // Handle error
      console.error("Error creating invoice:", error);
      toast.error("Error creating invoice: " + error.message);
    }
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
      <div className="bg-white border flex-row px-8 pt-6 pb-8 rounded-xl  b-slate-700 g-white relative ">
        <div className="flex  border-b-[1px] g-red-400 pb-4 justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Invoice</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="mt-" size={24} />
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
                    className=" min-h-[auto] h-12 w-[278px] mb-2 mt-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-4 py-[0.32rem] leading-[1.6] outline-none "
                   
                    id="storeName"
                    {...register("storeName")}
                    placeholder="Store Name"
                    // style={{
                    //   WebkitAppearance: "none", 
                    //   MozAppearance: "none", 
                    //   appearance: "none", 
                    //   paddingRight: "30px" ,
                    //   color: "#718EBF"
                    // }}
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
              
              <div className="md:mt- flex flex-col gap-2">
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

          <div className="grid  md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
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
              id="invoice_number"
              label="Invoice Number"
              register={register}
              errors={errors}
              placeholder="Invoice Number"
            />
          </div>

          {/* <div className="grid md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4"> */}

          {/* <div className="">
              <label className="block mb-2">Payment Method</label>
<div className="flex gap-4 mt-4 md:mt-0 ">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Cash"
                  name="payment_method"
                  value="Cash"
                  {...register("payment_method")}
                />
                <label htmlFor="Cash" className="ml-2">Cash</label>
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
            {/* {watch("payment_method") === 'Cheque' && (
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
            )}  */}

          
            
          {/* </div> */}
          <div className="md:mt-3  grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
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
            
    
          <div className="  mt-10">
              <button
                type="submit"
                className="px-2 py-[9px] w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
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

export default InvoiceModal;
