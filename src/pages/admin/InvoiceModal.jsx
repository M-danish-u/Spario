import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoices,
  getAllStores,
  getBalance,
} from "../../redux/featuer/admin/AdminSlice";

const validationSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  invoice_number: Yup.string().required("Invoice No. is required"),
  invoice_value: Yup.number().required("Invoice Value is required"),
  advance_paid: Yup.number().required("Advance Paid is required"),
  due_date: Yup.date().required("Date is required"),
});

const InvoiceModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility

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
    dispatch(getAllStores());
  }, [dispatch]);

  const storeData = useSelector(
    (state) => state?.admin?.AllStoreData?.stores || []
  );
  const stores = storeData.map((store) => ({
    id: store.id,
    name: store.store_name,
  }));
  const balance = useSelector((state) => state?.admin?.BalanceStore?.balance);

  const handleStoreSelect = (store) => {
    dispatch(getBalance(store.id));
    console.log(store, "qqqqq");
    setValue("storeName", store.name);
    setValue("store_id", store.id); // Set the selected store ID in the form state
    setShowStoreList(false);
    setShowBalance(true); // Show the balance div when a store is selected
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("due_date", date); // Set the value in the form using setValue
  };

  const onSubmit = (data) => {
    // Dispatch action to create invoice
    dispatch(createInvoices(data))
      .then(() => {
        // Handle success
        console.log("Invoice created successfully:", data);
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating invoice:", error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
      <div className="bg-white border flex-row py-8 rounded-xl px-20 b-slate-700 g-white relative ">
        <h2 className="font-medium text-xl text-[#343C6A]">Add Invoice</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex ">
            <div className="relative gap-5 flex">
              <div>
              <label>Store Name</label>
              <input
                type="text"
                id="storeName"
                {...register("storeName")}
                placeholder="Store Name"
                className="peer block min-h-[auto] h-12  rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
              />
              <IoChevronDown
                className="absolute left-60 top-12 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowStoreList(!showStoreList)}
              />
              {showStoreList && (
                <div className="absolute top-full left-0 w-full z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                  {stores.map((store) => (
                    <div
                      key={store.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleStoreSelect(store)}
                    >
                      {store.name}
                    </div>
                  ))}
                </div>
              )}
              </div>
              {/* balance div */}
              {showBalance && (
                <div className="mt-8">
                  <p className="font-semibold">Balance: {balance}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <Input
              type="text"
              id="invoice_number"
              label="Invoice No."
              register={register}
              errors={errors}
              placeholder="Invoice No"
            />
            <Input
              type="text"
              id="invoice_value"
              label="Invoice Value"
              register={register}
              errors={errors}
              placeholder="Invoice Value"
            />
          </div>

          <div className="flex gap-5">
            <Input
              type="text"
              id="advance_paid"
              label="Advance Paid"
              register={register}
              errors={errors}
              placeholder="Advance Paid"
            />

            <div className="mt- ">
              <label className="block mb-2">Due Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="w-full px-3 py-[0.40rem] mt-1 h-[45px] rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
              />
              {errors.due_date && (
                <p className="text-red-500 mt-1">{errors.due_date.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mt-7">
              <button
                type="submit"
                className="px-2 py-2 w-[270px]  justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md"
              >
                + Add Invoice
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

export default InvoiceModal;
