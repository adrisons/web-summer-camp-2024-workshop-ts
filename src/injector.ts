import { Injectable } from "./decorators/injectable";

/**
 * CRUD Service for CRUD operations against BE / DB
 */
class CrudService {
  getData(entity: string) {
    return `Some Data from -> ${entity}`;
  }
}

/**
 * Service to retrieve/crate/update comments
 */
@Injectable()
class CommentsService {
  constructor(public crudService: CrudService) {}

  getComments() {
    return this.crudService.getData("/comments");
  }
}

/**
 * Service to retrieve/crate/update comments
 */
@Injectable()
class MoviesService {
  constructor(
    private commentsService: CommentsService,
    private crudService: CrudService
  ) {}
  getMovies() {
    return this.crudService.getData("/movies");
  }
  getComments() {
    return this.commentsService.getComments();
  }
}

const movies = new MoviesService(
  new CommentsService(new CrudService()),
  new CrudService()
);

console.log(movies.getComments());
console.log(movies.getMovies());

const Injector = new (class {
  instMap: Record<string, any> = {};
  resolve(target: any) {
    let tokens = Reflect.getMetadata("design:paramtypes", target);
    console.log(tokens);
    let injections = [];
    if (tokens) {
      injections = tokens.map((token: any) => Injector.resolve(token));
    }

    if (this.instMap.hasOwnProperty(target.name)) {
      return this.instMap[target.name];
    } else {
      this.instMap[target.name] = new target(...injections);
      return this.instMap[target.name];
    }
  }
})();

console.log(Injector.resolve(MoviesService));
