import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts';

const data = [
  { name: "Jan", uv: 4000, amt: 2400, pv: 2400 },
  { name: "Feb", uv: 3000, amt: 2210, pv: 2210 },
  { name: "Mar", uv: 2000, amt: 1290, pv: 2290 },
  { name: "Apr", uv: 2780, amt: 2000, pv: 2000 },
  { name: "May", uv: 1890, amt: 1181, pv: 2181 },
  { name: "Jun", uv: 2390, amt: 2200, pv: 2500 },
  { name: "Jul", uv: 4000, amt: 2400, pv: 2400 },
  { name: "aug", uv: 3000, amt: 2210, pv: 2210 },
  { name: "sep", uv: 2000, amt: 1290, pv: 2290 },
  { name: "oct", uv: 2780, amt: 2000, pv: 2000 },
  { name: "nov", uv: 1890, amt: 1181, pv: 2181 },
  { name: "dec", uv: 2390, amt: 2200, pv: 2500 },
];

export default function BasicComposition() {
  return (
    <Box sx={{ width: '100%' }}>
   <p className="font-medium text-xl mb-4 text-[#343C6A]">Store Chart</p>

      <Paper sx={{ width: '100%', height: 300 }} elevation={3}>
        <ResponsiveChartContainer
          series={[
            {
              type: 'bar',
              data: data.map(item => item.uv),
              color: '#16DBCC',
              
            },
            {
              type: 'line',
              data: data.map(item => item.amt),
              color: '#FCAA0B'
            },
          ]}
          xAxis={[
            {
              data: data.map(item => item.name),
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}

          yAxis={[
            {
              
              id: 'y-axis-id',
            },
          ]}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis  position="bottom" axisId="x-axis-id" />
          <ChartsYAxis position="left" axisId="y-axis-id"/>
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}
