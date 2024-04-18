import React from "react";

const ExecutivePerformCard = ({ perfomanceColor, title }) => {
  const data = [
    { slno: "01", name: "name 1", performance: "80%" },
    { slno: "02", name: "name 2", performance: "60%" },
    { slno: "03", name: "name 3", performance: "50%" },
    { slno: "04", name: "name 4", performance: "40%" },
    { slno: "05", name: "name 5", performance: "30%" },
  ];

  return (
    <div>
      <h2 className="font-medium text-xl text-[#343C6A]">{title}</h2>
      <div className="bg-white shadow-md  flex items-center justify-center py-10 px-16 mt-4 rounded-xl">
        <table className="border-collapse ">
          <thead>
            <tr className=" ">
              <th className="px-4 text-[#718EBF] font-normal t  py-2">SL.No</th>

              <th className="px-4 text-[#718EBF] font-normal  py-2">Name</th>
              <th className="px-4 text-[#718EBF] font-normal   py-2">
                Performance
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr className="  " key={index}>
                <td className="px-4 py-2 text-center">{item.slno}</td>

                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className={`${perfomanceColor} px-4 py-2 text-center`}>
                  {item.performance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExecutivePerformCard;
