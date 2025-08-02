import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Row, Col, Slider, Checkbox, Typography, Card, Spin, Alert } from 'antd';
import { fetchQuarterly } from '../api';
import MetricsCard from '../components/MetricsCard';
import DataTable from '../components/DataTable';
import { BarChartComp } from '../components/Charts';
import ChatInterface from '../components/ChatInterface';

const { Title } = Typography;

export default function QuarterlyDashboard() {
const { data = [], isLoading, error } = useQuery({ queryKey: ['quarterly'], queryFn: fetchQuarterly });
  const [minQ4, setMinQ4] = useState(0);
  const [onlyPositiveVariance, setOnlyPositiveVariance] = useState(false);

  if (isLoading) return <Spin tip="Loading Quarterly Revenue Data..." />;
  if (error) return <Alert message="Error loading data" type="error" />;

  const totalQ3 = data.reduce((acc, cur) => acc + (cur['Quarter 3 Revenue'] || 0), 0);
  const totalQ4 = data.reduce((acc, cur) => acc + (cur['Quarter 4 Revenue'] || 0), 0);
  const totalVariance = totalQ4 - totalQ3;

  // Apply filters
  let filteredData = data.filter(item => item['Quarter 4 Revenue'] >= minQ4);
  if (onlyPositiveVariance) {
    filteredData = filteredData.filter(item => (item['Percentage of Variance'] || 0) > 0);
  }

  // Top 10 growth customers sorted by Variance descending
  const topGrowth = [...filteredData]
    .sort((a, b) => (b.Variance || 0) - (a.Variance || 0))
    .slice(0, 10);

  const tableColumns = [
    { title: 'Customer Name', dataIndex: 'Customer Name', key: 'name' },
    { title: 'Quarter 3 Revenue', dataIndex: 'Quarter 3 Revenue', key: 'q3' },
    { title: 'Quarter 4 Revenue', dataIndex: 'Quarter 4 Revenue', key: 'q4' },
    { title: 'Variance', dataIndex: 'Variance', key: 'variance' },
    { title: '% Variance', dataIndex: 'Percentage of Variance', key: 'percentVariance' },
  ];

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <MetricsCard title="Total Q3 Revenue" value={`$${totalQ3.toLocaleString()}`} />
        </Col>
        <Col span={8}>
          <MetricsCard title="Total Q4 Revenue" value={`$${totalQ4.toLocaleString()}`} />
        </Col>
        <Col span={8}>
          <MetricsCard title="Total Variance" value={`$${totalVariance.toLocaleString()}`} />
        </Col>
      </Row>

      <Card style={{ marginTop: 20 }}>
        <Title level={5}>Filters</Title>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <Typography.Text>Minimum Q4 Revenue</Typography.Text>
            <Slider
              min={0}
              max={Math.max(...data.map(d => d['Quarter 4 Revenue'] || 0))}
              value={minQ4}
              onChange={setMinQ4}
              tooltipVisible
            />
          </Col>
          <Col span={12}>
            <Checkbox
              checked={onlyPositiveVariance}
              onChange={e => setOnlyPositiveVariance(e.target.checked)}
            >
              Show only positive growth
            </Checkbox>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: 20 }} title="Top 10 Revenue Growth (Variance)">
        <BarChartComp data={topGrowth} xKey="Customer Name" yKey="Variance" />
      </Card>

      <Card style={{ marginTop: 20 }} title="Detailed Customer Metrics">
        <DataTable columns={tableColumns} data={filteredData} />
      </Card>

      <Card style={{ marginTop: 20 }} title="Ask Questions About This Data">
        <ChatInterface dataset={data} />
      </Card>
    </>
  );
}
