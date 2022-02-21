import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret = process.env.SECRET;

export const generateToken = (id: number) => {
  return jwt.sign({ id }, secret as string);
};
