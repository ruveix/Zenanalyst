import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchConcentration } from '../api';
import { Row, Col, Card, Spin, Alert } from 'antd';
import DataTable from '../components/DataTable';
import { BarChartComp, PieChartComp } from '../components/Charts';

export default function ConcentrationDashboard() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['concentration'],
    queryFn: fetchConcentration
  });

  // Robust sample (always set, even if data is empty)
  const sample = data[0] || {};
  const custNameKey =
    "Customer Name" in sample ? "Customer Name"
    : "Customer" in sample ? "Customer"
    : Object.keys(sample).find(k => k.toLowerCase().includes('customer')) || "Customer Name";

  const revenueKey =
    "Revenue" in sample ? "Revenue"
    : "Value" in sample ? "Value"
    : Object.keys(sample).find(k => /revenue|value/i.test(k)) || "Revenue";

  // All percent data
  const totalRevenue = data.reduce((sum, c) => sum + (+c[revenueKey] || 0), 0);
  const dataWithPercent = data.map(c => ({
    ...c,
    percent: totalRevenue ? ((+c[revenueKey] / totalRevenue) * 100) : 0
  }));

  // Memoized top 10, sorted
  const top10WithPercent = useMemo(
    () => [...dataWithPercent]
      .sort((a, b) => (+b[revenueKey] || 0) - (+a[revenueKey] || 0))
      .slice(0, 10),
    [dataWithPercent, revenueKey]
  );

  // Memoized columns
  const columns = useMemo(() => {
    if (!sample || Object.keys(sample).length === 0) return [];
    return [
      ...Object.keys(sample).map(key => ({
        title: key.replace(/_/g, ' '),
        dataIndex: key,
        key,
        width: key === custNameKey ? 220 : 120,
        render: value =>
          typeof value === 'number'
            ? value.toLocaleString?.() ?? value
            : value,
      })),
      {
        title: 'Revenue Share (%)',
        key: 'percent',
        dataIndex: 'percent',
        render: v =>
          v != null && !isNaN(v) ? `${v.toFixed(2)}%` : '—',
        width: 140,
      }
    ];
  }, [sample, custNameKey]);

  // After hooks declared UNCONDITIONALLY, you can have early returns
  if (isLoading) return <Spin tip="Loading Concentration Data..." />;
  if (error) return <Alert message="Error loading customer concentration" type="error" />;

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top 10 Customers by Revenue Share (%)" style={{ minHeight: 400, width: '100%' }}>
            <BarChartComp
              data={top10WithPercent}
              xKey={custNameKey}
              yKey="percent"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue Share by Top 10 Customers (%)" style={{ minHeight: 400, width: '100%' }}>
            <PieChartComp
              data={top10WithPercent.map(c => ({
                name: c[custNameKey] || 'Unknown',
                percent: c.percent
              }))}
              nameKey="name"
              valueKey="percent"
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 20, width: '100%' }} title="Full Customer Concentration Table">
        <DataTable
          columns={columns}
          data={dataWithPercent}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </>
  );
}
