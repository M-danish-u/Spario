import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Assuming you are using a library like react-datepicker for date pickers
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for date picker

const DatepickerFilter = ({ data, onDateFilterChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterData = () => {
    if (!startDate || !endDate) {
      // If either start or end date is not selected, do not filter
      return;
    }

    const filtered = data.filter(item => {
      const itemDate = new Date(item.created_at); // Adjust here to use created_at
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Pass filtered data back to parent component
    onDateFilterChange(filtered);
  };

  return (
    <div>
      {/* <h2>Date Range Filter</h2> */}
      <div>
        <DatePicker 
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="From"
          className="w-full px-3 py-[0.40rem] mt-  rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="To"
          className="w-full px-3 py-[0.40rem] mt-1  rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
        />
        <button onClick={filterData}>Apply</button>
      </div>
    </div>
  );
};

export default DatepickerFilter;
