import React, { useEffect, useState } from 'react'
import Button from '../../components/commonComponents/Button'
import Card from '../../components/commonComponents/Card'
import { FaSackDollar,FaHandHoldingDollar } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import Chart from '../../components/adminComponents/Chart';
import ChartStore from '../../components/adminComponents/ChartStore';
import PerfomanceCard from '../../components/adminComponents/PerfomanceCard';
import ExecutivePerformCard from '../../components/executiveComponents/ExecutivePerfomCard';
import AmountAddModal from './AmountAddModal';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutiveDashboard } from '../../redux/featuer/executive/ExecutiveSlice';
import { useNavigate } from 'react-router-dom';
import DashboardDueCard from '../../components/executiveComponents/DashboardDueCard';
// import InvoiceModal from './InvoiceModal';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AiOutlineFieldNumber } from "react-icons/ai";
import InvoiceModal from '../admin/InvoiceModal';
import ExecutiveInvoiceModal from './ExecutiveInvoiceModal';
import { PiStorefrontBold } from "react-icons/pi";
const ExecutiveDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

 

  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);

  useEffect(() => {
    // Your code that depends on executive_id
    // For example:
    console.log("Executive ID:", executive_id);
  }, [executive_id]); // Add executive_id to the dependency array
  console.log(executive_id,'iiiiiiiiii');

  const handleEdit = () => {
    setShowModal(true); // Show the modal
  };


  const handleInvoiceModal = () => {
    setShowInvoiceModal(true); // Show the modal
  };


  const dispatch=useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is not available (you would replace this with your actual logic)
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (!token) {
      // Navigate to the login page if token is not available
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(getExecutiveDashboard(executive_id));

    
  }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

  
  const dashBoardData = useSelector((state) => state?.executive?.DashboardData || []);

  // const dashBoardData = useSelector((state) => state?.executive?.DashboardData || []);
const topStore=dashBoardData?.topPerformingStores
const DueStore=dashBoardData?.topDueStores



  console.log(dashBoardData);


  return (
    <div className=''>
      <div className='w-full h-8 gap-4 bg-re md:pr-5 justify-end flex md:mb-2'>
        <div onClick={handleEdit}>
        <Button title="+ Add Amount" />
        </div>

        <div onClick={handleInvoiceModal}>
        <Button title="+ Add Invoice" />
        </div>
      </div>
      <div className='w-full md:p-4 b-red-400 mt-6 md:mt-0 grid lg:grid-cols-4 sm:grid-cols-2  md:grid-cols-3 gap-4 md:gap-8'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData?.totalAmount} />
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount={dashBoardData?.dueAmount} />
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount={dashBoardData?.paidAmount} />
        <Card title="Stores" Icon={PiStorefrontBold} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData?.totalStores} />
        {/* <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="100"/> */}
      </div>

       <div className='w-full md:p-4 b-red-500 grid grid-cols-1 mt-4 md:grid-cols-2 gap-4 md:gap-8' >
<Chart/>
<ChartStore/>
      </div> 

      <div className='w-full md:p-4 b-red-500 flex flex-col md:flex-row gap-4 mt-4 md:gap-8'>
<ExecutivePerformCard title="Top Store" perfomanceColor='text-[#16DBCC]'top={topStore} />
<DashboardDueCard  title="Top Due" perfomanceColor='text-red-500'top={DueStore}/>
{/* <PerfomanceCard title="Top Due" perfomanceColor='text-red-500'/> */}

      </div>
      {showModal && (
        <AmountAddModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}


       
{showInvoiceModal && (
        <ExecutiveInvoiceModal
          // college={selectedCollege}
          onClose={() => setShowInvoiceModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
    
  )
}

export default ExecutiveDashboard