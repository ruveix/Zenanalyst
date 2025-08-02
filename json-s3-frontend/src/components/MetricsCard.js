import React from 'react';
import { Card } from 'antd';

export default function MetricsCard({ title, value }) {
  return (
    <Card style={{ textAlign: 'center' }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </Card>
  );
}
