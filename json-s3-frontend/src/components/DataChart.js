// src/components/DataChart.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchData } from '../api';

export default function DataChart({ filename, xKey, yKey }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(filename).then(json => setData(json));
  }, [filename]);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey={xKey} />
      <YAxis />
      <CartesianGrid stroke="#eee" />
      <Tooltip />
      <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
    </LineChart>
  );
}
