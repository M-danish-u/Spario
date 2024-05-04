import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { editExicutive } from "../../redux/featuer/admin/AdminSlice";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExecutiveEditModal = ({ onEditClose, executive }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Executive Name is required"),
    address: Yup.string().required("Address is required"),
    contact_one: Yup.string().required("Mobile 1 is required"),
    contact_two: Yup.string().required("Mobile 2 is required"),
    email: Yup.string().required("User Name is required"),
  });
  console.log(executive, "exxx");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: executive?.name || "",
      address: executive?.address || "",
      contact_one: executive?.contact_one || "",
      contact_two: executive?.contact_two || "",
      email: executive?.email || "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    // Assuming handleSubmit handles form submission internally
    handleSubmit(async (formData) => {
      try {
        // Validate form data
        await validationSchema.validate(formData, { abortEarly: false });
        console.log("Data validation successful!");
  
        // Dispatch action to edit executive
        dispatch(editExicutive({ id: executive.id, data: formData }))
        .then((result) => {
          if (editExicutive.fulfilled.match(result)) {
            console.log("Executive edited successfully:", result.payload);
            toast.success("Executive Edited successfully");
            // You can reload the page or perform any other action upon successful edit
            window.location.reload();
          } else if (editExicutive.rejected.match(result)) {
            console.error('Error editing executive:', result.error);
            // Handle error if executive editing fails
            toast.error(result.payload.name[0] || "Failed to edit executive");
            console.log(result.payload,'loooog');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error("An error occurred while editing executive");
        });
      } catch (error) {
        console.error("Validation error:", error.errors);
        toast.error("Validation error: " + error.errors.join(", "));
      }
    })();
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
      <div className="bg-white border flex-row py-8 rounded-xl px-8 md:px-20 b-slate-700 g-white relative">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Executive</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex flex-col sm:flex-row gap:2 md:gap-4">
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
              id="contact_one"
              label="Mobile 1"
              register={register}
              errors={errors}
              placeholder="Mobile"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap:2 md:gap-4">
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
              id="contact_two"
              label="Mobile 2"
              register={register}
              errors={errors}
              placeholder="Mobile"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap:2 md:gap-4">
            <Input
              type="text"
              id="email"
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
                + Update Executive
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

export default ExecutiveEditModal;
