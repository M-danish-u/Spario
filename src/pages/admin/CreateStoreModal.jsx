import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createStore,
  getAllExecutive,
  getAllRoute,
} from "../../redux/featuer/admin/AdminSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  store_name: Yup.string().required("Store Name is required"),
  customer_name: Yup.string().required("Customer Name is required"),
  address: Yup.string().required("Address is required"),
  route: Yup.string().required("Route is required"),
  contact_one: Yup.string().required("Mobile 1 is required")
    .matches(/^[0-9]{10}$/, "Mobile 1 must be a valid 10-digit number"),
  contact_two: Yup.string().matches(/^[0-9]{10}$/, {
    message: 'Mobile 2 must be a valid 10-digit number',
    excludeEmptyString: true, // Allow empty string
  }),
  executive: Yup.string().required("Executive is required"),
   opening_balance: Yup.string(),
});



const CreateStoreModal = ({ onClose }) => {
  const [showRouteList, setShowRouteList] = useState(false);
  const [showExecutiveList, setShowExecutiveList] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoute());
    dispatch(getAllExecutive());
  }, [dispatch]);

  const routeData = useSelector(
    (state) => state?.admin?.AllRouteData?.routes || []
  );
  const executiveData = useSelector(
    (state) => state?.admin?.AllExecutiveData?.executives || []
  );

  const routes = routeData.map((route) => ({
    id: route.id,
    name: route.route_name,
  }));
  const executives = executiveData.map((executive) => ({
    id: executive.id,
    name: executive.name,
  }));

  const handleRouteSelect = (route) => {
    setValue("route", route.name);
    setValue("route_id", route.id); // Set the selected route ID in the form state
    setShowRouteList(false);
  };
  const navigate = useNavigate();

  const handleExecutiveSelect = (executive) => {
    console.log(executive);
    setValue("executive", executive.name);
    setValue("executive_id", executive.id); // Set the selected executive ID in the form state
    setShowExecutiveList(false);
  };

  const onSubmit = (data) => {
    dispatch(createStore({
      ...data,
      route_id: data.route_id,
      executive_id: data.executive_id,
    }))
      .then((result) => {
        if (createStore.fulfilled.match(result)) {
          console.log("Store created successfully:", result.payload);
          toast.success('Store created successfully');
        } else if (createStore.rejected.match(result)) {
          console.log('Error creating store:', result);
          // Handle error if store creation fails
          toast.error(result.payload[0]);
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        {/* <h2 className="font-medium text-xl text-[#343C6A]">Create Store</h2> */}
        <div className="flex pb-4 border-b-[1px] justify-between w-full">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Store</h2>
        <div className=" " onClick={onClose}>
          <button>
            <IoClose className="mt-" size={24} />
          </button>
        </div>
        </div> 
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
            <Input
              type="text"
              id="store_name"
              label="Store Name."
              register={register}
              errors={errors}
              placeholder="Store Name"
            />
            <Input
              type="text"
              id="customer_name"
              label="Customer Name"
              register={register}
              errors={errors}
              placeholder="Customer Name"
            />
          </div>

          <div className="grid  md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
            <Input
              type="text"
              id="address"
              label="Address"
              register={register}
              errors={errors}
              placeholder="Address"
            />

            <div className="flex  flex-col">
              <label htmlFor="car">Route</label>
              <div className="">
                <select
                  className="peer block min-h-[auto] h-12 w-[280px] mt-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                  id="route"
                  {...register("route")}
                  placeholder="Route"
                  // style={{
                  //   WebkitAppearance: "none", 
                  //   MozAppearance: "none", 
                  //   appearance: "none", 
                  //   paddingRight: "30px" 
                  // }}
                  onChange={(e) => {
                    handleRouteSelect(
                      routes.find((route) => route.name === e.target.value)
                    );
                  }}
                >
                  <option>Select Route</option>

                  {/* Map over stores array to generate options */}
                  {routes.map((route) => (
                    <option key={route.id} value={route.name}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
           
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

          <div className="grid md:mt-3  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
            <div className="flex  flex-col">
              <label htmlFor="car">Executive</label>
              <div className="">
                <select
                  className=" min-h-[auto] h-12 w-[280px] mt-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                  id="executive"
                  {...register("executive")}
                  placeholder="Executive"
                  // style={{
                  //   WebkitAppearance: "none", 
                  //   MozAppearance: "none", 
                  //   appearance: "none", 
                  //   paddingRight: "30px" 
                  // }}
                  onChange={(e) => {
                    handleExecutiveSelect(
                      executives.find(
                        (executive) => executive.name === e.target.value
                      )
                    );
                  }}
                >
                  {/* Map over stores array to generate options */}
                  <option>Select Executive</option>
                  {executives.map((executive) => (
                    <option key={executive.id} value={executive.name}>
                      {executive.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
           <Input
              type="number"
              id="opening_balance"
              label="Opening Balance"
              register={register}
              errors={errors}
              placeholder="Opening Balance"
            /> 
            
          </div>

          <div className="flex gap-4">
          <div className="mt-2">
              <button
                type="submit"
                className="px-2 py-[9px] w-[280px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Create Store
              </button>
            </div>
          </div>
        </form>

        {/* <div className="absolute top-2 right-2" onClick={onClose}>
          <button>
            <IoClose className="mt-5" size={24} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CreateStoreModal;
