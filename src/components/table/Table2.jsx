import { useEffect, useMemo } from 'react'
import { useTable ,useGlobalFilter,usePagination } from 'react-table'
import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Filter from './Filter';
import Button from '../commonComponents/Button';


const Table2 = ({heading ,DATA,COLUMNS}) => {
      const columns = useMemo(() => COLUMNS,[])
      const data = useMemo(()=> DATA,[])

      
        // console.log(data,'tabledata');
     const tableInstance =  useTable({
        columns,
        data
      },useGlobalFilter,usePagination)



      const { getTableProps, getTableBodyProps, headerGroups, page, nextPage , previousPage,canNextPage ,canPreviousPage,pageOptions,gotoPage,pageCount,setPageSize, prepareRow ,state ,setGlobalFilter ,} = tableInstance

      const {globalFilter ,pageIndex, pageSize} = state
      
      useEffect(() => {
        setPageSize(8)
      }, [])

      
      

return (
    <div>
        <div className='bg-yellow-30 '>
        <div className="relative flex items-center gap-6  rounded-lg">

<Filter filter={globalFilter} setFilter={setGlobalFilter} />

</div>
        </div>
  <div className="shadow-lg rounded-3xl px-4 bg-white mt-6 h-full">
    
    <div className="flex justify-between  p-1 h-full">

      <div className=" font-bold px-2 text-xl">{heading}</div>
    
        <div className="flex gap-8 items-center ">
            
           

        
        </div>
    </div>
        
    <table {...getTableProps()} className='min-w-full   bg-white table-auto'>
      <thead className='border-b '>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope='col' className='bg-  text- font-normal text-[#718EBF]  border-b-1 px-6 py-3 text-left' key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.length > 0 ? (page.map(row => {
          // console.log(row);         

          prepareRow(row)
          return (
            <tr className='mx-3 '  {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (<>
                {cell.column.id === "image" ?<td scope='' className='px-6 text-sm  py-1 border-b  text-left' {...cell.getCellProps()} key={cell.id}> <img src={cell.value} alt="Product" className='w-10 h-auto' /></td>
:                 <td scope='' className='px-6 text-[.9rem]  py-3 border-b  text-left' {...cell.getCellProps()} key={cell.id}>{cell.render('Cell')}</td>
}                </>
                )
              })}
            </tr>
          )
        })) :  (
   <tr>

     <td colSpan={5}>
     
    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
    No matching records found
  </div>
     </td>
   </tr>
        )
 }
        {}
      </tbody>
    </table>
    <div className="flex justify-end p-5 gap-3">
        {/* <button className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1" disabled={!canPreviousPage} onClick={()=>previousPage()}><FaLessThan className='h-2' /></button> */}
        {/* <div className="">{pageIndex+ 1}</div> */}
        {/* <button className={` rounded-md  border p-1 ${pageIndex == 0 ? "bg-black  text-white" : "bg-[#F6F8FB]"}`} onClick={()=>gotoPage(0)}>1</button> */}
  
        {/* {
  pageOptions.length >= 2  &&
  (pageIndex + 1 !== 1 && pageIndex + 1 !== 4) ? (

    <button 
      className={`rounded-md border p-1 ${pageIndex === pageIndex ? "bg-black text-white" : "bg-[#F6F8FB]"}`} 
    //   onClick={() => gotoPage(pageIndex + 1)} // Assuming you want to navigate to the next page
    >
      {pageIndex + 1}
    </button>
  ):(
    ""
  )
  
} */}
{/* {
     pageOptions.length !==1 && <button className={` rounded-md  border p-1 ${pageIndex == pageCount-1 ? "bg-black  text-white" : "bg-[#F6F8FB]"}`}  disabled={!canNextPage} onClick={()=>gotoPage(pageCount-1)}>{pageOptions.length}</button>
} */}
        {/* <button className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1" disabled={!canNextPage} onClick={()=>nextPage()}><FaGreaterThan className='h-2' /></button> */}
    </div>
  </div>
  </div>
)
    }

export default Table2