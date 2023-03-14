// Load helpers.
import CSVtoJSON from './CSVtoJSON.js';

export const getData = () => fetch(`${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tir_report/' : './'}assets/data/2023-tir_report_table1.csv`)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.text();
  })
  .then(body => CSVtoJSON(body));

export default getData;
