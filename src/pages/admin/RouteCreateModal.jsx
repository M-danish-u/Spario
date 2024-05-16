import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose ,IoChevronDown} from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createRoute } from "../../redux/featuer/admin/AdminSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
    route_name: Yup.string().required("Route Name is required"),
    // stores: Yup.string().required("Store Name is required"),
    
});

const RouteCreateModal = ({ onClose }) => {
    

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // const onSubmit = (data) => {
    //     console.log(data);
    //     onClose(); // Close the modal
    // };


    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data,'ssss');
        dispatch(createRoute(data))
        .then(() => {
        //   toast.success('Executive created successfully!'); // Display success message
        console.log("Executive Edited successfully:", data);
        toast.success("Route Added successfully");
        window.location.reload()
        // setTimeout(() => {
        //     onClose();
        // }, 2000);
        })
        .catch((error) => {
          console.error('Error adding college:', error);
          // Handle error if college addition fails
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
            <div className="bg-white border flex-row px-8 pt-6 pb-8 rounded-xl  b-slate-700 g-white relative">
            <div className="flex pb-4 border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Route</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="" size={24} />
          </button>
        </div>
        </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                    <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
                        <Input
                            type="text"
                            id="route_name"
                            label="Route Name"
                            register={register}
                            errors={errors}
                            placeholder="Route Name"
                        />
                    
                    <div className="sm:mt-7">
                            <button
                                type="submit"
                                className="px-2 py-[9px] w-[270px] mt-3  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
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

            </div>
        </div>
    );
};

export default RouteCreateModal;
