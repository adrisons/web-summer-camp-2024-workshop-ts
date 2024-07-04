import { NextFunction, Request, Response } from "express";
import { Controller } from "./decorators/controller";
import { Get, Param } from "./decorators/decors";
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
  public static getListById(@Param("postId") postId: number) {
    console.log("[Controller/getListById]", postId);
    const data = postsService.getPost(postId);
    return data;
  }
}
