'use struct';

import * as path from "path";

module.exports = {
  development: {
    sitename: 'Compare Movie Price [Development]',
    timeout: 4000,
    baseURL: 'http://webjetapitest.azurewebsites.net/api',
    cinemaList: ['cinemaworld', 'filmworld'],
  },
  production: {
    sitename: 'Compare Movie Price',
    timeout: 4000,
    baseURL: 'http://webjetapitest.azurewebsites.net/api',
    cinemaList: ['cinemaworld', 'filmworld'],
  },
}
