import React, { useEffect, useState } from 'react';
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table3 from '../../components/table/executive/Table3';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReturn, getAllTransactions } from '../../redux/featuer/admin/AdminSlice';
import { ReturnCollumn } from '../../components/table/ReturnCollumn';
import Table4 from '../../components/table/Table4';

const Transactions = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all transactions
                await dispatch(getAllReturn());
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching RETURN data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
     }, [dispatch]); // Dependency array ensures the effect runs only when dispatch changes

    const returns = useSelector((state) => state?.admin?.AllReturns?.history || []);
    console.log(returns,'ttttt');

    const columns = useMemo(() => ReturnCollumn(), []);

    return (
        <div>
            {loading ? (
                 <p>Loading...</p>  
             ) : ( 
                 <Table4 heading={""} DATA={returns}  COLUMNS={columns} /> 
             )} 
        </div>
    );
};

export default Transactions;
