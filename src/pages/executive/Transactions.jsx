import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutivTransactions } from '../../redux/featuer/executive/ExecutiveSlice';
import { ExecutiveTransCollumn } from '../../components/table/executive/ExecutiveTransCollumn';
import Table2 from '../../components/table/Table2';

const ExecutiveTransactions = () => {
  const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
  const transactionData = useSelector((state) => state?.executive?.TransactionData?.transactions);
  const loading = useSelector((state) => state?.executive?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch executive transactions when component mounts
    dispatch(getExecutivTransactions(executive_id));
  }, [dispatch, executive_id]);

  const columns = useMemo(
    () => ExecutiveTransCollumn(),
    []
  );

  // Display loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the component only if transactionData is available
  return (
    <div>
      <Table2 heading={""} DATA={transactionData || []} COLUMNS={columns} />
    </div>
  );
};

export default ExecutiveTransactions;
