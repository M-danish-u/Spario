import React, { useEffect, useState } from 'react'
import Button from '../../components/commonComponents/Button'
import Card from '../../components/commonComponents/Card'
import { FaSackDollar,FaHandHoldingDollar } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import Chart from '../../components/adminComponents/Chart';
import ChartStore from '../../components/adminComponents/ChartStore';
import PerfomanceCard from '../../components/adminComponents/PerfomanceCard';
import InvoiceModal from './InvoiceModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDashboard } from '../../redux/featuer/admin/AdminSlice';
import PerformingStore from '../../components/adminComponents/TopPerformingStore';
import TopDue from '../../components/adminComponents/TopDue';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);

 

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
    dispatch(getAdminDashboard());

    
  }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes


  const dashBoardData = useSelector((state) => state?.admin?.DashboardData || []);

  console.log(dashBoardData,'llllllllllll');

  const topExecutive=dashBoardData.topPerformingExecutive
  const topStore=dashBoardData.topPerformingStores
  const topDue=dashBoardData.topDueExecutives




  const handleEdit = () => {
    setShowModal(true); // Show the modal
  };

  return (
    <div className=''>
      <div className='w-full h-8 bg-re justify-end flex'>
        <div onClick={handleEdit}>
        <Button title="+ Add Invoice" />
        </div>
      </div>
      <div className='w-full p-5 bg-re-400 mt- grid grid-cols-3  gap-10'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData.totalAmount}/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount={dashBoardData.dueAmount}/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount={dashBoardData.paidAmount}/>
        <Card title="No. of Exicutive" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData.totalExecutives}/>
        <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount={dashBoardData.totalStores}/>
      </div>

      <div className='w-full p-5 bg-re-500  grid grid-cols-2 ' >
<Chart/>
<ChartStore/>
      </div>

      <div className='w-full p-5 b-red-500  grid grid-cols-3'>
<PerfomanceCard title="Top Performing Executive" perfomanceColor='text-[#16DBCC]' name="Executive" top={topExecutive}/>
<PerformingStore title="Top Performing Store" perfomanceColor='text-[#16DBCC]' name="Store" top={topStore}/>
<TopDue title="Top Due" perfomanceColor='text-red-500' name="Store" top={topDue}/>

      </div>
      {showModal && (
        <InvoiceModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
    
  )
}

export default AdminDashboard