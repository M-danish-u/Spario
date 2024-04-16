// InvoiceModal.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import Button from "../../components/commonComponents/Button";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  invoiceNo: Yup.string().required("Invoice No. is required"),
  invoiceValue: Yup.number().required("Invoice Value is required"),
  advancePaid: Yup.number().required("Advance Paid is required"),
  amount: Yup.number().required("Amount is required"),
  balance:Yup.number().required("Balance amount required")
});

const InvoiceModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);

  // Use useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema), // Apply validation schema
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose(); // Close the modal
  };

  const handleStoreSelect = (storeName) => {
    setShowStoreList(false);
    setValue("storeName", storeName); // Set selected store name using setValue
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Invoice</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex gap-5">
            <div className="relative flex-grow">
              <label>Store Name</label>
              <input
                type="text"
                id="storeName"
               
                {...register("storeName")}
                placeholder="Store Name"
                className="peer block min-h-[auto] h-12 w-full rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
              />
              <IoChevronDown
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowStoreList(!showStoreList)}
              />
              {showStoreList && (
                <div className="absolute top- left-0 w-full z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                
                  {["Store 1", "Store 2", "Store 3"].map((storeName) => (
                    <div
                      key={storeName}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleStoreSelect(storeName)}
                    >
                      {storeName}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Input
              type="text"
              id="invoiceNo"
              label="Invoice No."
              register={register}
              errors={errors}
              placeholder="Invoice No"
            />
          </div>

          <div className="flex gap-5">
            <Input
              type="text"
              id="invoiceValue"
              label="Invoice Value"
              register={register}
              errors={errors}
              placeholder="Invoice Value"
            />
            <Input
              type="text"
              id="advancePaid"
              label="Advance Paid"
              register={register}
              errors={errors}
              placeholder="Advance Paid"
            />
          </div>

          <div className="flex gap-5">
            <Input
              type="text"
              id="amount"
              label="Amount"
              register={register}
              errors={errors}
              placeholder="Amount"
            />

            <Input
              type="text"
              id="balance"
              label="Balance"
              register={register}
              errors={errors}
              placeholder="Balance"
            />
            
          </div>
          <div className="mt-7">
              <button 
               type="submit"
              className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md">
                + Add Invoice
              </button>
            </div>
        </form>

        <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose className="mt-5" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
