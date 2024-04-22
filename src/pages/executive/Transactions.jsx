import React, { useEffect } from 'react'
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table2 from '../../components/table/Table2';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
// import { getExecutivTransactions } from '../../redux/featuer/executive/ExecutiveSlice';
import { ExecutiveTransCollumn } from '../../components/table/executive/ExecutiveTransCollumn';
import { getExecutivTransactions } from '../../redux/featuer/executive/ExecutiveSlice';

const ExecutiveTransactions = () => {

    const executive_id=useSelector((state)=>state?.executiveAuth?.executive?.id)
  
    const transactionData=useSelector((state)=>state?.executive?.TransactionData?.transactions)

    console.log(transactionData,'iiiiiiiiii');

  
    const dispatch=useDispatch()
  
    useEffect(() => {
      dispatch(getExecutivTransactions(executive_id));
  
      
    }, [dispatch]);

    
    const columns = useMemo(
        () => ExecutiveTransCollumn(),
        []
      );
  return (
    <div>
        <Table2 heading={""} DATA={transactionData} COLUMNS={columns} />

    </div>
  )
}

export default ExecutiveTransactions