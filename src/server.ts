import App from "./app";
import { PostsController } from "./controller";
const port = 3000;
const app = new App(port, [PostsController]);
