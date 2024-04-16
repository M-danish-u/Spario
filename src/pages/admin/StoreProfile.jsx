import React, { useMemo } from 'react'
import Card from '../../components/commonComponents/Card'
import { FaHandHoldingDollar, FaSackDollar } from 'react-icons/fa6'
import { GrTransaction } from 'react-icons/gr'
import { StoreInvoiceCollumn } from '../../components/table/StoreInvoiceCollumn'
import Table from '../../components/table/Table'
import Table2 from '../../components/table/Table2'

const StoreProfile = () => {

    const InvoiceData=[{no:'1',invoiceNo:'00 1', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'2',invoiceNo:'00 2', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'3',invoiceNo:'00 3', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'4',invoiceNo:'00 4', total:'200000' ,paid:'500000',due:'40000',date:'05/23/2024' },
    {no:'5',invoiceNo:'00 5', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'6',invoiceNo:'00 6', total:'200000' ,paid:'600000',due:'30000',date:'05/23/2024' },
    {no:'7',invoiceNo:'00 7', total:'200000' ,paid:'700000',due:'30000',date:'05/23/2024' },
    {no:'8',invoiceNo:'00 8', total:'200000' ,paid:'800000',due:'30000',date:'05/23/2024' },
    {no:'9',invoiceNo:'00 9', total:'200000' ,paid:'900000',due:'30000',date:'05/23/2024' },]

   

    const columns = useMemo(
        () => StoreInvoiceCollumn(),
        []
      );
  return (
    <div>
         <div className='w-full p- bg-re-400 mt- grid grid-cols-3  gap-10'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="150,0000"/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="2,500"/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount="100,000"/>
        {/* <Card title="No. of Exicutive" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="200"/>
        <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="100"/> */}
      </div>

      <div className='w-full bg-white py-5 px-10 mt-8 rounded-xl shadow-md'>
<div className='border-b pb-5'>
<h2 className="font-medium text-xl text-[#343C6A] ">Store Details</h2>
</div>
<div className='w-full grid grid-cols-3 mt-10'>
<div className=' flex flex-col gap-12'>
    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Store Name</h3>
    <p>ABC store</p>
    </span>

    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Address</h3>
    <p>Beach Road</p>
    </span>
</div>

<div className=' flex flex-col gap-12'>
    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Exicutive Name</h3>
    <p>Exicutive 1</p>
    </span>

    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Mobile 1</h3>
    <p>1234567890</p>
    </span>
</div>

<div className=' flex flex-col gap-12'>
    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Route</h3>
    <p>Calicut</p>
    </span>

    <span className=' flex flex-col gap-4'>
    <h3 className='text-md text-[#718EBF]'>Mobile 2</h3>
    <p>0987654321</p>
    </span>
</div>
</div>

      </div>
      <h2 className="font-medium text-xl text-[#343C6A] mt-8 ">Invoices</h2>

      {/* <div className='w-full bg-white py-5 px-10 mt-8 rounded-xl shadow-md'> */}
        {/* <div className='w-full bg-slate-300 py-10'></div> */}
        <div className='mt-'>

<Table2 heading={""} DATA={InvoiceData} COLUMNS={columns} />
</div>
{/* </div> */}

    </div>
  )
}

export default StoreProfile