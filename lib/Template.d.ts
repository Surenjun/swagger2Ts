import { Definition, Controller, Method } from './types/interface';
declare class Template {
    definitions: Definition;
    controllerName: string;
    methodTemps: string;
    existInterfaceKey: string[];
    cacheInterfaces: {
        [k: string]: Object;
    };
    cacheTypes: {
        [k: string]: Object;
    };
    constructor();
    emitController(controllerName: string, controller: Controller, definitions: Definition): void;
    emitMethods(method: Method): void;
    methodReqParams({ methodType, parameters }: {
        methodType: any;
        parameters: any;
    }): any;
    transformInterface($ref: string): string;
    recurseTsInterface(definition: any): void;
    methodResParams(methodResParams: any): void;
    emitInterfaces({ name, properties }: {
        name: any;
        properties: any;
    }): string;
    getDefinitionKey($ref: any): string;
    getInterfaceKey($ref: any): string;
    transformType(type: any, $ref?: string, param?: any): string;
    getSimpleTs(param: any): string;
    getQuoteTs(param: any, temp: any): string;
    emitFile(): void;
}
export default Template;
