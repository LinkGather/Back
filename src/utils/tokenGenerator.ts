import * as jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

export const generateToken = (id: number) => {
  return jwt.sign({ id }, secret);
};
