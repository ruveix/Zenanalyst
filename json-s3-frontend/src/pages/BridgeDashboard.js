import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBridge } from '../api';
import { Row, Col, Card, Spin, Alert, Input } from 'antd';
import DataTable from '../components/DataTable';
import { BarChartComp } from '../components/Charts';

export default function BridgeDashboard() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['bridge'],
    queryFn: fetchBridge
  });

  const [search, setSearch] = useState('');

  const columns = useMemo(() => data[0]
    ? Object.keys(data[0]).map(key => ({
        title: key.replace(/_/g, ' '),
        dataIndex: key,
        key,
      }))
    : []
  , [data]);

  const filteredData = useMemo(() =>
    search && search.trim()
      ? data.filter(row =>
          String(row['Customer Name'] || '')
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : data,
    [data, search]
  );

  // Here: Use "Churned Revenue" field
  const sorted = useMemo(() =>
    [...data]
      .filter(row => typeof row['Churned Revenue'] === 'number' && row['Churned Revenue'] > 0)
      .sort((a, b) => (b["Churned Revenue"] || 0) - (a["Churned Revenue"] || 0))
      .slice(0, 10),
    [data]
  );

  if (isLoading) return <Spin tip="Loading Revenue Bridge Data..." />;
  if (error) return <Alert message="Error loading revenue bridge data" type="error" />;

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Revenue Bridge Top 10 (by Churned Revenue)">
            <BarChartComp 
              data={sorted} 
              xKey="Customer Name" 
              yKey="Churned Revenue" 
            />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: 20 }} title="Revenue Bridge - Full Table">
        <div style={{ marginBottom: 12, maxWidth: 300 }}>
          <Input.Search
            allowClear
            placeholder="Search Customer Name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            enterButton
          />
        </div>
        <DataTable columns={columns} data={filteredData} />
      </Card>
    </>
  );
}