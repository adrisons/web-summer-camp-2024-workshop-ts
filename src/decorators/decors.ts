import { Request, Response } from "express";

export type HttpMethod = "get" | "post" | "delete";

export interface Route {
  propertyKey: string;
  httpMethod: HttpMethod;
  path: string;
}

export const Get = (path: string = "") => {
  const httpMethod: HttpMethod = "get";
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const route: Route = {
      propertyKey,
      httpMethod,
      path,
    };
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
    const routes = Reflect.getMetadata("routes", target);
    routes.push(route);

    const routeParams = Reflect.getMetadata("routeParams", target);
    const methodParams = routeParams ? routeParams[propertyKey] : [];
    console.log("[@Get] routeParams:", routeParams);
    console.log(`[@Get]  routeParams[${propertyKey}]:`, methodParams);
    const originalMethod = descriptor.value;
    descriptor.value = (...args: [Request, Response]) => {
      let [request, response] = args;
      const argsToInject: any[] = [];
      methodParams.forEach((param: ParamType) => {
        argsToInject[param.index] = request.params[param.paramName];
      });
      console.log("[@Get] argsToInject:", argsToInject);
      const results = originalMethod.apply(this, argsToInject);
      response.send(results);
    };
  };
};

export interface ParamType {
  paramName: string;
  index: number;
}

export const Param = (paramName: string) => {
  return (target: any, methodName: string, index: number) => {
    const param: ParamType = {
      paramName,
      index,
    };
    if (!Reflect.hasMetadata("routeParams", target)) {
      Reflect.defineMetadata("routeParams", {}, target);
    }
    const routeParams = Reflect.getMetadata("routeParams", target);
    if (!routeParams.hasOwnProperty(methodName)) {
      routeParams[methodName] = [];
    }
    routeParams[methodName].push(param);
    console.log("[@Param]", target, methodName, index, paramName);
    console.log("[@Param]", routeParams[methodName]);
  };
};
