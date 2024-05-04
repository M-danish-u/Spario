import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Input from "../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../redux/featuer/admin/AdminAuthSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    try {
      const actionResult = await dispatch(adminLogin(values));
  
      if (adminLogin.fulfilled.match(actionResult)) {
        const userRole = actionResult.payload.user.role;
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else if (userRole === "executive") {
          navigate("/executive/dashboard");
        }
        toast.success("Logged in successfully");
      } else if (adminLogin.rejected.match(actionResult)) {
        console.log("Login failed:", actionResult.error);
        toast.error(actionResult.payload.error );
        console.log(actionResult.error,'llllllllllll');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in");
    }
  };
  
  
  
  return (
    <div className="flex items-center flex-col justify-center h-screen bg-[#f0f4fa]">

       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="bg-white px-16 py-10 rounded-2xl ">
        <p className="w-full border-b-[1px] text-center border-[#f0f4fa] text-2xl pb-4">
          Login
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-10">
          <div className=" gap-6">
            <Input
              type="text"
              id="email"
              label="User Name"
              register={register}
              errors={errors}
              placeholder="User Name"
            />

            <div className="relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Password"
                className="peer block min-h-[auto] h-12 w-full mt-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-14 text-slate-400 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="mt-7">
              <button
                type="submit"
                className="px-2 py-2 w-[270px] mt-3 gap-4 justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                LOGIN
                <FaArrowRight />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
