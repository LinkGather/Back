import * as Router from 'koa-joi-router';
import { userRoutes } from './users';
import { postRoutes } from './posts';

export const publicRouter = Router();

publicRouter.route([...postRoutes, ...userRoutes]);
