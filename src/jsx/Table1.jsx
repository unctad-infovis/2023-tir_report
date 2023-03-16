import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// Load helpers.
import Table from './components/Table.jsx';
import { getData } from './helpers/GetTableData.js';
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';

function addAnnotation(text) {
  return (parseInt(text, 10) < 0) ? <span className="decrease">{text}</span> : (parseInt(text, 10) > 0) ? (
    <span className="increase">
      +
      {text}
    </span>
  ) : (parseInt(text, 10) === 0) ? `±${text}` : '';
}

function expander(row) {
  return (
    <span {...row.getToggleRowExpandedProps()}>
      {(row.isExpanded) ? '▼' : '▶'}
    </span>
  );
}

function App() {
  // Data states.
  // const [data, setData] = useState(false);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const renderRowSubComponent = React.useCallback(({ row }) => (
    <div className="sub_component">
      <h4>{row.original[4].Name}</h4>
      <div>
        <span className="label">ICT rank:</span>
        {' '}
        <span className="value">{row.original[4]['ICT rank']}</span>
      </div>
      <div>
        <span className="label">Skills rank:</span>
        {' '}
        <span className="value">{row.original[4]['Skills rank']}</span>
      </div>
      <div>
        <span className="label">R&D rank:</span>
        {' '}
        <span className="value">{row.original[4]['R&D rank']}</span>
      </div>
      <div>
        <span className="label">Industry rank:</span>
        {' '}
        <span className="value">{row.original[4]['Industry rank']}</span>
      </div>
      <div>
        <span className="label">Finance rank:</span>
        {' '}
        <span className="value">{row.original[4]['Finance rank']}</span>
      </div>
    </div>
  ), []);

  useEffect(() => {
    getData().then(data => {
      setColumnData([{
        Cell: ({ row }) => expander(row),
        Header: () => null,
        id: 'expander',
        style: { textAlign: 'center' }
      }, {
        accessor: '0',
        Cell: ({ value }) => value,
        Header: 'Name',
        id: 'name'
      }, {
        accessor: '1',
        Cell: ({ value }) => value,
        Header: '2023 rank',
        id: '2023_rank'
      }, {
        accessor: '2',
        Cell: ({ value }) => value,
        Header: '2021 rank',
        id: '2021_rank'
      }, {
        accessor: '3',
        Cell: ({ value }) => addAnnotation(value),
        Header: 'Change in rank',
        id: 'change_in_rank'
      }]);

      const columns = ['Name', '2023 rank', '2021 rank', 'Change in rank'];
      const rows = data.map(row => ({
        0: row[columns[0]],
        1: row[columns[1]],
        2: row[columns[2]],
        3: row[columns[3]],
        4: row
      }));
      chartRef.current.querySelector('.loading_row').style.display = 'none';
      chartRef.current.querySelector('.pagination').style.display = 'block';
      chartRef.current.querySelector('.caption').style.display = 'block';
      setRowData(rows);
    });
  }, []);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        chartRef.current.querySelector('.table_container').style.opacity = 1;
      }, 300);
    }
  }, [isVisible]);

  return (
    <div className="app" ref={chartRef}>
      <div className="table_container">
        <h3>Frontier technologies readiness index</h3>
        <p>A ranking of 166 countries’ readiness to use frontier technologies</p>
        <Table
          columns={columnData}
          data={rowData}
          renderRowSubComponent={renderRowSubComponent}
        />
        <div className="caption">
          <div>
            <em>Source: </em>
            <span>UNCTAD</span>
          </div>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
