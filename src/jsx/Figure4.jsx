import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartParallerCoordinates from './components/ChartParallerCoordinates.jsx';

import '../styles/styles.less';

function Figure3() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    // const labels = Object.keys(el).filter(val => val !== 'name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));
    return ({
      color: (el.Name === 'Viet Nam' || el.Name === 'India' || el.Name === 'Philippines') ? '#eb1f48' : (i < 30) ? 'rgba(0, 158, 219, 0.2)' : 'rgba(114, 191, 68, 0.2)',
      data: values.slice(1, 6),
      label: {
        enabled: !!((el.Name === 'Viet Nam' || el.Name === 'India' || el.Name === 'Philippines')),
        style: {
          color: '#eb1f48',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 600
        }
      },
      lineWidth: (el.Name === 'Viet Nam' || el.Name === 'India' || el.Name === 'Philippines') ? 3 : 1,
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
        idx="4"
        note=""
        source="UNCTAD"
        subtitle="Countries showing stronger capabilities than their per capita GDPs suggest"
        suffix=""
        title="The frontier tech overperformers"
        ylabel=""
      />
      )}
    </div>
  );
}

export default Figure3;
