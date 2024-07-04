import { NextFunction, Request, Response } from "express";
import { Controller } from "./decorators/controller";
import { Get, Param } from "./decorators/decors";
import postsService from "./posts-service";

@Controller("/posts")
export class PostsController {
  @Get()
  public static getListOfPosts() {
    const data = postsService.listPosts();
    return data;
  }

  @Get("/:postId")
  public static getListById(@Param("postId") postId: number) {
    console.log("[Controller/getListById]", postId);
    const data = postsService.getPost(postId);
    return data;
  }
}
