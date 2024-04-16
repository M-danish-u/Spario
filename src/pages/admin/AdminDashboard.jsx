import React, { useState } from 'react'
import Button from '../../components/commonComponents/Button'
import Card from '../../components/commonComponents/Card'
import { FaSackDollar,FaHandHoldingDollar } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import Chart from '../../components/adminComponents/Chart';
import ChartStore from '../../components/adminComponents/ChartStore';
import PerfomanceCard from '../../components/adminComponents/PerfomanceCard';
import InvoiceModal from './InvoiceModal';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);

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
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="150,0000"/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="2,500"/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount="100,000"/>
        <Card title="No. of Exicutive" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="200"/>
        <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="100"/>
      </div>

      <div className='w-full p-5 bg-re-500  grid grid-cols-2 ' >
<Chart/>
<ChartStore/>
      </div>

      <div className='w-full p-5 b-red-500  grid grid-cols-3'>
<PerfomanceCard title="Top Performing" perfomanceColor='text-[#16DBCC]'/>
<PerfomanceCard title="Top Performing Store" perfomanceColor='text-[#16DBCC]'/>
<PerfomanceCard title="Top Due" perfomanceColor='text-red-500'/>

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