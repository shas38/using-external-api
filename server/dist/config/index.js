'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
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
};
//# sourceMappingURL=index.js.map