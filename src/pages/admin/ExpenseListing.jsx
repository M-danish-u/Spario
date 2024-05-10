import React, { useEffect, useState } from 'react';
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllExpenses,  } from '../../redux/featuer/admin/AdminSlice';
import Table4 from '../../components/table/Table4';
import { AdminExpenseCollumn } from '../../components/table/AdminExpenseCollumn';
import ConformModal from './ConformModal';
import RejectModal from './RejectModal';

const ExpenseListing = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [approveData, setApproveData]=useState()
    const [rejectData, setRejectData]=useState()
    console.log(approveData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all transactions
                await dispatch(getAllExpenses());
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching transaction data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

    const transactions = useSelector((state) => state?.admin?.AllExpenses?.expenses || []);
    console.log(transactions);

    // const handleStatus = async (expense) => {
    //     console.log(expense,'expens');
    //     if (!expense || !expense.id) {
    //         console.error('Invalid executive object or ID');
    //         return;
    //     }

    //     try {
    //         await dispatch(expenseStatusChange(expense.id));
    //         window.location.reload(); 
    //     } catch (error) {
    //         console.error('Error changing executive status:', error);
    //     }
    // };

    const handleStatus = (reject) => {
        setRejectData(reject)
        setShowRejectModal(true); // Show the modal
      };

      const handleStatusApprove = (approve) => {
        setApproveData(approve)
        setShowModal(true); // Show the modal                   
      };

    const columns = useMemo(() => AdminExpenseCollumn(handleStatus,handleStatusApprove), []);

    return (
        <div>

{showModal && (
        <ConformModal approve={approveData}
          // college={selectedCollege}
          onClose={() => setShowModal(false)} // Pass a function to close the modal
        />
      )}
    

{showRejectModal && (
        <RejectModal reject={rejectData}
          // college={selectedCollege}
          onClose={() => setShowRejectModal(false)} // Pass a function to close the modal
        />
      )}
            {loading ? (
                <p>Loading...</p> // Display loading message while data is being fetched
            ) : (
                <Table4 heading={""} DATA={transactions} COLUMNS={columns} />
            )}
        </div>
    );
};

export default ExpenseListing;
