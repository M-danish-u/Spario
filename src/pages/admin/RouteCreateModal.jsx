import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose ,IoChevronDown} from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    routeName: Yup.string().required("Route Name is required"),
    // stores: Yup.string().required("Store Name is required"),
    
});

const RouteCreateModal = ({ onClose }) => {
    

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
                <h2 className="font-medium text-xl text-[#343C6A]">Add Route</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                    <div className="flex gap-6">
                        <Input
                            type="text"
                            id="routeName"
                            label="Route Name"
                            register={register}
                            errors={errors}
                            placeholder="Route Name"
                        />
                    
                    <div className="mt-7">
                            <button
                                type="submit"
                                className="px-2 py-2 w-[270px] mt-3  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
                            >
                                + Add Route
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

                   

                    <div className="flex gap-5">
                    
                            
                      
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

export default RouteCreateModal;
