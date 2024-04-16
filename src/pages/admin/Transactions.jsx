import React from 'react'
import { TransactionsCollumn } from '../../components/table/TransactionsCollumn';
import { useMemo } from 'react';
import Table2 from '../../components/table/Table2';

const Transactions = () => {

    const transactions = [
        {
            no: 1,
            executiveName: "Executive 1",
            storeName: "Store A",
            received: 1000,
            remarks: "Payment received for products",
            date: "2024-04-19",
        },
        {
            no: 2,
            executiveName: "Executive 2",
            storeName: "Store B",
            received: 500,
            remarks: "Partial payment made",
            date: "2024-04-20",
        },
        {
            no: 3,
            executiveName: "Executive 1",
            storeName: "Store C",
            received: 800,
            remarks: "Full payment received",
            date: "2024-04-21",
        },
        {
            no: 4,
            executiveName: "Executive 3",
            storeName: "Store D",
            received: 1200,
            remarks: "Payment for new stock",
            date: "2024-04-22",
        },
        {
            no: 5,
            executiveName: "Executive 4",
            storeName: "Store E",
            received: 1500,
            remarks: "Payment for overdue balance",
            date: "2024-04-23",
        },
        {
            no: 6,
            executiveName: "Executive 2",
            storeName: "Store F",
            received: 700,
            remarks: "Partial payment made",
            date: "2024-04-24",
        },
        {
            no: 7,
            executiveName: "Executive 3",
            storeName: "Store G",
            received: 900,
            remarks: "Payment for new products",
            date: "2024-04-25",
        },
        {
            no: 8,
            executiveName: "Executive 1",
            storeName: "Store H",
            received: 600,
            remarks: "Payment for pending orders",
            date: "2024-04-26",
        },
        // Add more transaction objects as needed
    ];
    
    const columns = useMemo(
        () => TransactionsCollumn(),
        []
      );
  return (
    <div>
        <Table2 heading={""} DATA={transactions} COLUMNS={columns} />

    </div>
  )
}

export default Transactions