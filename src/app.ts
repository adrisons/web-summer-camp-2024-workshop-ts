import express, { Application } from "express";
import { Routes } from "./routes";
import { Route } from "./decorators/decors";

class App {
  public app: Application;
  public routesProvider: Routes = new Routes();
  port: number;
  constructor(port: number, controllers: any[]) {
    this.app = express();
    this.port = port;
    this.controllersInit(controllers);
    this.init();
    this.routesProvider.routes(this.app);
  }

  private controllersInit(controllers: any[]) {
    controllers.forEach((controller) => {
      const basePath = Reflect.getMetadata("basePath", controller);
      const routes = Reflect.getMetadata("routes", controller);
      console.log("[App/controllersInit] basePath:", basePath);
      console.log("[App/controllersInit] routes:", routes);
      let curPath: string, handler;
      routes.forEach((route: Route) => {
        curPath = basePath + route.path;
        console.log("[App/controllersInit]", curPath);
        handler = controller[route.propertyKey];
        this.app[route.httpMethod](curPath, handler);
      });
    });
  }

  private init(): void {
    this.app.listen(this.port, () => {
      console.log("[App/init] Server works", this.port);
    });
  }
}

export default App;
