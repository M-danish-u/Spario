import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { editStore } from "../../redux/featuer/admin/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

const StoreEditModal = ({ onEditClose, store }) => {
  console.log(store,'ddddddddd');
  const validationSchema = Yup.object().shape({
    store_name: Yup.string().required("Store Name is required"),
    customer_name: Yup.string().required("Customer Name is required"),
    address: Yup.string().required("Address is required"),
    contact_one: Yup.string().required("Mobile 1 is required"),
    contact_two: Yup.string().required("Mobile 2 is required"),
    executive: Yup.string().required("Executive is required"),
    route: Yup.string().required("Route is required"),
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      store_name: store?.store_name || "", 
      customer_name: store?.customer_name || "",
      address: store?.address || "",
      contact_one: store?.contact_one || "",
      contact_two: store?.contact_two || "",
      executive: store?.executive.name || "", // Default value for executive input
      route: store?.route.route_name || "", // Default value for route input
    }
  });

  const dispatch = useDispatch();

  const [showRouteList, setShowRouteList] = useState(false);
  const [showExecutiveList, setShowExecutiveList] = useState(false);

  useEffect(() => {
    // Additional data fetching or initialization can go here if needed
  }, []);

  const routeData = useSelector((state) => state?.admin?.AllRouteData?.routes || []);
  const executiveData = useSelector((state) => state?.admin?.AllExecutiveData?.executives || []);

  const routes = routeData.map(route => ({ id: route.id, name: route.route_name }));
  const executives = executiveData.map(executive => ({ id: executive.id, name: executive.name }));

  const handleRouteSelect = (route) => {
    setValue("route", route.name);
    setValue("route_id", route.id); // Set the selected route ID in the form state
    setShowRouteList(false);
  };

  const handleExecutiveSelect = (executive) => {
    setValue("executive", executive.name);
    setValue("executive_id", executive.id); // Set the selected executive ID in the form state
    setShowExecutiveList(false);
  };

  const watchRoute = watch("route");
  const watchExecutive = watch("executive");

  const onSubmit = (data) => {
    // Check if the route and executive fields have been modified
    const routeId = watchRoute === store.route.route_name ? undefined : data.route_id;
    const executiveId = watchExecutive === store.executive.name ? undefined : data.executive_id;

    // Dispatch action to edit store, including selected route and executive IDs
    dispatch(editStore({
      id: store.id,
      data: {
        ...data,
        route_id: routeId,
        executive_id: executiveId
      }
    }))
      .then(() => {
        // Handle success
        onEditClose(); // Close the modal
      })
      .catch((error) => {
        // Handle error
        console.error('Error editing store:', error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative">
        <h2 className="font-medium text-xl text-[#343C6A]">Edit Store</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex gap-5">
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

          <div className="flex gap-5">
            <Input
              type="text"
              id="address"
              label="Address"
              register={register}
              errors={errors}
              placeholder="Address"
            />
            <div className="relative flex-grow">
              <label>Route</label>
              <div className="relative">
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
                    {routes.map((route) => (
                      <div
                        key={route.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleRouteSelect(route)}
                      >
                        {route.name}
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

          <div className="flex gap-5">
            <div className="relative flex-grow">
              <label>Executive</label>
              <div className="relative">
                <input
                  type="text"
                  id="executive"
                  {...register("executive")}
                  placeholder="Executive"
                  className="peer block min-h-[auto] h-12 w-full rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                  readOnly // Make the input read-only to prevent direct typing
                />
                <IoChevronDown
                  className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowExecutiveList(!showExecutiveList)}
                />
                {showExecutiveList && (
                  <div className="absolute top-full left-0 w-full z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                    {executives.map((executive) => (
                      <div
                        key={executive.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleExecutiveSelect(executive)}
                      >
                        {executive.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
