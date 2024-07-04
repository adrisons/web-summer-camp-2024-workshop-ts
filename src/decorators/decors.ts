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
  };
};
