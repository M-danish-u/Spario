import React, { useMemo } from 'react'
import Card from '../../components/commonComponents/Card'
import { FaHandHoldingDollar, FaSackDollar } from 'react-icons/fa6'
import { GrTransaction } from 'react-icons/gr'
import Table2 from '../../components/table/Table2'
import { ExecutiveStoreCollumn } from '../../components/table/ExicutiveStoresCollumn'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSingleExecutive } from '../../redux/featuer/admin/AdminSlice'

const ExicutiveProfile = () => {



    const ExecutiveStoreData=[{no:'1',executiveName:'Executive 1', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'2',executiveName:'Executive 2', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'3',executiveName:'Executive 3', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'4',executiveName:'Executive 4', total:'200000' ,paid:'500000',due:'40000',date:'05/23/2024' },
    {no:'5',executiveName:'Executive 5', total:'200000' ,paid:'500000',due:'30000',date:'05/23/2024' },
    {no:'6',executiveName:'Executive 6', total:'200000' ,paid:'600000',due:'30000',date:'05/23/2024' },
    {no:'7',executiveName:'Executive 7', total:'200000' ,paid:'700000',due:'30000',date:'05/23/2024' },
    {no:'8',executiveName:'Executive 8', total:'200000' ,paid:'800000',due:'30000',date:'05/23/2024' },
    {no:'9',executiveName:'Executive 9', total:'200000' ,paid:'900000',due:'30000',date:'05/23/2024' },]

    const columns = useMemo(
        () => ExecutiveStoreCollumn(),
        []
      );

      const dispatch=useDispatch()

    useEffect(() => {
      dispatch(getSingleExecutive());
  
      
    }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes
  

    const executiveProfile = useSelector((state) => state?.admin?.ExecutiveProfile?.executive );
    console.log(executiveProfile,'ppp');
    console.log(executiveProfile.stores,'OOOO');

  return (
    <div>
        <div className='w-full p- bg-re-400 mt- grid md:grid-cols-3  gap-4 md:gap-8'>
        <Card title="Total Amount" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount={executiveProfile.totalAmount}/>
        <Card title="Due Amount" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount={executiveProfile.dueAmount}/>
        <Card title="Paid Amount" Icon={GrTransaction} iconColor="text-[#396AFF]" color="bg-[#E7EDFF]" amount={executiveProfile.paidAmount}/>
        {/* <Card title="No. of Exicutive" Icon={FaSackDollar} iconColor="text-[#16DBCC]" color="bg-[#DCFAF9]" amount="200"/>
        <Card title="No.of Store" Icon={FaHandHoldingDollar} iconColor="text-[#FF82AC]" color="bg-[#FFE0EB]" amount="100"/> */}
      </div>

      <div className='w-full bg-white py-5 px-8 mt-4 md:mt-8 rounded-xl shadow-md'>
<div className='border-b pb-5'>

<h2 className="font-medium text-xl text-[#343C6A] md:pl-0 pl-10">Executive</h2>
</div>
<div className='w-full pl-10 md:pl-0  sm:grid-cols-2 gap-4 md:gap-0 grid md:grid-cols-3 mt-10'>
{/* <div className=' flex flex-row gap-12'> */}
    <span className=' flex flex-col gap-2 md:gap-4'>
    <h3 className='text-md text-[#718EBF]'>Executive Name</h3>
    <p>{executiveProfile.name}</p>
    </span>

    <span className=' flex flex-col gap-2 md:gap-4'>
    <h3 className='text-md text-[#718EBF]'>Mobile 1</h3>
    <p>{executiveProfile.contact_one}</p>
    </span>
    <span className=' flex flex-col gap-4 md:gap-4'>
    <h3 className='text-md text-[#718EBF]'>Mobile 2</h3>
    <p>{executiveProfile.contact_two}</p>
    </span>
{/* </div> */}
</div>

      </div>
      <h2 className="font-medium text-xl text-[#343C6A] mt-4 md:mt-8 ">Stores</h2>

{/* <div className='w-full bg-white py-5 px-10 mt-8 rounded-xl shadow-md'> */}
  {/* <div className='w-full bg-slate-300 py-10'></div> */}
  <div className='mt-'>

<Table2 heading={""} DATA={executiveProfile.stores} COLUMNS={columns} />
;
</div>

    </div>
    
  )
}

export default ExicutiveProfile