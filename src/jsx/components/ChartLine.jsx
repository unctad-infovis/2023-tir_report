import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

import roundNr from '../helpers/RoundNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function LineChart({
  allow_decimals, data, idx, line_width, note, show_first_label, source, subtitle, suffix, title
}) {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });
  const chartHeight = 700;
  const createChart = useCallback(() => {
    Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
        useHTML: true,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://unctad.org/sites/default/files/2022-11/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        height: chartHeight,
        marginRight: 80,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff',
                  fontFamily: 'Roboto',
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'line',
        zoomType: 'x'
      },
      colors: ['#009edb', '#72bf44', '#eb1f48'],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        align: 'right',
        enabled: (data.length > 1),
        itemDistance: 20,
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        verticalAlign: 'top'
      },
      plotOptions: {
        line: {
          animation: {
            duration: 3000,
          },
          cursor: 'pointer',
          dataLabels: {
            allowOverlap: false,
            enabled: false,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              return `<span style="color: ${this.color}">${roundNr(this.y, 0).toLocaleString('en-US')}</div>`;
            },
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 400,
              textOutline: '2px solid #fff'
            }
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            }
          },
          selected: true,
          lineWidth: line_width,
          marker: {
            enabled: false,
            radius: 0,
            states: {
              hover: {
                animation: false,
                enabled: false,
                radius: 8
              }
            },
            symbol: 'circle'
          },
          states: {
            hover: {
              halo: {
                size: 0
              },
              enabled: false,
              lineWidth: line_width,
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 10
            }
          },
          condition: {
            maxWidth: 630
          }
        }, {
          chartOptions: {
            chart: {
              height: 700
            },
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: 10,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            },
            yAxis: [{
              title: {
                text: null
              }
            }, {
              title: {
                text: null
              }
            }]
          },
          condition: {
            maxWidth: 500
          }
        }, {
          chartOptions: {
            chart: {
              height: 800
            }
          },
          condition: {
            maxWidth: 400
          }
        }]
      },
      series: data,
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        widthAdjust: -100,
        x: 100
      },
      title: {
        align: 'left',
        margin: 40,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: title,
        widthAdjust: -160,
        x: 100
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: true,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          const values = this.points.filter(point => point.series.name !== '').map(point => [point.series.name.split(' (')[0], point.y, point.color]);
          const rows = [];
          rows.push(values.map((point, i) => `<div><span class="tooltip_label" style="color: ${point[2]}">${(point[0]) ? `${point[0]}: ` : ''}</span><span class="tooltip_value">${roundNr(point[1], (i === 2) ? 1 : 0).toLocaleString('en-US')} ${suffix[i]}</span></div>`).join(''));
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">Year ${(new Date(this.x)).getFullYear()}</h3>${rows}</div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
      },
      xAxis: {
        allowDecimals: false,
        crosshair: {
          color: '#ccc',
          width: 1
        },
        labels: {
          enabled: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          },
          useHTML: false,
          y: 30
        },
        lineColor: '#ccc',
        lineWidth: 0,
        opposite: false,
        plotLines: [{
          color: '#aaa096',
          label: {
            align: 'left',
            rotation: 0,
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
            },
            text: 'The industrial revolution',
            verticalAlign: 'top',
            x: 5,
            y: 30
          },
          zIndex: 4,
          value: Date.UTC(parseInt(1908, 10), 0, 1),
          width: 1
        }, {
          color: '#aaa096',
          label: {
            align: 'left',
            rotation: 0,
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontWeight: 700,
            },
            text: 'Age of ICT',
            verticalAlign: 'top',
            x: 5,
            y: 30
          },
          zIndex: 4,
          value: Date.UTC(parseInt(1971, 10), 0, 1),
          width: 1
        }],
        showLastLabel: true,
        tickLength: 5,
        tickWidth: 1,
        type: 'datetime',
        title: {
          enabled: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'Year'
        }
      },
      yAxis: [{
        allowDecimals: allow_decimals,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: 60000,
        min: 0,
        opposite: false,
        showFirstLabel: show_first_label,
        showLastLabel: true,
        tickAmount: 4,
        tickInterval: 10000,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'Real GDP, US dollars',
        },
        type: 'linear'
      }, {
        allowDecimals: allow_decimals,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          reserveSpace: true,
          style: {
            color: '#eb1f48',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: 6,
        min: 0,
        opposite: true,
        showFirstLabel: show_first_label,
        showLastLabel: true,
        tickAmount: 4,
        tickInterval: 1,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: '#eb1f48',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'tonnes, CO2',
        },
        type: 'linear'
      }]
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [allow_decimals, data, idx, line_width, note, show_first_label, source, subtitle, suffix, title]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container" style={{ marginBottom: '-20px' }}>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

LineChart.propTypes = {
  allow_decimals: PropTypes.bool,
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  line_width: PropTypes.number,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  show_first_label: PropTypes.bool,
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  suffix: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired
};

LineChart.defaultProps = {
  allow_decimals: false,
  line_width: 3,
  note: false,
  show_first_label: true,
  subtitle: false,
  suffix: ['USD', 'USD', 'tonnes']
};

export default LineChart;
