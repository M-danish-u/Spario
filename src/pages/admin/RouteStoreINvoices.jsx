import React, { useEffect, useMemo } from 'react'
import { StoreInvoiceCollumn } from '../../components/table/StoreInvoiceCollumn'
import Table2 from '../../components/table/Table2'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleStore } from '../../redux/featuer/admin/AdminSlice'
import Table3 from '../../components/table/executive/Table3'

const RouteStoreINvoices = () => {

    const dispatch=useDispatch()

    useEffect(() => {
      dispatch(getSingleStore());
  
      
    }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes
  

    const storeProfile = useSelector((state) => state?.admin?.StoreProfile?.store );

    console.log(storeProfile,'ppp');

    const columns = useMemo(
        () => StoreInvoiceCollumn(),
        [])

  return (
    <div>
        <Table3 heading={"Invoices"} DATA={storeProfile.invoices} COLUMNS={columns} />

    </div>
  )
}

export default RouteStoreINvoices