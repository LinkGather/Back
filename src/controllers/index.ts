import { Router, Request, Response, NextFunction } from 'express';

class Index {
  public getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('hi, deploy');
  };
}

export default new Index();
