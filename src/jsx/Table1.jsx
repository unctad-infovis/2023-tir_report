import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// Load helpers.
import Table from './Table.jsx';
import { getData } from './helpers/GetData.js';
import formatNr from './helpers/FormatNr.js';
import roundNr from './helpers/RoundNr.js';

function addAlert(text, value) {
  return (value < 0) ? <span className="alert">{text}</span> : text;
}

function expander(row) {
  return (
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? '▼' : '▶'}
    </span>
  );
}

function compareNumericString(rowA, rowB, id, desc) {
  let a = Number.parseFloat(rowA.values[id]);
  let b = Number.parseFloat(rowB.values[id]);
  if (Number.isNaN(a)) { // Blanks and non-numeric strings to bottom
    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function App() {
  // Data states.
  // const [data, setData] = useState(false);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const appRef = useRef();

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <div className="sub_component">
        <h3>{row.original[8]['Fund Name']}</h3>
      </div>
    ), []
  );

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
        Header: 'Fund Provider',
        id: 'fund_provider'
      }, {
        accessor: '1',
        Cell: ({ value }) => formatNr(roundNr(value, 0), ' ', '', ''),
        Header: 'AUM ¹, millions of USD',
        style: { textAlign: 'right' }
      }, {
        accessor: '2',
        Cell: ({ value }) => addAlert(formatNr(roundNr(parseFloat(value) * 100, 1), '.', '', '', true, true), parseFloat(value)),
        Header: 'Financial performance 2020-2021, %',
        sortType: compareNumericString,
        style: { textAlign: 'right' }
      }, {
        accessor: '3',
        Cell: ({ value }) => value,
        Header: 'Region'
      }, {
        accessor: '4',
        Cell: ({ value }) => `${value}/10`,
        Header: 'ESG Rating, Conser ²',
        style: { textAlign: 'center' }
      }, {
        accessor: '5',
        Cell: ({ value }) => ((value !== '') ? value : '–'),
        Header: 'Applied SFDR Article ³',
      }, {
        accessor: '6',
        Cell: ({ value }) => addAlert(formatNr(roundNr(parseFloat(value) * 100, 2), '.', '', '', true, true, value), parseFloat(value)),
        Header: 'Net climate impact, %',
        sortType: compareNumericString,
        style: { textAlign: 'right' }
      }, {
        accessor: '7',
        Cell: ({ value }) => formatNr(roundNr(parseFloat(value) * 100, 2), '.', '', '', true, true),
        Header: 'SDG Alignment ³, %',
        sortType: compareNumericString,
        style: { textAlign: 'right' }
      }]);

      const columns = ['Fund Provider', 'AuM ($ million)', 'PERF 2021 USD', 'Region', 'ESG Rating (Conser)', 'Applied SFDR Article', 'Net climate impact (%)', 'SDG Alignment (%)'];
      const rows = data.map(row => ({
        0: row[columns[0]],
        1: row[columns[1]],
        2: row[columns[2]],
        3: row[columns[3]],
        4: row[columns[4]],
        5: row[columns[5]],
        6: row[columns[6]],
        7: row[columns[7]],
        8: row,
        'BM tCO2eq/ Revenues ($mio)': data.reduce((a, b) => a + parseFloat(b['BM tCO2eq/ Revenues ($mio)']), 0) / data.length,
        'Cleantech (%)': data.reduce((a, b) => a + parseFloat(b['Cleantech (%)']), 0) / data.length,
        'CO2 Intensity (MT per $ million revenue)': data.reduce((a, b) => a + parseFloat(b['CO2 Intensity (MT per $ million revenue)']), 0) / data.length,
        'Coal (%)': data.reduce((a, b) => a + parseFloat(b['Coal (%)']), 0) / data.length,
        'Fossil Fuels (%)': data.reduce((a, b) => a + parseFloat(b['Fossil Fuels (%)']), 0) / data.length,
        'Net climate impact (%)': data.reduce((a, b) => a + parseFloat(b['Net climate impact (%)']), 0) / data.length,
        'SDG Alignment (%)': data.reduce((a, b) => a + parseFloat(b['SDG Alignment (%)']), 0) / data.length,
        'Sensitive sectors (%)': data.reduce((a, b) => a + parseFloat(b['Sensitive sectors (%)']), 0) / data.length
      }));
      appRef.current.querySelector('.loading_row').style.display = 'none';
      appRef.current.querySelector('.pagination').style.display = 'block';
      appRef.current.querySelector('.caption').style.display = 'block';
      setRowData(rows);
    });
  }, []);

  return (
    <div className="app" ref={appRef}>
      <Table
        columns={columnData}
        data={rowData}
        renderRowSubComponent={renderRowSubComponent}
      />
      <div className="caption">
        <div>
          <em>Source: </em>
          <span></span>
        </div>
        <div>
          <em>Notes: </em>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
