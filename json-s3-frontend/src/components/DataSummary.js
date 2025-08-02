// src/components/DataSummary.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { Typography } from 'antd';
const { Paragraph } = Typography;

export default function DataSummary({ filename }) {
  const [summary, setSummary] = useState('');
  useEffect(() => {
    fetchData(filename).then(json => {
      const count = Array.isArray(json) ? json.length : 1;
      setSummary(`The dataset contains ${count} record${count !== 1 ? 's' : ''}.`);
    });
  }, [filename]);
  return <Paragraph>{summary}</Paragraph>;
}
