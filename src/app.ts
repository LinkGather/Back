import * as Koa from 'koa';
import dbConnect from './config';
import * as Compress from 'koa-compress';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-body';
import * as Logger from 'koa-logger';
import * as passport from 'koa-passport';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { publicRouter } from './routes/api';
import { passportStrategy } from './lib/passport/strategy';

const app = new Koa();

dbConnect.connection();

//error handler
app.use(errorHandlerMiddleware);

//passport
app.use(passport.initialize());
passportStrategy();

//middleware
app.use(Logger());
app.use(Compress());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser());
app.use(publicRouter.middleware());

export default app;
