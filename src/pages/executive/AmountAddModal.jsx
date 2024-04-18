import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  route: Yup.string().required("Route is required"),
  store: Yup.string().required("Store is required"),
});

const AmountAddModal = ({ onClose }) => {
  const [showRouteList, setShowRouteList] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleRouteSelect = (routeName) => {
    setValue("route", routeName);
    setShowRouteList(false);
  };

  const routes = ["Route 1", "Route 2", "Route 3"]; // List of routes

  const onSubmit = (data) => {
    console.log(data);
    onClose(); // Close the modal
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Amount</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex gap-5">
            <Input
              type="text"
              id="amount"
              label="Amount"
              register={register}
              errors={errors}
              placeholder="Amount"
            />
            <div className="relative  flex-grow">
              <label className="">Route</label>
              <div className="relative mt-3">
                <input
                  type="text"
                  id="route"
                  {...register("route")}
                  placeholder="Route"
                  className="peer block min-h-[auto] h-12 w-full rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                  readOnly // Make the input read-only to prevent direct typing
                />
                <IoChevronDown
                  className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowRouteList(!showRouteList)}
                />
                {showRouteList && (
                  <div className="absolute top-full left-0 w-full z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                    {routes.map((routeName) => (
                      <div
                        key={routeName}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleRouteSelect(routeName)}
                      >
                        {routeName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <Input
              type="text"
              id="store"
              label="Store"
              register={register}
              errors={errors}
              placeholder="Store"
            />

            <div className="mt-7">
              <button
                type="submit"
                className="px-2 py-2 w-[270px]  mt-3 justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Add Amount
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

export default AmountAddModal;
