import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AddAmount, getBalance, getExecutiveStore } from "../../redux/featuer/executive/ExecutiveSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
  store_id: Yup.string().required("Store is required"), // Change validation to store_id
  payment_method: Yup.string().required("Payment Method is required"),
  reference_no: Yup.string(),
  rtgs_number:Yup.string(),
});

const AmountAddModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to hold the selected store
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility
  const [enteredAmount, setEnteredAmount] = useState(0); // State variable to hold the entered amount

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,watch
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
  const dispatch = useDispatch();

  const balance = useSelector((state) => state?.executive?.BalanceStore?.balance);
  console.log(balance,'bbbbbb');

  useEffect(() => {
    dispatch(getExecutiveStore(executive_id));
  }, [dispatch, executive_id]);

  const storeData = useSelector((state) => state?.executive?.StoreData || []);

 

  const storesWithPositiveBalance = storeData.stores
    .filter(store => store.balance_amount > 0)
    .map(store => ({ id: store.id, name: store.store_name }));

  const handleStoreSelect = (store) => {
    console.log(store);
    dispatch(getBalance(store.id));

    setValue("store_id", store.id); // Set store_id instead of storeName

    setSelectedStore(store);
    setShowStoreList(false);
    setShowBalance(true);
  };

  const onSubmit = (data) => {
    if (enteredAmount > balance) {
      toast.error('Amount exceeds balance');
      return; // Block submission and show toast
    }

    dispatch(AddAmount({ id: executive_id, body: data }))
      .then(() => {
        console.log("Amount Added successfully:", data);
        toast.success('Amount Added successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding amount:", error);
        toast.error(error);
      });
  };

  const isButtonDisabled = balance < enteredAmount; // Check if balance is less than entered amount

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
      <div className="bg-white border flex-row px-8 pt-6 pb-8 rounded-xl b-slate-700 g-white relative">
        <div className="flex  border-b-[1px]  pb-4 justify-between w-full">
          <h2 className="font-medium text-xl text-[#343C6A]">Add Amount</h2>
          <div className="" onClick={onClose}>
            <button>
              <IoClose className="" size={24} />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">
            <div className="flex  flex-col">
              <label htmlFor="car">Select Store</label>
              <div className="">
                <select
                  className="peer block min-h-[auto] h-12 w-[278px] mb-2 mt-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                  id="storeName"
                  {...register("storeName")}
                  placeholder="Store Name"
                  //  style={{
                  //   WebkitAppearance: "none", 
                  //   MozAppearance: "none", 
                  //   appearance: "none", 
                  //   paddingRight: "30px" 
                  // }}
                  onChange={(e) => {
                    handleStoreSelect(
                      storesWithPositiveBalance.find((store) => store.name === e.target.value)
                    );
                  }}
                >
                  <option value=''>Select a Store</option>
                  {storesWithPositiveBalance.map((store) => (
                    <option key={store.id} value={store.name}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:mt- flex flex-col gap-3">
              Balance
              <p className="peer  min-h-[auto] w-[278px]  flex h-12 mb-2  items-center  rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6]    ">
                Balance:
                {showBalance && (
                  <div className="">
                    <p className=""> {balance}</p>
                  </div>
                )}
              </p>
            </div>
          </div>
          <div className="grid md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2 md:gap-4">

          <div className="">
              <label className="block mb-2">Payment Method</label>
<div className="flex gap-4 ">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  value="cash"
                  {...register("payment_method")}
                />
                <label htmlFor="cash" className="ml-2">Cash</label>
              </div>


              <div className="flex items-center">
                <input
                  type="radio"
                  id="Cheque"
                  name="payment_method"
                  value="Cheque"
                  {...register("payment_method")}
                />
                <label htmlFor="Cheque" className="ml-2">Cheque</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="RTGS"
                  name="payment_method"
                  value="RTGS"
                  {...register("payment_method")}
                />
                <label htmlFor="RTGS" className="ml-2">RTGS</label>
              </div>
              </div>
            </div>
            {errors.payment_method && (
              <p className="text-red-500 mt-1">{errors.payment_method.message}</p>
            )}
            {/* Input for check reference number */}
            {watch("payment_method") === 'Cheque' && (
              <div className="mt-4 md:mt-0">
              <Input
                type="text"
                id="reference_no"
                label="Reference Number"
                register={register}
                errors={errors}
                placeholder=" Reference Number"
              />
              </div>
            )}

{watch("payment_method") === 'RTGS' && (
              <div className="mt-4 md:mt-0">
              <Input
                type="text"
                id="rtgs_number"
                label="RTGS Number"
                register={register}
                errors={errors}
                placeholder=" RTGS Number"
              />
              </div>
            )}


  
</div>
          <div className="grid md:mt-3 grid-cols-1 sm:grid-cols-2 gap:2   md:gap-4">
            <Input
              type="text"
              id="amount"
              label="Amount"
              register={register}
              errors={errors}
              placeholder="Amount"
              onChange={(e) => setEnteredAmount(parseFloat(e.target.value) || 0)}
            />
            <div className=" md:mt-10">
              <button
                type="submit"
                className={`px-2 py-[9px] w-[270px]   justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isButtonDisabled}
              >
                + Add Amount
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmountAddModal;
