import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  Line,
} from "recharts";

const ChartStore = () => {
  const data = [
    { name: "Jan", uv: 4000,  amt: 2400 },
    { name: "Feb", uv: 3000,  amt: 2210 },
    { name: "Mar", uv: 2000,  amt: 2290 },
    { name: "Apr", uv: 2780,  amt: 2000 },
    { name: "May", uv: 1890,  amt: 2181 },
    { name: "Jun", uv: 2390,  amt: 2500 },
    // { name: 'month 7', uv: 3490, pv: 4300, amt: 2100 },
  ];
  const CustomLabel = ({ x, y, value }) => (
    <text x={x} y={y} dy={-10} fill="#666" textAnchor="middle">
      {value}
    </text>
  );

  return (
    <div>
        <p className="font-medium text-[#343C6A] text-xl">Store Chart</p>
    <BarChart className="mt-2 bg-white p-4 rounded-xl shadow-md" width={700} height={300} data={data}>
      {/* <CartesianGrid strokeDasharray=" 2" /> */}
      <XAxis dataKey="name" axisLine={false} />
      <YAxis axisLine={false} />
      <Tooltip />
      {/* <Legend /> */}
      {/* <Bar dataKey="pv" fill="#8884d8" /> */}
      {/* <LabelList dataKey="uv" content={<CustomLabel />} /> */}

      <Bar dataKey={`${'uv'}`} fill="#396AFF" radius={[5, 5, 0, 0]} barSize={40} />
      <Line type="linear" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
    </BarChart>
    </div>
  );
};

export default ChartStore;
