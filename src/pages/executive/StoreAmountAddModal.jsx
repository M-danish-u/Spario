import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AddAmount } from "../../redux/featuer/executive/ExecutiveSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  // stores: Yup.string().required("Store Name is required"),
  payment_method: Yup.string().required("Payment Method is required"),
  reference_no: Yup.string(),
});

const StoreAmountAddModal = ({ onClose, store,}) => {
  console.log(store, "ooooooooooooo");
  const executive_id = store.executive_id;
  const store_id = store.id;

  console.log(store_id, "srid");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,watch
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch=useDispatch()

  const onSubmit = (data) => {
    // Include store_id in the form data
    const formData = { ...data, store_id };
    
    dispatch(AddAmount({ id: executive_id, body: formData }))
      .then(() => {
        console.log("Amount Added successfully:", data);
        toast.success('Amount Added successfully');

        window.location.reload()
        
        // setTimeout(() => {
        //   onClose();
        // }, 2000);
      })
      .catch((error) => {
        console.error("Error adding amount:", error);
        toast.error(error);

      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
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
      <div className="bg-white border flex-row p-8 rounded-xl  b-slate-700 g-white relative">

      
      <div className="flex  pb-4 border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Amount</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="mt-" size={24} />
          </button>
        </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">

        <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">

<div className="">
    <label className="block mb-2">Payment Method</label>
<div className="flex gap-4 mt-4">
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
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4  mt-4 ">
            <Input
              type="text"
              id="amount"
              label="Amount"
              register={register}
              errors={errors}
              placeholder="Add Amount "
            />

            <div className="sm:mt-7">
              <button
                type="submit"
                className="px-2 py-2 w-[270px] mt-3  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Add Amount
              </button>
            </div>
            {/* <Input
                            type="text"
                            id="stores"
                            label="Stores"
                            register={register}
                            errors={errors}
                            placeholder="Stores"
                        /> */}
          </div>

          <div className="flex gap-5"></div>
        </form>

        
      </div>
    </div>
  );
};

export default StoreAmountAddModal;
