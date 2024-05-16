import { CiSearch } from "react-icons/ci";


const Filter = ({filter , setFilter}) => {
  return (
    <div className=" ">
           <div className=" w-max flex items-center bg-red- gap- border-[1px] overflow-hidden rounded-md border-slate-200 ">

<CiSearch className='h-5 w-8 text-slate-400' />
{/* <p >Search:</p> */}
<input  type="text" value={filter } onChange={(e)=> setFilter(e.target.value)} placeholder='Search for something' className='px-3 ]   py-2    outline-none bg- ' />
        </div>
    </div>
  )
}

export default Filter