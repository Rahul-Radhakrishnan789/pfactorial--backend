import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

class JwtService {
  static sign(
    payload: string | object | Buffer,
    secret: string = process.env.ACCESS_TOKEN_KEY as string,
    options?: SignOptions
  ): string {
    return jwt.sign(payload, secret, options);
  }

  static verify<T = JwtPayload>(
    token: string,
    secret: string = process.env.ACCESS_TOKEN_KEY as string
  ): T {
    return jwt.verify(token, secret) as T;
  }
}

export default JwtService;
