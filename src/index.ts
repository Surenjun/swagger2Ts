const axios = require('axios').default

import {Definition} from './types/interface'
import Template from './Template'
import {translate} from './utils'
import chalk from 'chalk';
import ora from 'ora'

const path = require('path');
let configPath = path.join(process.cwd(), './swagger-config');

const configObj = require(configPath)

const {api: {swaggerUrl, dir, topPackagesStr, include, exclude}} = configObj

console.log(chalk(`正在读取：${configPath}配置文件`))
class SwaggerApi {

    public cacheControllers: any

    public definitions: Definition

    constructor() {
        this.run()
        this.cacheControllers = {};
        //接口参数的类型定义
        this.definitions = {}
    }

    async run() {
        //获取swagger配置的json
        console.log(chalk(`读取api索引：${swaggerUrl}`))
        const {data} = await axios.get(swaggerUrl)
        const {definitions, info, host, paths, tags} = data;
        this.definitions = definitions
        const apiPathsArr = Reflect.ownKeys(paths);

        console.log(chalk(`开始生成`))
        apiPathsArr.forEach((apiPath: string) => {
            const selfApi = paths[apiPath];

            //获取该接口下所有restful类型
            const restfuls = Reflect.ownKeys(selfApi);

            restfuls.forEach(async (restfulType) => {
                const selfRestful = selfApi[restfulType];
                const {tags, parameters, operationId, summary, responses} = selfRestful;
                const controllersName = selfRestful.tags[0];
                const cacheController = this.cacheControllers[controllersName];
                if (cacheController) {


                } else {
                    //第一次
                    this.cacheControllers[controllersName] = {}
                }

                // const pathName = apiPath.match(/\w+(?=\/{\w+})|\w+$/)[0];
                const prevPaths = apiPath.split('.')[0]
                const paths = prevPaths.split('/')
                const pathName = paths[paths.length - 1]

                //TODO controller中文替换
                // const  words = await translate('测试');

                this.cacheControllers[controllersName][pathName] = {
                    apiPath,
                    type: restfulType,
                    summary,
                    parameters,
                    response: responses['200'].schema?.$ref,
                    operationId,
                    tags: tags[0]
                }

            })
        })

        this.getController()

    }

    // 单个controller处理
    getController() {
        const {cacheControllers, definitions} = this;

        const cacheControllerArr =  Reflect.ownKeys(cacheControllers);

        cacheControllerArr.forEach((controllerKey:string,key)=> {
            const thisController = cacheControllers[controllerKey];

            const includeLen = include.length;
            const excludeLen = exclude.length;

            //include不为空，只读取include里的controller
            if(includeLen){
                if(include.includes(controllerKey)){
                    const controllerTemp = new Template();

                    controllerTemp.emitController(
                        controllerKey,
                        thisController,
                        definitions
                    )
                    console.log(chalk.blue(`${key + 1}/${cacheControllerArr.length} ${controllerKey}`))
                    return
                }else{
                    console.log(chalk.red(`${key + 1}/${cacheControllerArr.length} ${controllerKey}`))
                }
            }else{
                if(excludeLen && exclude.includes(controllerKey)){
                    console.log(chalk.red(`${key + 1}/${cacheControllerArr.length} ${controllerKey}`))
                    return
                }

                const controllerTemp = new Template();

                controllerTemp.emitController(
                    controllerKey,
                    thisController,
                    definitions
                )

                console.log(chalk.blue(`${key + 1}/${cacheControllerArr.length} ${controllerKey}`))
            }


        })

        console.log(chalk.green(`接口全部生成`))
    }
}


new SwaggerApi(

)