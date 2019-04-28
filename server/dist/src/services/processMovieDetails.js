'use struct';
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries
var request = require("request-promise");
var processMovies_1 = require("./processMovies");
var returnFields = function (_a) {
    var Price = _a.Price;
    return ({ Price: Price });
};
var ProcessMovieNames = /** @class */ (function (_super) {
    __extends(ProcessMovieNames, _super);
    // Initialise currencies and path
    function ProcessMovieNames(accessToken, baseURL, cinemas, timeout) {
        if (accessToken === void 0) { accessToken = ''; }
        if (baseURL === void 0) { baseURL = ''; }
        if (cinemas === void 0) { cinemas = []; }
        if (timeout === void 0) { timeout = 500; }
        var _this = _super.call(this, accessToken, baseURL, cinemas, timeout) || this;
        _this.generateMovieDetails = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var result_1, cinemasAvailable, returnedPromise, results_1, code, err_1, log, cinemasAvailable, result_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        result_1 = {};
                        cinemasAvailable = Object.keys(body);
                        returnedPromise = cinemasAvailable.map(function (cinema) { return _this.getMovieDetails(cinema, body[cinema]); });
                        return [4 /*yield*/, Promise.all(returnedPromise)];
                    case 1:
                        results_1 = _a.sent();
                        // const cinemaworldMovies = returnFields(JSON.parse(results[index]));
                        // const filmworldMovies = returnFields(JSON.parse(results[1]));
                        cinemasAvailable.forEach(function (cinema, index) {
                            var temp = returnFields(JSON.parse(results_1[index]));
                            var id = body[cinema];
                            if (cinema in _this._cache)
                                _this._cache[cinema][id] = temp;
                            else {
                                _this._cache[cinema] = {};
                                _this._cache[cinema][id] = temp;
                            }
                            result_1[cinema] = temp;
                        });
                        code = 0;
                        return [2 /*return*/, { cinemas: result_1, code: code }];
                    case 2:
                        err_1 = _a.sent();
                        log = '';
                        cinemasAvailable = Object.keys(body);
                        if (err_1.name == 'StatusCodeError')
                            log = err_1.statusCode;
                        else if (err_1.name == 'RequestError' && err_1.message.includes('ESOCKETTIMEDOUT'))
                            log = err_1.message;
                        else {
                            console.log(err_1);
                            throw new Error(err_1);
                        }
                        result_2 = {};
                        if (Object.entries(this._cache).length !== this.cinemas.length) {
                            result_2 = { code: 3 };
                        }
                        else if (cinemasAvailable.every(function (cinema) { return body[cinema] in _this._cache[cinema]; })) {
                            cinemasAvailable.forEach(function (cinema) { return result_2[cinema] = _this._cache[cinema][body[cinema]]; });
                            result_2 = { cinemas: result_2, code: 2 };
                        }
                        else {
                            result_2 = { code: 3 };
                        }
                        return [2 /*return*/, result_2]; // Reply with the result object
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ProcessMovieNames.prototype.getMovieDetails = function (cinema, id) {
        return request({
            method: 'GET',
            uri: this.baseURL + "/" + cinema + "/movie/" + id,
            headers: {
                'x-access-token': this.accessToken
            },
            timeout: this.timeout
        });
    };
    return ProcessMovieNames;
}(processMovies_1.default));
exports.default = ProcessMovieNames;
//# sourceMappingURL=processMovieDetails.js.map