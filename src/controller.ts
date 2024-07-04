import { NextFunction, Request, Response } from "express";
import { Controller } from "./decorators/controller";
import { Get } from "./decorators/decors";
import postsService from "./posts-service";

@Controller("/posts")
export class PostsController {
  @Get()
  public static getListOfPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = postsService.listPosts();
    res.send(data).status(200);
  }

  @Get("/:postId")
  public static getListById(req: Request, res: Response, next: NextFunction) {
    const postId = parseInt(req.params["postId"]);
    const data = postsService.getPost(postId);
    res.send(data).status(200);
  }
}
