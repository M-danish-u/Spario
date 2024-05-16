import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose ,IoChevronDown} from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createExecutive } from "../../redux/featuer/admin/AdminSlice";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Executive Name is required")
      .min(2, "Executive Name must be at least 2 characters")
      .max(50, "Executive Name must be at most 50 characters"),
    address: Yup.string()
      .required("Address is required")
      .max(255, "Address must be at most 255 characters"),
    contact_one: Yup.string()
      .required("Mobile 1 is required")
      .matches(/^[0-9]{10}$/, "Mobile 1 must be a valid 10-digit number"),
      contact_two: Yup.string().matches(/^[0-9]{10}$/, {
        message: 'Mobile 2 must be a valid 10-digit number',
        excludeEmptyString: true, // Allow empty string
      }),
    email: Yup.string()
      .required("Username is required")
      .max(50, "Username must be at most 50 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  

const ExecutiveCreateModal = ({ onClose }) => {
    

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const dispatch = useDispatch();

    const onSubmit = (data) => {
      dispatch(createExecutive(data))
        .then((result) => {
          if (createExecutive.fulfilled.match(result)) {
            console.log("Executive created successfully:", result.payload);
            toast.success('Executive created successfully');
            window.location.reload();
          } else if (createExecutive.rejected.match(result)) {
            console.log('Error creating executive:', result.payload);
            // Handle error if executive creation fails
            toast.error(result.payload[0]);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
     

    // const onSubmit = (data) => {
    //     console.log(data);
    //     // Close the modal
    // };

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
            <div className="bg-white border flex-row px-8 pt-6 pb-8 rounded-xl   b-slate-700 g-white relative">
            <div className="flex pb-4 border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl  text-[#343C6A]">Add Executive</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="" size={24} />
          </button>
        </div>
        </div>                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
                    <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
                        <Input
                            type="text"
                            id="name"
                            label="Executive Name"
                            register={register}
                            errors={errors}
                            placeholder="Executive Name"
                        />
                        
                        <Input
                            type="text"
                            id="address"
                            label="Address"
                            register={register}
                            errors={errors}
                            placeholder="Address"
                        />
                   
                    
                    </div>

                    <div className="grid md:mt-3  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
                   
                    <Input
                            type="text"
                            id="contact_one"
                            label="Mobile 1"
                            register={register}
                            errors={errors}
                            placeholder="Mobile"
                        />
                        <Input
                            type="text"
                            id="contact_two"
                            label="Mobile 2"
                            register={register}
                            errors={errors}
                            placeholder="Mobile"
                        />
                    </div>

                    <div className="grid md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
                    <Input
                            type="text"
                            id="email"
                            label="User Name"
                            register={register}
                            errors={errors}
                            placeholder="User Name"
                        />

                        <Input
                            type="password"
                            id="password"
                            label="Password"
                            register={register}
                            errors={errors}
                            placeholder="Password"
                        />
                            
                        
                    </div>
                    <div className=" mt-4">
                            <button
                                type="submit"
                                className="px-2 py-[9px] w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
                            >
                                + Add Executive
                            </button>
                        </div>
                </form>

                
            </div>
        </div>
    );
};

export default ExecutiveCreateModal;
