import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import Input from "../../components/commonComponents/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AddAmount, createExpense, createReturn, getBalance, getExecutiveStore } from "../../redux/featuer/executive/ExecutiveSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Amount is required"),
  store_id: Yup.string().required("Store is required"), // Change validation to store_id
  description : Yup.string().required("Expense way is required"),

});

const ExpenseModal = ({ onClose }) => {
  const [showStoreList, setShowStoreList] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to hold the selected store
  const [showBalance, setShowBalance] = useState(false); // State variable to control balance div visibility
  const [enteredAmount, setEnteredAmount] = useState(0); // State variable to hold the entered amount

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
  console.log(executive_id,'ooooooooo');
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
    // dispatch(getBalance(store.id));

    setValue("store_id", store.id); // Set store_id instead of storeName

    setSelectedStore(store);
    setShowStoreList(false);
    setShowBalance(true);
  };

  const onSubmit = (data) => {

    console.log(data,'dataa');
    if (enteredAmount > balance) {
      toast.error('Amount exceeds balance');
      return; // Block submission and show toast
    }

    dispatch(createExpense({ id: executive_id, body: data }))
   
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
      <div className="bg-white border flex-row py-8 rounded-xl px-8 md:px-20 b-slate-700 g-white relative">
        <div className="flex items-center border-b-[1px] justify-between w-full">
          <h2 className="font-medium text-xl text-[#343C6A]">Add Expense</h2>
          <div className="" onClick={onClose}>
            <button>
              <IoClose className="mt-5" size={24} />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4">
          <div className="flex flex-col md:flex-row   md:gap-4">
            <div className="flex  flex-col">
              <label htmlFor="car">Select Store</label>
              <div className="">
                <select
                  className="peer block min-h-[auto] h-12 w-[278px] mb-2 mt-3 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary"
                  id="storeName"
                  {...register("storeName")}
                  placeholder="Store Name"
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
            {/* <div className="md:mt- flex flex-col gap-3">
              Balance
              <p className="peer  min-h-[auto] w-[278px]  flex h-12 mb-2  items-center  rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6]    ">
                Balance:
                {showBalance && (
                  <div className="">
                    <p className=""> {balance}</p>
                  </div>
                )}
              </p>
            </div> */}
            <Input
              type="text"
              id="description"
              label="Expense"
              register={register}
              errors={errors}
              placeholder="Way of expense"
              onChange={(e) => setEnteredAmount(parseFloat(e.target.value) || 0)}
            />
          </div>

         

          <div className="flex flex-col md:flex-row   md:gap-4">

          <Input
              type="text"
              id="amount"
              label="Amount"
              register={register}
              errors={errors}
              placeholder="Amount"
              onChange={(e) => setEnteredAmount(parseFloat(e.target.value) || 0)}
            />
            
            <div className="md:mt-10">
              <button
                type="submit"
                className={`px-2 py-2 w-[270px]   justify-center h-max bg-[#2723F4] text-white flex items-center rounded-md ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isButtonDisabled}
              >
                + Add Expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
