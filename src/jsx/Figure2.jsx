import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    // const labels = Object.keys(el).filter(val => val !== 'name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values,
      label: {
        enabled: false
      },
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
      <ChartStackedColumn
        data={dataFigure}
        data_decimals={0}
        idx="2"
        note=""
        source="UNCTAD based on various estimates."
        subtitle="Market size estimates of frontier technologies, billion USD"
        suffix="billion USD"
        title="Value of frontier technologies is expected to boom in the 21th century"
        ylabel=""
        ymax={11000}
        ytick_interval={2000}
      />
      )}
    </div>
  );
}

export default Figure2;
