import React from 'react';
import { Table } from 'antd';

export default function DataTable({ columns, data }) {
  return (
    <Table
      className="big-table"
      columns={columns}
      dataSource={data}
      rowKey={(record, idx) => idx}
      pagination={{ pageSize: 20 }}      // Show more rows per page (optional)
      scroll={{ x: 1800, y: 600 }}
    />
  );
}