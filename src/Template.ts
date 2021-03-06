import {Definition, Controller, Method, methodType} from './types/interface'
import {capitalizedTitleCase} from './utils'
import path from "path";

const fse = require('fs-extra');
const prettier = require("prettier");
let configPath = path.join(process.cwd(), './swagger-config');

const configObj = require(configPath)

const {api: {swaggerUrl, dir, topPackagesStr, include, exclude}} = configObj
class Template {

    public definitions: Definition
    public controllerName: string
    public methodTemps: string
    public existInterfaceKey: string[]
    public cacheInterfaces: {
        [k: string]: Object
    }
    public cacheTypes: {
        [k: string]: Object
    }

    constructor() {
        //当前controller用到的ts类型
        this.cacheInterfaces = {};
        //当前controller用到的type类型
        this.cacheTypes = {}
        //当前controller用到的方法
        this.methodTemps =  topPackagesStr?.join(';\n') || '';

        this.existInterfaceKey = []
    }

    //单个controller
    emitController(controllerName: string, controller: Controller, definitions: Definition) {
        this.controllerName = controllerName
        this.definitions = definitions

        Reflect.ownKeys(controller).forEach((pathKey: string) => {
            const thisMethod = controller[pathKey];
            const {type, summary, parameters, operationId, response, apiPath} = thisMethod;
            const methodName = type === 'get' ? `${pathKey}` : pathKey;
            this.emitMethods(
                {
                    apiPath,
                    methodName,
                    parameters,
                    summary,
                    response,
                    methodType: type
                }
            )
        })


        const existInterfaceKey = this.existInterfaceKey

        //处理types
        Reflect.ownKeys(this.cacheTypes).forEach((typeKey: string) => {
            this.methodTemps += '\n' + this.cacheTypes[typeKey]
        })

        Reflect.ownKeys(this.cacheInterfaces).forEach((interfaceKey: string) => {
            if (existInterfaceKey.includes(interfaceKey)) {

            } else {
                existInterfaceKey.push(interfaceKey)
                this.methodTemps += '\r' + this.emitInterfaces({
                    name: interfaceKey,
                    properties: this.cacheInterfaces[interfaceKey]
                })
            }
        })

        //格式化代码
        this.methodTemps = prettier.format(this.methodTemps, {parser: 'typescript'});

        this.emitFile()
    }

    //单个方法生成
    emitMethods(method: Method) {
        const {methodName, summary, parameters, methodType, response, apiPath} = method;
        const paramsTemp = this.methodReqParams({methodType, parameters})
        const responseKey = this.getInterfaceKey(response)

        const isGet = methodType === 'get';

        const paramsStr = isGet ? 'params,' : '';
        const dataStr = isGet ? '' : 'data,';
        const methodTemp = `
            /**
             * ${summary || ''}
             */
            export async function ${methodName}(${isGet ? 'params' : 'data'}:{
                ${paramsTemp || ''}
            }):Promise<${responseKey || ''}>{
                const result = await request<${responseKey || ''}>({
                    url:'${apiPath}',
                    method:'${methodType}',
                    ${paramsStr}
                    ${dataStr}
                
                })
                return result.result
            }         
        `
        this.methodTemps += `\n${methodTemp}`
        response && this.transformInterface(response)

    }

    //请求的参数模版
    methodReqParams({methodType, parameters}) {
        switch (methodType) {

            case 'get': {
                return parameters?.reduce((p, param) => {
                    p += this.getSimpleTs(param)
                    return p
                }, '')
            }

            case 'post': {
                return parameters?.reduce((p, param) => {
                    p += `/*${param.description}*/\n
                    ${param.name}${param.required ? ':' : '?:'}${param.schema?.$ref ? this.transformInterface(param.schema.$ref) : param.type}`
                    return p
                }, '')
            }
        }
    }

    //类型名称转换 并缓存要生成的TS接口
    transformInterface($ref: string) {
        const thisRef = this.getDefinitionKey($ref);
        const thisRefDefinition = this.definitions[thisRef];
        this.recurseTsInterface(thisRefDefinition)
        return thisRef
    }


    //递归缓存TS接口
    recurseTsInterface(definition) {
        if (definition.properties) {
            const properties = definition.properties;
            const simpleKey = this.getInterfaceKey(definition.title);

            let isSimple = true;
            let simpleStr = ''
            Reflect.ownKeys(properties).map((properKey: string) => {
                const thisProperty = properties[properKey];
                const $ref = thisProperty.items?.$ref || thisProperty.$ref;
                if ($ref !== undefined) {
                    //递归去读ref
                    this.recurseTsInterface($ref)
                    simpleStr += `${properKey}:${this.getDefinitionKey($ref)}`
                    //TODO 去掉第一层 isSimple = false;
                    isSimple = false;
                } else {

                    simpleStr += this.getSimpleTs({name: properKey, ...thisProperty})
                }
            })

            if (isSimple) {
                this.cacheInterfaces[simpleKey] = simpleStr
            } else {
                //TODO 临时处理第一层
                const data = definition.properties.data
                this.cacheTypes[simpleKey] = `
                 type ${simpleKey}  = ${this.getInterfaceKey(data.$ref || data.items?.$ref)}
                `
            }

        } else {
            const definitionKey = this.getDefinitionKey(definition);
            const interfaceKey = this.getInterfaceKey(definition)

            if (!this.cacheInterfaces[definitionKey]) {
                const properties = this.definitions[definitionKey]?.properties || {};
                this.cacheInterfaces[interfaceKey] =
                    Reflect.ownKeys(properties).reduce((p: string, paramKey) => {
                        const param = properties[paramKey];
                        param.name = paramKey
                        p += this.getSimpleTs(param)
                        return p
                    }, '')
            }
        }
    }

    //返回的参数模版
    methodResParams(methodResParams) {
    }

    //单个类型定义
    emitInterfaces({name, properties}) {
        return `export interface ${name}{
            ${properties}
        }`
    }

    getDefinitionKey($ref): string {
        return $ref.split('/').slice(-1)[0];
    }

    //接口的Key
    getInterfaceKey($ref): string {
        const lastRefKey = $ref.split('/').slice(-1)[0];
        // const matched = lastRefKey?.match(/(?<=«)[^«»]+(?=»)/);
        const matched = lastRefKey?.match(/[^«»]+/g);
        return matched.join('')
    }

    // @ts-ignore
    transformType(type, $ref?: string, param?: any): string {
        switch (type) {
            case 'string':
                return 'string'
            case 'integer':
                return 'number'
            case 'boolean':
                return 'boolean'
            case 'object':
                return '{[k:string]:any}'
            //数组特殊处理
            case 'array':
                return $ref ? $ref : `${this.transformType(param.items.type)}[]`

            default:
                return $ref
        }
    }


    getSimpleTs(param) {
        let definitionKey = undefined
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


        return `/*${param?.description || ''}*/
                ${param.name}${param.required ? ':' : '?:'}${this.transformType(param.type, definitionKey, param)}\n`
    }


    getQuoteTs(param, temp) {
        return `/*${param.description || ''}*/
                ${param.name}${param.required ? ':' : '?:'}${temp}`
    }

    //生成文件
    emitFile() {
        const {cacheInterfaces, methodTemps, controllerName} = this;
        const filePah = path.join(process.cwd(),dir ?dir:'./api')
        const file = `${filePah}/${controllerName}.ts`;
        fse.outputFile(file, methodTemps, 'utf8')
    }


}

interface template {

}

export default Template