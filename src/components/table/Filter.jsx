import { CiSearch } from "react-icons/ci";


const Filter = ({filter , setFilter}) => {
  return (
    <div className="w-[90%] ">
           <div className="relative flex items-center bg-white rounded-3xl ">

<CiSearch className='h-5 w-8 text-slate-400' />
<input type="text" value={filter } onChange={(e)=> setFilter(e.target.value)} placeholder='Search for something' className='p-3   outline-none bg- rounded-lg' />
        </div>
    </div>
  )
}

export default Filter