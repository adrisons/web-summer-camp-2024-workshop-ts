import "reflect-metadata";

export const Controller = (path: string) => {
  return (target: any) => {
    Reflect.defineMetadata("basePath", path, target);
  };
};
