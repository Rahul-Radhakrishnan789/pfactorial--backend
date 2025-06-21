import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError.js';
import JwtService from '../utils/jwtService.js';


export interface AuthRequest extends Request {
  user?: {
    _id: any;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader,'authHeader');

     if (!authHeader) {
            return next(new CustomError("unAuthorized1", 401))
        }


  const token = authHeader.split(' ')[1];

  // console.log(token,'token');

  try {

       const userId = await JwtService.verify(token)


        if ( userId ) {

            req.user = {
                _id: userId,
            }
        } else {
            return next(new CustomError("unAuthorized3", 401))
        }

    next();
  } catch (error) {
    console.log(error, 'error');
    return next(new CustomError('unAuthorized2', 401));
  }
};
