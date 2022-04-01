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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios').default;
var Template_1 = __importDefault(require("./Template"));
var chalk_1 = __importDefault(require("chalk"));
var path = require('path');
var configPath = path.join(process.cwd(), './swagger-config');
var configObj = require(configPath);
var _a = configObj.api, swaggerUrl = _a.swaggerUrl, dir = _a.dir, topPackagesStr = _a.topPackagesStr, include = _a.include, exclude = _a.exclude;
console.log(chalk_1.default("\u6B63\u5728\u8BFB\u53D6\uFF1A" + configPath + "\u914D\u7F6E\u6587\u4EF6"));
var SwaggerApi = /** @class */ (function () {
    function SwaggerApi() {
        this.run();
        this.cacheControllers = {};
        //接口参数的类型定义
        this.definitions = {};
    }
    SwaggerApi.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, definitions, info, host, paths, tags, apiPathsArr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //获取swagger配置的json
                        console.log(chalk_1.default("\u8BFB\u53D6api\u7D22\u5F15\uFF1A" + swaggerUrl));
                        return [4 /*yield*/, axios.get(swaggerUrl)];
                    case 1:
                        data = (_a.sent()).data;
                        definitions = data.definitions, info = data.info, host = data.host, paths = data.paths, tags = data.tags;
                        this.definitions = definitions;
                        apiPathsArr = Reflect.ownKeys(paths);
                        console.log(chalk_1.default("\u5F00\u59CB\u751F\u6210"));
                        apiPathsArr.forEach(function (apiPath) {
                            var selfApi = paths[apiPath];
                            //获取该接口下所有restful类型
                            var restfuls = Reflect.ownKeys(selfApi);
                            restfuls.forEach(function (restfulType) { return __awaiter(_this, void 0, void 0, function () {
                                var selfRestful, tags, parameters, operationId, summary, responses, controllersName, cacheController, prevPaths, paths, pathName;
                                var _a;
                                return __generator(this, function (_b) {
                                    selfRestful = selfApi[restfulType];
                                    tags = selfRestful.tags, parameters = selfRestful.parameters, operationId = selfRestful.operationId, summary = selfRestful.summary, responses = selfRestful.responses;
                                    controllersName = selfRestful.tags[0];
                                    cacheController = this.cacheControllers[controllersName];
                                    if (cacheController) {
                                    }
                                    else {
                                        //第一次
                                        this.cacheControllers[controllersName] = {};
                                    }
                                    prevPaths = apiPath.split('.')[0];
                                    paths = prevPaths.split('/');
                                    pathName = paths[paths.length - 1];
                                    //TODO controller中文替换
                                    // const  words = await translate('测试');
                                    this.cacheControllers[controllersName][pathName] = {
                                        apiPath: apiPath,
                                        type: restfulType,
                                        summary: summary,
                                        parameters: parameters,
                                        response: (_a = responses['200'].schema) === null || _a === void 0 ? void 0 : _a.$ref,
                                        operationId: operationId,
                                        tags: tags[0]
                                    };
                                    return [2 /*return*/];
                                });
                            }); });
                        });
                        this.getController();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 单个controller处理
    SwaggerApi.prototype.getController = function () {
        var _a = this, cacheControllers = _a.cacheControllers, definitions = _a.definitions;
        var cacheControllerArr = Reflect.ownKeys(cacheControllers);
        cacheControllerArr.forEach(function (controllerKey, key) {
            var thisController = cacheControllers[controllerKey];
            var includeLen = include.length;
            var excludeLen = exclude.length;
            //include不为空，只读取include里的controller
            if (includeLen) {
                if (include.includes(controllerKey)) {
                    var controllerTemp = new Template_1.default();
                    controllerTemp.emitController(controllerKey, thisController, definitions);
                    console.log(chalk_1.default.blue(key + 1 + "/" + cacheControllerArr.length + " " + controllerKey));
                    return;
                }
                else {
                    console.log(chalk_1.default.red(key + 1 + "/" + cacheControllerArr.length + " " + controllerKey));
                }
            }
            else {
                if (excludeLen && exclude.includes(controllerKey)) {
                    console.log(chalk_1.default.red(key + 1 + "/" + cacheControllerArr.length + " " + controllerKey));
                    return;
                }
                var controllerTemp = new Template_1.default();
                controllerTemp.emitController(controllerKey, thisController, definitions);
                console.log(chalk_1.default.blue(key + 1 + "/" + cacheControllerArr.length + " " + controllerKey));
            }
        });
        console.log(chalk_1.default.green("\u63A5\u53E3\u5168\u90E8\u751F\u6210"));
    };
    return SwaggerApi;
}());
new SwaggerApi();
