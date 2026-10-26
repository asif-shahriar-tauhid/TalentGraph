import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string | number,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
  });
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true as const,
      data: verifiedToken as JwtPayload,
    };
  } catch (error: any) {
    return {
      success: false as const,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
