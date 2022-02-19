import type { Context } from 'koa';

interface ResponseError {
  errorMessage?: string;
}

interface TransformResponse {
  status: number;
  body: ResponseError;
}

const transformResponse = (err: Error): TransformResponse => {
  const rs: TransformResponse = {
    status: 500,
    body: {
      errorMessage: '',
    },
  };
  if (err.name === 'EntityNotFoundError') {
    rs.status = 400;
    rs.body = {
      errorMessage:
        process.env.NODE_ENV !== 'production'
          ? `Invalid request.\ncheck the request value.\n${err.message}`
          : 'Invalid request.\ncheck the request value.',
    };
  } else {
    rs.body.errorMessage =
      'An unexpected error has occurred. Please try again.';
  }
  return rs;
};

export const errorHandlerMiddleware = async (
  ctx: Context,
  next: () => Promise<any>
) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    const response = transformResponse(err);
    ctx.status = response.status;
    const { errorMessage } = response.body;
    ctx.body = {
      errorMessage:
        errorMessage ?? 'An unexpected error has occurred. Please try again.',
    };
  }
};
