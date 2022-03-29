const axios = require('axios').default
import {Definition} from './types/interface'
import Template from './Template'
import {translate} from './utils'
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
        const {data} = await axios.get('https://ddjdtest.duolunxc.com/managerApp/v2/api-docs?group=%E7%AE%A1%E7%90%86%E7%89%88app%E6%8E%A5%E5%8F%A3')
        const {definitions, info, host, paths, tags} = data;
        this.definitions = definitions
        const apiPathsArr = Reflect.ownKeys(paths);
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

        Reflect.ownKeys(cacheControllers).forEach((controllerKey:string)=> {
            const thisController = cacheControllers[controllerKey];
            const controllerTemp = new Template();
            controllerTemp.emitController(
                controllerKey,
                thisController,
                definitions
            )
        })
    }
}


new SwaggerApi(

)