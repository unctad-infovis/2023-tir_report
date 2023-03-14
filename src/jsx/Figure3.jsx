import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartParallerCoordinates from './components/ChartParallerCoordinates.jsx';

import '../styles/styles.less';

function Figure3() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    // const labels = Object.keys(el).filter(val => val !== 'name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));
    return ({
      color: (values[6] === 1) ? 'rgba(0, 158, 219, 0.6)' : 'rgba(114, 191, 68, 0.6)',
      data: values.slice(1, 6),
      label: {
        enabled: false
      },
      lineWidth: 1,
      name: el.Name,
      rank: values[0],
      shadow: false,
      showInLegend: false
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tir_report/' : './'}assets/data/2023-tir_report_figure3.csv`;
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
      <ChartParallerCoordinates
        data={dataFigure}
        data_decimals={0}
        idx="3"
        note=""
        source="UNCTAD"
        subtitle="A ranking of 166 countries’ readiness to use frontier technologies"
        suffix=""
        title="How prepared are countries for frontier technologies?"
        ylabel=""
      />
      )}
    </div>
  );
}

export default Figure3;
