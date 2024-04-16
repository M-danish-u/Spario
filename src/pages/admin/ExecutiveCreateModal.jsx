import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose ,IoChevronDown} from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  executiveName: Yup.string().required("Executive Name is required"),
    address: Yup.string().required("Address is required"),
    mobile1: Yup.string().required("Mobile 1 is required"),
    Mobile2: Yup.string().required("Mobile 2 is required"),
    userName: Yup.string().required("UserName is required"),
});

const ExecutiveCreateModal = ({ onClose }) => {
    

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        onClose(); // Close the modal
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
            <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative">
                <h2 className="font-medium text-xl text-[#343C6A]">Add Executive</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                    <div className="flex gap-5">
                        <Input
                            type="text"
                            id="executiveName"
                            label="Executive Name"
                            register={register}
                            errors={errors}
                            placeholder="Executive Name"
                        />
                    
                   
                   <Input
                            type="text"
                            id="mobile1"
                            label="Mobile 1"
                            register={register}
                            errors={errors}
                            placeholder="Mobile"
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
                            id="Mobile2"
                            label="Mobile 2"
                            register={register}
                            errors={errors}
                            placeholder="Mobile"
                        />
                    </div>

                    <div className="flex gap-5">
                    <Input
                            type="text"
                            id="userName"
                            label="User Name"
                            register={register}
                            errors={errors}
                            placeholder="User Name"
                        />
                            
                        <div className="mt-7">
                            <button
                                type="submit"
                                className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
                            >
                                + Add Executive
                            </button>
                        </div>
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

export default ExecutiveCreateModal;