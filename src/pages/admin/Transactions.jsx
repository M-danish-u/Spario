import React, { useEffect, useState } from 'react';
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../redux/featuer/admin/AdminSlice';

const Transactions = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all transactions
                await dispatch(getAllTransactions());
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching transaction data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

    const transactions = useSelector((state) => state?.admin?.AllTransactions?.transactions || []);

    const columns = useMemo(() => TransactionsCollumn(), []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p> // Display loading message while data is being fetched
            ) : (
                <Table3 heading={""} DATA={transactions} COLUMNS={columns} />
            )}
        </div>
    );
};

export default Transactions;
