import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList,
  PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#33AA55'];

// Utility for percent
function getPercent(value, total) {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}

// --- Bar Chart (Show percentage in tooltip and as label above each bar) ---
export function BarChartComp({ data, xKey, yKey }) {
  const total = data.reduce((sum, row) => sum + (row[yKey] || 0), 0);

  // Custom tooltip for percentage
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const value = payload[0].value;
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8 }}>
        <strong>{label}</strong><br />
        {getPercent(value, total)} ({value})
      </div>
    );
  };

  return (
    <BarChart width={700} height={350} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis tickFormatter={val => getPercent(val, total)} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey={yKey} fill="#8884d8">
        <LabelList
          dataKey={yKey}
          position="top"
          formatter={value => getPercent(value, total)}
        />
      </Bar>
    </BarChart>
  );
}

// --- Pie Chart (Show percentage in both labels and tooltip) ---
export function PieChartComp({ data, nameKey, valueKey }) {
  const total = data.reduce((sum, row) => sum + (row[valueKey] || 0), 0);

  // Custom tooltip for percentage
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const { name, value } = payload[0];
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 8 }}>
        <strong>{name}</strong><br />
        {getPercent(value, total)} ({value})
      </div>
    );
  };

  // Custom label to show percent on each slice
  const renderCustomizedLabel = (props) => {
    const { value } = props;
    return getPercent(value, total);
  };

  return (
    <PieChart width={500} height={350}>
      <Pie
        data={data}
        dataKey={valueKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={renderCustomizedLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}
