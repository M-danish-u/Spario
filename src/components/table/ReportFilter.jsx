import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Assuming you are using a library like react-datepicker for date pickers
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for date picker

const DateFilter = ({ data, onDateFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterData = (filter) => {
    setShowCustomRange(filter === 'custom'); // Always set showCustomRange to true when 'Custom Range' is clicked
    if (filter === 'custom') {
      setSelectedFilter('custom'); // Set selected filter to 'custom' when 'Custom Range' is clicked
    } else {
      const currentDate = new Date();
      const filtered = data.filter(item => {
        const itemDate = new Date(item.created_at); // Adjust here to use created_at
        switch (filter) {
          case 'today':
            return itemDate.toDateString() === currentDate.toDateString();
          case 'yesterday':
            const yesterday = new Date();
            yesterday.setDate(currentDate.getDate() - 1);
            return itemDate.toDateString() === yesterday.toDateString();
          case 'week':
            const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
          case 'month':
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
          case 'year':
            const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
            const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);
            return itemDate >= firstDayOfYear && itemDate <= lastDayOfYear;
          default:
            return true; // Return true for 'all' filter
        }
      });
      setSelectedFilter(filter);
      // Pass filtered data back to parent component
      onDateFilterChange(filtered);
    }
  };

  const applyCustomRangeFilter = () => {
    if (startDate && endDate) {
      const filtered = data.filter(item => {
        const itemDate = new Date(item.created_at); // Adjust here to use created_at
        return itemDate >= startDate && itemDate <= endDate;
      });
      // Pass filtered data back to parent component
      onDateFilterChange(filtered);

      setStartDate(null);
      setEndDate(null);
      // Hide custom range after applying the filter
      setShowCustomRange(false);
    }
  };

  return (
    <div className="relative">
      {/* <h2>Date Filter</h2> */}
      <select
        value={selectedFilter}
        onChange={(e) => filterData(e.target.value)}
        className='  gap-2 block min-h-[auto] h-10 w-[305px] mb-2 rounded-lg text-[#718EBF] border-slate-200 border-[1px] bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary ml-[-16px]'
      >
        <option  value="all">All</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
        <option value="custom">Custom Range</option>
      </select>
      {showCustomRange && (
        <div className="absolute top-12 left-0 bg-white p-4 border border-gray-300 rounded-lg shadow-md">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From"
            className="w-full px-3 py-[0.40rem] mt- rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To"
            className="w-full px-3 py-[0.40rem] mt-1 rounded-lg border-slate-200 border-[1px] bg-transparent text-[#718EBF] outline-none focus:placeholder:opacity-100 motion-reduce:transition-none"
          />
          <div className="flex items-center justify-center mt-2">
            <button className="sm:px-8 px-4 py-2 bg-[#2723F4] text-white rounded-md" onClick={applyCustomRangeFilter}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
