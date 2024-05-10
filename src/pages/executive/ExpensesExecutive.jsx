import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '../../components/commonComponents/Button';
import ExpenseModal from './ExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutiveExpense } from '../../redux/featuer/executive/ExecutiveSlice';
import { ExpenseExecutiveCollumn } from '../../components/table/executive/ExpenseExicutiveCollumn';
import Table3 from '../../components/table/executive/Table3';
import { useMemo } from 'react';

const ExpensesExecutive = () => {

    const [showExpenseModal, setShowExpenseModal] = useState(false);

    const executive_id = useSelector((state) => state?.adminAuth?.admin?.id);
    console.log(executive_id,'tttt');
    const ExpenseData = useSelector((state) => state?.executive?.ExpenseData?.expenses);
    const loading = useSelector((state) => state?.executive?.loading);
    const dispatch = useDispatch();
  console.log(ExpenseData,'return');

    useEffect(() => {
      // Fetch executive transactions when component mounts
      dispatch(getExecutiveExpense(executive_id));
    }, [dispatch, executive_id]);
  

    const handleExpenseModal = () => {
        setShowExpenseModal(true); // Show the modal
      };
      const columns = useMemo(
        () => ExpenseExecutiveCollumn(),
        []
      );
  return (
    <div>
         <div className='w-full h-8 gap-4 bg-re md:pr-5 justify-end flex md:mb-2'>
        <div onClick={handleExpenseModal}>
        <Button title="+ Add Expenses" />
        </div>
        </div>

        {/* <Table3 heading={""} DATA={ExpenseData || []} COLUMNS={columns} /> */}
        {loading ? (
                <p>Loading...</p> // Display loading message while data is being fetched
            ) : (
                <Table3 heading={""} DATA={ExpenseData || []} COLUMNS={columns} />
            )}

        {showExpenseModal && (
        <ExpenseModal
          onClose={() => setShowExpenseModal(false)} // Pass a function to close the modal
        />
      )}
    </div>
  )
}

export default ExpensesExecutive