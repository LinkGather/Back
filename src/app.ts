// import * as express from 'express';
// import dbConnect from './entity';
// import * as morgan from 'morgan';
// import * as helmet from 'helmet';
// import * as compression from 'compression';
// import * as passport from 'passport';
// import * as cors from 'cors';
// import Routers from './interfaces/router.interface';
// import indexRouter from './routes';
// import userRouter from './routes/user';
// import postRouter from './routes/post';
// import { errorHandler } from './middlewares/errorHandler';
// import { passportStrategy } from './passport/strategy';
// class Server {
//   public app: express.Application;

//   constructor(routers: Routers[]) {
//     this.app = express();
//     this.connectDatabase();
//     this.passportAuth();
//     this.middleware();
//     this.initializeRouter(routers);
//     this.errorHandleMiddleware();
//   }

//   private connectDatabase() {
//     dbConnect.connection();
//   }

//   private initializeRouter(routers: Routers[]) {
//     routers.forEach((router) => {
//       this.app.use('/', router.router);
//     });
//   }

//   public getInstance(): express.Application {
//     return this.app;
//   }

//   private middleware() {
//     this.app.use(cors({ origin: true, credentials: true }));
//     this.app.use(morgan('dev'));
//     this.app.use(helmet());
//     this.app.use(compression());
//     this.app.use(express.urlencoded({ extended: false }));
//     this.app.use(express.json());
//   }

//   private passportAuth() {
//     this.app.use(passport.initialize());
//     passportStrategy();
//   }

//   private errorHandleMiddleware() {
//     this.app.use(errorHandler);
//   }
// }

// export default new Server([
//   new indexRouter(),
//   new userRouter(),
//   new postRouter(),
// ]);

import * as Koa from 'koa';
import dbConnect from './entity';
import * as Compress from 'koa-compress';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-body';
import * as Logger from 'koa-logger';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { publicRouter } from './routes/api';

const app = new Koa();

dbConnect.connection();

app.use(Logger());
app.use(Compress());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(errorHandlerMiddleware);
app.use(bodyParser());
app.use(publicRouter.middleware());

export default app;
