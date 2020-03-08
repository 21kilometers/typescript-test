"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var https_1 = require("https");
/**
 * 指定されたendpointからJSONをGETで取得する関数です。
 * @param {string} url 指定のendpoint
 * @returns {Promise} 取得したJSONをパースしたオブジェクトのPromise
 */
var getJsonFromEndPoint = function (url) {
    return new Promise(function (resolve, reject) {
        var options = {
            headers: {
                // This header is needed. See: https://developer.github.com/v3/#user-agent-required
                'User-Agent': 'typescript-test'
            }
        };
        https_1.get(url, options, function (res) {
            var body = '';
            res.on('data', function (data) {
                body += data;
            });
            res.on('end', function () {
                resolve(JSON.parse(body));
            });
        }).on('error', function (error) {
            reject(error);
        });
    });
};
/**
 * 問3の関数です。
 * @param {SortOptions} [sortOrder] ソート順
 * @returns {Promise<string[]>} ソート後のタイトル一覧のPromise
 */
var getIssueTitles = function (sortOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var issues, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getJsonFromEndPoint('https://api.github.com/repos/facebook/react/issues?page=1&per_page=10')];
            case 1:
                issues = _a.sent();
                // 取得データをソート、必要なプロパティのみ抽出して返す
                return [2 /*return*/, issues.sort(function (a, b) {
                        if (sortOrder === 'asc') {
                            return a.number - b.number;
                        }
                        else if (sortOrder === "desc") {
                            return b.number - a.number;
                        }
                        else {
                            return 0;
                        }
                    }).map(function (issue) { return issue.number + ": " + issue.title; })];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var sortOrder = process.argv[2];
if (sortOrder === undefined || sortOrder === 'asc' || sortOrder === 'desc') {
    console.log('Getting a data from API endpoint...');
    getIssueTitles(sortOrder).then(function (titles) {
        console.log('Get and sort issues just has been succeeded!');
        console.log('get result:');
        titles.forEach(function (title) { return console.log(title); });
    }).catch(function (error) {
        console.log('An error has occurred, please try again.');
        console.log("error: " + JSON.stringify(error, null, 2));
    });
}
else {
    console.log('Argument is wrong, please specify "asc" or "desc".');
}
