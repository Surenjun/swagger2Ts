"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fse = require('fs-extra');
var prettier = require("prettier");
var configPath = path_1["default"].join(process.cwd(), './swagger-config');
var configObj = require(configPath);
var _a = configObj.api, swaggerUrl = _a.swaggerUrl, dir = _a.dir, topPackagesStr = _a.topPackagesStr, include = _a.include, exclude = _a.exclude;
var Template = /** @class */ (function () {
    function Template() {
        //当前controller用到的ts类型
        this.cacheInterfaces = {};
        //当前controller用到的type类型
        this.cacheTypes = {};
        //当前controller用到的方法
        this.methodTemps = (topPackagesStr === null || topPackagesStr === void 0 ? void 0 : topPackagesStr.join(';\n')) || '';
        this.existInterfaceKey = [];
    }
    //单个controller
    Template.prototype.emitController = function (controllerName, controller, definitions) {
        var _this = this;
        this.controllerName = controllerName;
        this.definitions = definitions;
        Reflect.ownKeys(controller).forEach(function (pathKey) {
            var thisMethod = controller[pathKey];
            var type = thisMethod.type, summary = thisMethod.summary, parameters = thisMethod.parameters, operationId = thisMethod.operationId, response = thisMethod.response, apiPath = thisMethod.apiPath;
            var methodName = type === 'get' ? "" + pathKey : pathKey;
            _this.emitMethods({
                apiPath: apiPath,
                methodName: methodName,
                parameters: parameters,
                summary: summary,
                response: response,
                methodType: type
            });
        });
        var existInterfaceKey = this.existInterfaceKey;
        //处理types
        Reflect.ownKeys(this.cacheTypes).forEach(function (typeKey) {
            _this.methodTemps += '\n' + _this.cacheTypes[typeKey];
        });
        Reflect.ownKeys(this.cacheInterfaces).forEach(function (interfaceKey) {
            if (existInterfaceKey.includes(interfaceKey)) {
            }
            else {
                existInterfaceKey.push(interfaceKey);
                _this.methodTemps += '\r' + _this.emitInterfaces({
                    name: interfaceKey,
                    properties: _this.cacheInterfaces[interfaceKey]
                });
            }
        });
        //格式化代码
        this.methodTemps = prettier.format(this.methodTemps, { parser: 'typescript' });
        this.emitFile();
    };
    //单个方法生成
    Template.prototype.emitMethods = function (method) {
        var methodName = method.methodName, summary = method.summary, parameters = method.parameters, methodType = method.methodType, response = method.response, apiPath = method.apiPath;
        var paramsTemp = this.methodReqParams({ methodType: methodType, parameters: parameters });
        var responseKey = this.getInterfaceKey(response);
        var isGet = methodType === 'get';
        var paramsStr = isGet ? 'params,' : '';
        var dataStr = isGet ? '' : 'data,';
        var methodTemp = "\n            /**\n             * " + (summary || '') + "\n             */\n            export async function " + methodName + "(" + (isGet ? 'params' : 'data') + ":{\n                " + (paramsTemp || '') + "\n            }):Promise<" + (responseKey || '') + ">{\n                const result = await request<" + (responseKey || '') + ">({\n                    url:'" + apiPath + "',\n                    method:'" + methodType + "',\n                    " + paramsStr + "\n                    " + dataStr + "\n                \n                })\n                return result.result\n            }         \n        ";
        this.methodTemps += "\n" + methodTemp;
        response && this.transformInterface(response);
    };
    //请求的参数模版
    Template.prototype.methodReqParams = function (_a) {
        var _this = this;
        var methodType = _a.methodType, parameters = _a.parameters;
        switch (methodType) {
            case 'get': {
                return parameters === null || parameters === void 0 ? void 0 : parameters.reduce(function (p, param) {
                    p += _this.getSimpleTs(param);
                    return p;
                }, '');
            }
            case 'post': {
                return parameters === null || parameters === void 0 ? void 0 : parameters.reduce(function (p, param) {
                    var _a;
                    p += "/*" + param.description + "*/\n\n                    " + param.name + (param.required ? ':' : '?:') + (((_a = param.schema) === null || _a === void 0 ? void 0 : _a.$ref) ? _this.transformInterface(param.schema.$ref) : param.type);
                    return p;
                }, '');
            }
        }
    };
    //类型名称转换 并缓存要生成的TS接口
    Template.prototype.transformInterface = function ($ref) {
        var thisRef = this.getDefinitionKey($ref);
        var thisRefDefinition = this.definitions[thisRef];
        this.recurseTsInterface(thisRefDefinition);
        return thisRef;
    };
    //递归缓存TS接口
    Template.prototype.recurseTsInterface = function (definition) {
        var _this = this;
        var _a, _b;
        if (definition.properties) {
            var properties_1 = definition.properties;
            var simpleKey = this.getInterfaceKey(definition.title);
            var isSimple_1 = true;
            var simpleStr_1 = '';
            Reflect.ownKeys(properties_1).map(function (properKey) {
                var _a;
                var thisProperty = properties_1[properKey];
                var $ref = ((_a = thisProperty.items) === null || _a === void 0 ? void 0 : _a.$ref) || thisProperty.$ref;
                if ($ref !== undefined) {
                    //递归去读ref
                    _this.recurseTsInterface($ref);
                    simpleStr_1 += properKey + ":" + _this.getDefinitionKey($ref);
                    //TODO 去掉第一层 isSimple = false;
                    isSimple_1 = false;
                }
                else {
                    simpleStr_1 += _this.getSimpleTs(__assign({ name: properKey }, thisProperty));
                }
            });
            if (isSimple_1) {
                this.cacheInterfaces[simpleKey] = simpleStr_1;
            }
            else {
                //TODO 临时处理第一层
                var data = definition.properties.data;
                this.cacheTypes[simpleKey] = "\n                 type " + simpleKey + "  = " + this.getInterfaceKey(data.$ref || ((_a = data.items) === null || _a === void 0 ? void 0 : _a.$ref)) + "\n                ";
            }
        }
        else {
            var definitionKey = this.getDefinitionKey(definition);
            var interfaceKey = this.getInterfaceKey(definition);
            if (!this.cacheInterfaces[definitionKey]) {
                var properties_2 = ((_b = this.definitions[definitionKey]) === null || _b === void 0 ? void 0 : _b.properties) || {};
                this.cacheInterfaces[interfaceKey] =
                    Reflect.ownKeys(properties_2).reduce(function (p, paramKey) {
                        var param = properties_2[paramKey];
                        param.name = paramKey;
                        p += _this.getSimpleTs(param);
                        return p;
                    }, '');
            }
        }
    };
    //返回的参数模版
    Template.prototype.methodResParams = function (methodResParams) {
    };
    //单个类型定义
    Template.prototype.emitInterfaces = function (_a) {
        var name = _a.name, properties = _a.properties;
        return "export interface " + name + "{\n            " + properties + "\n        }";
    };
    Template.prototype.getDefinitionKey = function ($ref) {
        return $ref.split('/').slice(-1)[0];
    };
    //接口的Key
    Template.prototype.getInterfaceKey = function ($ref) {
        var lastRefKey = $ref.split('/').slice(-1)[0];
        // const matched = lastRefKey?.match(/(?<=«)[^«»]+(?=»)/);
        var matched = lastRefKey === null || lastRefKey === void 0 ? void 0 : lastRefKey.match(/[^«»]+/g);
        return matched.join('');
    };
    // @ts-ignore
    Template.prototype.transformType = function (type, $ref, param) {
        switch (type) {
            case 'string':
                return 'string';
            case 'integer':
                return 'number';
            case 'boolean':
                return 'boolean';
            case 'object':
                return '{[k:string]:any}';
            //数组特殊处理
            case 'array':
                return $ref ? $ref : this.transformType(param.items.type) + "[]";
            default:
                return $ref;
        }
    };
    Template.prototype.getSimpleTs = function (param) {
        var definitionKey = undefined;
        if (param.type === 'array') {
            if (param.items.$ref) {
                // this.getSimpleTs(param)
                definitionKey = this.getDefinitionKey(param.items.$ref);
                this.recurseTsInterface(param.items.$ref);
            }
            // TODO string类型待处理
        }
        if (param.$ref) {
            definitionKey = this.getDefinitionKey(param.$ref);
            this.recurseTsInterface(param.$ref);
        }
        return "/*" + ((param === null || param === void 0 ? void 0 : param.description) || '') + "*/\n                " + param.name + (param.required ? ':' : '?:') + this.transformType(param.type, definitionKey, param) + "\n";
    };
    Template.prototype.getQuoteTs = function (param, temp) {
        return "/*" + (param.description || '') + "*/\n                " + param.name + (param.required ? ':' : '?:') + temp;
    };
    //生成文件
    Template.prototype.emitFile = function () {
        var _a = this, cacheInterfaces = _a.cacheInterfaces, methodTemps = _a.methodTemps, controllerName = _a.controllerName;
        var filePah = path_1["default"].join(process.cwd(), dir ? dir : './api');
        var file = filePah + "/" + controllerName + ".ts";
        fse.outputFile(file, methodTemps, 'utf8');
    };
    return Template;
}());
exports["default"] = Template;
