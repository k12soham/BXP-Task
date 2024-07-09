import React, { useState } from 'react';
import './ExpandableTable.css';
import data from './data.json'

const ExpandableTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (id) => {
    const isSelected = selectedRows.includes(id);
    const isExpanded = expandedRows.includes(id);

    if (!isSelected) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }

    if (!isExpanded) {
      setExpandedRows([...expandedRows, id]);
    } else {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);
  const isRowExpanded = (id) => expandedRows.includes(id);

  const renderRows = (rows) => {
    return rows.map(row => (
      <React.Fragment key={row.id}>
        <tr
          className={isRowSelected(row.id) ? 'selected' : ''}
          onClick={() => handleRowClick(row.id)}
        >
          <td>{row.text1}</td>
          <td>{row.text2}</td>
        </tr>
        {row.children.length > 0 && isRowExpanded(row.id) && (
          renderRows(row.children)
        )}
      </React.Fragment>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Text 1</th>
          <th>Text 2</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(data.rows)}
      </tbody>
    </table>
  );
};

export default ExpandableTable;
