//字段类型
export type type = "object" | "sting" | "integer"

export type formatType = 'int32' | 'int64' | 'date-time'

export type methodType = 'get' | 'post'

export interface Definition {
    type?: type
    title?: string;
    properties?: {
        [k: string]: {
            type: type,
            format?: formatType
            items?: {
                $ref: string
            }
        }
    }
}

export interface Method {
    methodType:methodType
    methodName: string;
    summary: string;
    response:string
    apiPath:string
    parameters: {
        name:string,
        required:boolean
        type?: string
    }[]

}

export interface Controller {
    //接口类型
    type: methodType,
    //接口描述
    summary: string
    operationId: string
    response:string
    tags?: string
    //接口参数定义
    parameters?: {
        [k: string]: {
            type: type,
            format?: formatType
            items?: {
                $ref: string
            }
        }
    }
}