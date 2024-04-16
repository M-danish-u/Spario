import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoClose } from "react-icons/io5";

const StoreEditModal = ({ onEditClose, store }) => {
  const validationSchema = Yup.object().shape({
    storeName: Yup.string().required("Store Name is required"),
    customerName: Yup.string().required("Customer Name is required"),
    address: Yup.string().required("Address is required"),
    route: Yup.string().required("Route is required"),
    mobile1: Yup.string().required("Mobile 1 is required"),
    mobile2: Yup.string().required("Mobile 2 is required"),
    exicutive: Yup.string().required("Exicutive is required"),
  });

  console.log(store,'sssssssssss');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      storeName: store?.storeName || "", 
      customerName: store?.customerName || "",
      address: store?.address || "",
      route: store?.route || "",
      mobile1: store?.mobile1 || "",
      mobile2: store?.mobile2 || "",
      exicutive: store?.exicutive || "",
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    onEditClose(); // Close the modal
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative">
        <h2 className="font-medium text-xl text-[#343C6A]">Edit Store </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex gap-5">
            <Input
              type="text"
              id="storeName"
              label="Store Name."
              register={register}
              errors={errors}
              placeholder="Store Name"
            />
            <Input
              type="text"
              id="customerName"
              label="Customer Name"
              register={register}
              errors={errors}
              placeholder="Customer Name"
            />
          </div>
          <div className="flex gap-5">
            <Input
              type="text"
              id="address"
              label="Address"
              register={register}
              errors={errors}
              placeholder="Address"
            />
            <Input
              type="text"
              id="route"
              label="Route"
              register={register}
              errors={errors}
              placeholder="Route"
            />
          </div>
          <div className="flex gap-5">
            <Input
              type="text"
              id="mobile1"
              label="Mobile 1"
              register={register}
              errors={errors}
              placeholder="Mobile 1"
            />
            <Input
              type="text"
              id="mobile2"
              label="Mobile 2"
              register={register}
              errors={errors}
              placeholder="Mobile 2"
            />
          </div>
          <div className="flex gap-5">
            <Input
              type="text"
              id="exicutive"
              label="Exicutive"
              register={register}
              errors={errors}
              placeholder="Exicutive"
            />
            <div className="mt-7">
              <button 
                type="submit"
                className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="absolute top-2 right-2" onClick={onEditClose}>
          <button>
            <IoClose className="mt-5" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreEditModal;
