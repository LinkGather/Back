// import * as express from 'express';
// import Server from './app';
// import 'dotenv/config';
// const port = Number(process?.env?.PORT);

// const app: express.Application = Server.getInstance();

// app.listen(port, () => {
//   console.log(`server listening at http://localhost:${port}`);
// });

import 'reflect-metadata';
import app from './app';
import 'dotenv/config';
// import { startApolloServer } from './routes/gql';
import * as http from 'http';

const port = Number(process.env.PORT);
const httpServer = http.createServer(app.callback());

// (async () => {
//     const server = startApolloServer(httpServer);
//     await server.start();
//     server.applyMiddleware({ app, path: '/gql' });

//     httpServer.listen(port, () => console.log(`server is running on port ${port}`));
// })();

httpServer.listen(port, () => console.log(`server is running on port ${port}`));
