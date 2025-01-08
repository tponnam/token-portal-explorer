import jwt from 'jsonwebtoken';

export interface DecodedJWT {
  header: any;
  payload: any;
  isValid: boolean;
  error?: string;
}

export const decodeToken = (token: string): DecodedJWT => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

    return {
      header,
      payload,
      isValid: true
    };
  } catch (error) {
    return {
      header: null,
      payload: null,
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid token'
    };
  }
};

export const verifyToken = (token: string, key: string): boolean => {
  try {
    jwt.verify(token, key);
    return true;
  } catch {
    return false;
  }
};