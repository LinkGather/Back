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

const validOrigins = [
  'https://linkgather.co.kr',
  'https://www.linkgahter.co.kr',
  // 'http://localhost:3000',
];

function verifyOrigin(ctx: Koa.Context) {
  const origin = ctx.header.origin;
  if (!origin || !validOrigins.includes(origin)) {
    return ctx.throw('not valid');
  }
  return origin;
}

//error handler
app.use(errorHandlerMiddleware);

//passport
app.use(passport.initialize());
passportStrategy();

//middleware
app.use(Logger());
app.use(Compress());
app.use(cors({ origin: verifyOrigin, credentials: true }));
app.use(bodyParser());
app.use(publicRouter.middleware());

export default app;
