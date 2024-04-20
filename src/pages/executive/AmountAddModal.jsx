import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose, IoChevronDown } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AddAmount, getExecutiveStore } from "../../redux/featuer/executive/ExecutiveSlice";

const validationSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  store_id: Yup.string().required("Store is required"), // Change validation to store_id
});

const AmountAddModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to hold the selected store

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const executive_id = useSelector((state) => state?.executiveAuth?.executive.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExecutiveStore(executive_id));
  }, [dispatch, executive_id]);

  const storeData = useSelector((state) => state?.executive?.StoreData || []);
  const stores = storeData.stores.map(store => ({ id: store.id, name: store.store_name }));

  const handleStoreSelect = (store) => {
    setValue("store_id", store.id); // Set store_id instead of storeName
    setSelectedStore(store);
    setShowStoreList(false);
  };

  const onSubmit = (data) => {
    dispatch(AddAmount({ id: executive_id, body: data }))
      .then(() => {
        console.log("Amount added successfully:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding amount:", error);
      });
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
            <div className="relative flex-grow">
              <label className="">Stores</label>
              <div className="relative mt-3">
                <input
                  type="text"
                  id="store_id"
                  value={selectedStore ? selectedStore.name : ""}
                  placeholder="Store"
                  className="peer block min-h-[auto] h-12 w-full rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                  readOnly
                />
                <IoChevronDown
                  className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowStoreList(!showStoreList)}
                />
                {showStoreList && (
                  <div className="absolute top-full left-0 w-full z-10 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                    {stores.map((store) => (
                      <div
                        key={store.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleStoreSelect(store)}>
                        {store.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
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
