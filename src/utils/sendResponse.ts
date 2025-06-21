import { Response } from 'express';

interface ResponseConfig {
  message?: string;
  [key: string]: any; 
}

const sendResponse = <T>(
  res: Response,
  status: number,
  data: T,
  config?: ResponseConfig
) => {
  return res.status(status).send({
    success: true,
    data,
    ...config,
  });
};

export default sendResponse;
