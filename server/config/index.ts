'use struct';

import * as path from "path";

module.exports = {
  development: {
    sitename: 'Currency Analyser [Development]',
    data: {
      currencies: path.join(__dirname, '../data/currency.json'),
    }
  },
  production: {
    sitename: 'Currency Analyser',
    data: {
      currencies: path.join(__dirname, '../data/currency.json'),
    }
  },
}
