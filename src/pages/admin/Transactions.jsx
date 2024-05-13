import React, { useEffect, useState } from 'react';
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../redux/featuer/admin/AdminSlice';
import Table4 from '../../components/table/Table4';

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
                <div className="flex items-center justify-center h-32">
                        <p className="text-gray-600">Loading...</p> {/* Display loading message or spinner while data is being fetched */}
                    </div>            ) : (
                <Table4 heading={""} DATA={transactions} COLUMNS={columns} />
            )}
        </div>
    );
};

export default Transactions;
