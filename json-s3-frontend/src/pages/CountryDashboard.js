import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCountry, fetchRegion } from '../api';
import { Row, Col, Card, Spin, Alert, Table } from 'antd';
import { BarChartComp, PieChartComp } from '../components/Charts';

export default function CountryDashboard() {
  // Load countries
  const { data: countryData = [], isLoading, error } = useQuery({
    queryKey: ['country'],
    queryFn: fetchCountry,
  });

  // Load regions
  const { data: regionData = [], isLoading: regionLoading, error: regionError } = useQuery({
    queryKey: ['region'],
    queryFn: fetchRegion,
  });

  // Guard/loading/error
  if (isLoading || regionLoading)
    return <Spin tip="Loading Country and Region Data..." />;
  if (error)
    return (
      <Alert message="Error loading country revenue" description={error.message} type="error" />
    );
  if (regionError)
    return (
      <Alert message="Error loading region revenue" description={regionError.message} type="error" />
    );

  // --- Country Section ---

  // Get top 10 by yearly revenue (descending)
  const top10 = [...countryData]
    .sort((a, b) => (b['Yearly Revenue'] || 0) - (a['Yearly Revenue'] || 0))
    .slice(0, 10);

  // For pie: top 8 + others
  const top8 = top10.slice(0, 8);
  const sumAllCountries = countryData.reduce((sum, r) => sum + (r['Yearly Revenue'] || 0), 0);
  const sumTop8 = top8.reduce((sum, r) => sum + (r['Yearly Revenue'] || 0), 0);
  const othersTotal = sumAllCountries - sumTop8;
  const countryPieData = [
    ...top8.map(d => ({ name: d.Country, value: d['Yearly Revenue'] || 0 })),
    { name: 'Others', value: othersTotal },
  ];

  // --- Region Section ---

  // Sanitize: coerce nulls to 0
  const regionChartData = regionData.map(r => ({
    Region: r.Region,
    'Yearly Revenue': r['Yearly Revenue'] ?? 0,
  }));
  const sortedRegionData = [...regionChartData].sort(
    (a, b) => b['Yearly Revenue'] - a['Yearly Revenue']
  );
  const regionPieData = sortedRegionData
    .filter(d => d['Yearly Revenue'] > 0)
    .map(d => ({ name: d.Region, value: d['Yearly Revenue'] }));

  // --- Render ---
  return (
    <>
      {/* Countries section */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Top 10 Countries by Yearly Revenue" style={{ minHeight: 400 }}>
            <BarChartComp data={top10} xKey="Country" yKey="Yearly Revenue" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue Share by Country (Top 8 + Others)" style={{ minHeight: 400 }}>
            <PieChartComp data={countryPieData} nameKey="name" valueKey="value" />
          </Card>
        </Col>
      </Row>
      {/* Regions section */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Region Revenue" style={{ minHeight: 400 }}>
            <BarChartComp data={sortedRegionData} xKey="Region" yKey="Yearly Revenue" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Region Revenue Breakdown" style={{ minHeight: 400 }}>
            <PieChartComp data={regionPieData} nameKey="name" valueKey="value" />
            <Table
              columns={[
                { title: "Region", dataIndex: "Region", key: "Region" },
                {
                  title: "Yearly Revenue",
                  dataIndex: "Yearly Revenue",
                  key: "Yearly Revenue",
                  render: v => v ? v.toLocaleString() : "—"
                }
              ]}
              dataSource={sortedRegionData}
              pagination={false}
              rowKey="Region"
              size="middle"
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
