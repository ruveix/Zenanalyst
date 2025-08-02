import React from 'react';
import { Layout, Menu } from 'antd';

import QuarterlyDashboard from './pages/QuarterlyDashboard';
import BridgeDashboard from './pages/BridgeDashboard';
import CountryDashboard from './pages/CountryDashboard';
import ConcentrationDashboard from './pages/ConcentrationDashboard';

const { Header, Content } = Layout;

export default function App() {
  const [current, setCurrent] = useState('quarterly'); // <-- Add this

  const menuItems = [
  { key: 'quarterly', label: 'Quarterly Analysis' },
  { key: 'bridge', label: 'Revenue Bridge' },
  { key: 'country', label: 'Region' },
  { key: 'concentration', label: 'Concentration Customer Wise' },
];
  const renderPage = () => {
    switch (current) {
      case 'quarterly':
        return <QuarterlyDashboard />;
      case 'bridge':
        return <BridgeDashboard />;
      case 'country':
        return <CountryDashboard />;
      case 'concentration':
        return <ConcentrationDashboard />;
      default:
        return <QuarterlyDashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
<Menu
  theme="dark"
  mode="horizontal"
  selectedKeys={[current]}
  onClick={e => setCurrent(e.key)}
  items={menuItems}
/>
      </Header>
      <Content style={{ padding: 24 }}>{renderPage()}</Content>
    </Layout>
  );
}
