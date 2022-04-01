export declare type type = "object" | "sting" | "integer";
export declare type formatType = 'int32' | 'int64' | 'date-time';
export declare type methodType = 'get' | 'post';
export interface Definition {
    type?: type;
    title?: string;
    properties?: {
        [k: string]: {
            type: type;
            format?: formatType;
            items?: {
                $ref: string;
            };
        };
    };
}
export interface Method {
    methodType: methodType;
    methodName: string;
    summary: string;
    response: string;
    apiPath: string;
    parameters: {
        name: string;
        required: boolean;
        type?: string;
    }[];
}
export interface Controller {
    type: methodType;
    summary: string;
    operationId: string;
    response: string;
    tags?: string;
    parameters?: {
        [k: string]: {
            type: type;
            format?: formatType;
            items?: {
                $ref: string;
            };
        };
    };
}
