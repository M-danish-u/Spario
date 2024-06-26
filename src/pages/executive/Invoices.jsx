import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutivInvoice, getExecutivTransactions } from '../../redux/featuer/executive/ExecutiveSlice';
import { ExecutiveTransCollumn } from '../../components/table/executive/ExecutiveTransCollumn';
import Table2 from '../../components/table/Table2';
import Table3 from '../../components/table/executive/Table3';
import { StoreInvoiceCollumn } from '../../components/table/StoreInvoiceCollumn';

const Invoices = () => {
  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
  const invoiceData = useSelector((state) => state?.executive?.InvoiceData?.invoices);
  const loading = useSelector((state) => state?.executive?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch executive transactions when component mounts
    dispatch(getExecutivInvoice(executive_id));
  }, [dispatch, executive_id]);

  
  const columns = useMemo(
    () => StoreInvoiceCollumn(),
    []
  );

  return(
    <>
    {loading ? (
      <div className="flex items-center justify-center h-32">
                    <p className="text-gray-600">Loading...</p> 
                </div>            ) : (
            <Table3 heading={""} DATA={invoiceData || []} COLUMNS={columns}/>
        )}
</>
  )
  
};

export default Invoices;
