import { Router } from 'express';
import postController from '../controllers/post.controller';
import Routers from '../interfaces/router.interface';
import { auth, authForGuest } from '../middlewares/auth';

class postRouter implements Routers {
  public path = '/posts';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authForGuest, postController.getPost);
    this.router.post(`${this.path}`, auth, postController.createPost);
    this.router.get(
      `${this.path}/sort`,
      authForGuest,
      postController.getPostSorted
    );
    this.router.get(`${this.path}/search`, authForGuest, postController.search);
    this.router.get(`${this.path}/mypage`, auth, postController.getMyPost);
    this.router.post(`${this.path}/preview`, auth, postController.previewImage);
    this.router.patch(`${this.path}/:id`, auth, postController.editPost);
    this.router.delete(`${this.path}/:id`, auth, postController.deletePost);
    this.router.post(`${this.path}/:id/like`, auth, postController.like);
    this.router.post(`${this.path}/:id/dib`, auth, postController.dib);
  }
}

export default postRouter;
