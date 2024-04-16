import React from 'react';

const PerformanceCard = ({perfomanceColor,title}) => {
  const data = [
    { name: 'name 1', performance: '80%' },
    { name: 'name 2', performance: '60%' },
    { name: 'name 3', performance: '50%' },
    { name: 'name 4', performance: '40%' },
    { name: 'name 5', performance: '30%' },
  ];

  return (
    <div >
      <h2 className="font-medium text-xl text-[#343C6A]">{title}</h2>
      <div className='bg-white shadow-md w-[300px] flex items-center justify-center py-2 mt-4 rounded-xl'>
        <table className="border-collapse">
          <thead>
            <tr className=' '>
              <th className="px-4 text-[#718EBF] font-normal py-2">Name</th>
              <th className="px-4 text-[#718EBF] font-normal py-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className={`${perfomanceColor} px-4 py-2 text-center`}>{item.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceCard;
