import React, { useState } from 'react'
import Button from '../../components/commonComponents/Button'
import Card from '../../components/commonComponents/Card'
import { FaSackDollar,FaHandHoldingDollar } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import Chart from '../../components/adminComponents/Chart';
import ChartStore from '../../components/adminComponents/ChartStore';
import PerfomanceCard from '../../components/adminComponents/PerfomanceCard';
import ExecutivePerformCard from '../../components/executiveComponents/ExecutivePerfomCard';
import AmountAddModal from './AmountAddModal';
// import InvoiceModal from './InvoiceModal';

const ExecutiveDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true); // Show the modal
  };

  return (
    <div className=''>
      <div className='w-full h-8 bg-re justify-end flex'>
        <div onClick={handleEdit}>
        <Button title="+ Add Amount" />
        </div>
      </div>
      <div className='w-full p-5 bg-re-400 mt- grid grid-cols-4  gap-10'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="150,0000"/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="2,500"/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount="100,000"/>
        <Card title="Stores" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="20000"/>
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