'use struct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries
var ProcessMovies = /** @class */ (function () {
    // Initialise currencies and path
    function ProcessMovies(accessToken, baseURL, cinemas, timeout) {
        if (accessToken === void 0) { accessToken = ''; }
        if (baseURL === void 0) { baseURL = ''; }
        if (cinemas === void 0) { cinemas = []; }
        if (timeout === void 0) { timeout = 500; }
        this.baseURL = baseURL;
        this.cinemas = cinemas;
        this.accessToken = accessToken;
        this.timeout = timeout;
        this._cache = {};
    }
    ProcessMovies.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
        return this;
    };
    ProcessMovies.prototype.setBaseURL = function (baseURL) {
        this.baseURL = baseURL;
        return this;
    };
    ProcessMovies.prototype.SetCinemas = function (cinemas) {
        this.cinemas = cinemas;
        return this;
    };
    ProcessMovies.prototype.SetTimeout = function (timeout) {
        this.timeout = timeout;
        return this;
    };
    return ProcessMovies;
}());
exports.default = ProcessMovies;
//# sourceMappingURL=processMovies.js.map