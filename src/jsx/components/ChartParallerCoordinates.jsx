import React, {
  useEffect, useCallback, useRef, memo
} from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import HighchartsParallelCoordinates from 'highcharts/modules/parallel-coordinates';
import highchartsSeriesLabel from 'highcharts/modules/series-label';
import highchartsExportData from 'highcharts/modules/export-data';

// Load helpers.
// import roundNr from '../helpers/RoundNr.js';
// import formatNr from '../helpers/FormatNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);
HighchartsParallelCoordinates(Highcharts);
highchartsSeriesLabel(Highcharts);

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

function ParallerCoordinatesChart({
  data, idx, note, source, subtitle, title, xlabel
}) {
  const chartRef = useRef();

  const chartHeight = 600;
  const isVisible = useIsVisible(chartRef, { once: true });
  const createChart = useCallback(() => {
    data.push({
      color: 'rgba(0, 158, 219, 1)',
      data: [],
      lineWidth: 3,
      name: 'Industrialised economies'
    }, {
      color: 'rgba(114, 191, 68, 1)',
      data: [],
      lineWidth: 3,
      name: 'Rest of the world'
    });
    Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
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
          },
          render() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.legend.allItems = this.legend.allItems.slice(0, 2);
          }
        },
        height: chartHeight,
        parallelCoordinates: true,
        parallelAxes: {
          lineColor: 'rgba(0, 0, 0, 0.3)',
          lineWidth: 2
        },
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff'
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
        type: 'spline'
      },
      colors: ['rgba(0, 158, 219, 0.5)'],
      credits: {
        enabled: false
      },
      exporting: {
        filename: '2023-unctad',
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
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        margin: 20,
        verticalAlign: 'top'
      },
      plotOptions: {
        spline: {
          animation: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              // eslint-disable-next-line react/no-this-in-sfc
              this.group.toFront();
              return false;
            }
          },
          selected: true,
          lineWidth: 1,
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
              lineWidth: 0
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 20
            }
          },
          condition: {
            maxWidth: 800
          }
        }, {
          chartOptions: {
            title: {
              style: {
                fontSize: '22px',
                lineHeight: '26px'
              }
            }
          },
          condition: {
            maxWidth: 500
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
        widthAdjust: -144,
        x: 100,
      },
      title: {
        align: 'left',
        margin: 10,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700
        },
        text: title,
        widthAdjust: -160,
        x: 100,
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: true,
        shadow: false,
        shared: false,
        useHTML: true
      },
      xAxis: {
        accessibility: {
          description: xlabel
        },
        allowDecimals: false,
        categories: [
          'ICT rank',
          'Skills rank',
          'R&D rank',
          'Industry rank',
          'Finance rank',
        ],
        crosshair: {
          color: 'transparent',
          width: 1
        },
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 1,
        opposite: true,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        type: 'category',
        title: {
          text: null
        }
      },
      yAxis: [{
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        max: 166,
        min: 1,
        reversed: true,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        tickAmount: 7,
        type: 'linear'
      }, {
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        max: 166,
        min: 1,
        reversed: true,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        tickAmount: 7,
        type: 'linear'
      }, {
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        max: 160,
        min: 1,
        reversed: true,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        tickAmount: 7,
        type: 'linear'
      }, {
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        max: 166,
        min: 1,
        reversed: true,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        tickAmount: 7,
        type: 'linear'
      }, {
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        max: 166,
        min: 1,
        reversed: true,
        showFirstLabel: false,
        showLastLabel: false,
        startOnTick: false,
        tickAmount: 7,
        type: 'linear'
      }]
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [data, idx, note, source, subtitle, title, xlabel]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container chart_parallel" style={{ minHeight: chartHeight }}>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

ParallerCoordinatesChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  xlabel: PropTypes.string,
};

ParallerCoordinatesChart.defaultProps = {
  note: false,
  subtitle: false,
  xlabel: 'Year'
};

export default memo(ParallerCoordinatesChart);
