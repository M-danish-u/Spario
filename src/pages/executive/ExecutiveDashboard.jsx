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
// import InvoiceModal from './InvoiceModal';

const ExecutiveDashboard = () => {
  const [showModal, setShowModal] = useState(false);


 

  const executive_id=useSelector((state)=>state?.executiveAuth?.executive.id)
  // console.log(executive_id,'iiiiiiiiii');

  const handleEdit = () => {
    setShowModal(true); // Show the modal
  };

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getExecutiveDashboard(executive_id));

    
  }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

  
  const dashBoardData = useSelector((state) => state?.executive?.DashboardData || []);

  // const dashBoardData = useSelector((state) => state?.executive?.DashboardData || []);


  console.log(dashBoardData);


  return (
    <div className=''>
      <div className='w-full h-8 bg-re justify-end flex'>
        <div onClick={handleEdit}>
        <Button title="+ Add Amount" />
        </div>
      </div>
      <div className='w-full p-5 bg-re-400 mt- grid grid-cols-4  gap-10'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData.totalAmount}/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount={dashBoardData.dueAmount}/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount={dashBoardData.paidAmount}/>
        <Card title="Stores" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={dashBoardData.totalStores}/>
        {/* <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="100"/> */}
      </div>

      <div className='w-full p-5 bg-re-500  flex gap-10 ' >
<Chart/>
<ChartStore/>
      </div>

      <div className='w-full p-5 b-red-500 flex gap-10'>
<ExecutivePerformCard title="Top Store" perfomanceColor='text-[#16DBCC]' />
<ExecutivePerformCard  title="Top Due" perfomanceColor='text-red-500'/>
{/* <PerfomanceCard title="Top Due" perfomanceColor='text-red-500'/> */}

      </div>
      {showModal && (
        <AmountAddModal
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
    
  )
}

export default ExecutiveDashboard