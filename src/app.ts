import express, { Application } from "express";
import { Routes } from "./routes";

class App {
  public app: Application;
  public routesProvider: Routes = new Routes();
  port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.init();
    this.routesProvider.routes(this.app);
  }
  private init(): void {
    this.app.listen(this.port, () => {
      console.log("Server works", this.port);
    });
  }
}

export default App;
