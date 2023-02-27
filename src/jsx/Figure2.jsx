import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedLine from './components/ChartStackedLine.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e
      })),
      zoneAxis: 'x',
      zones: [{
        value: 2022
      }, {
        fillColor: (i === 1) ? 'rgba(114, 191, 68, 0.4)' : 'rgba(0, 158, 219, 0.4)'
      }],
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tir_report/' : './'}assets/data/2023-tir_report_figure2.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedLine
        data={dataFigure}
        data_decimals={0}
        idx="2"
        note=""
        source=""
        subtitle=""
        suffix=""
        title=""
        ylabel=""
      />
      )}
    </div>
  );
}

export default Figure2;
