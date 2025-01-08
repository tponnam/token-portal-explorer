import jwt from 'jsonwebtoken';

export interface DecodedJWT {
  header: any;
  payload: any;
  isValid: boolean;
  error?: string;
}

export const decodeToken = (token: string): DecodedJWT => {
  try {
    // First try to decode without verification
    const decoded = jwt.decode(token, { complete: true });
    
    if (!decoded) {
      throw new Error('Invalid token format');
    }

    return {
      header: decoded.header,
      payload: decoded.payload,
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
    // Attempt to verify the token with the provided key
    const decoded = jwt.verify(token, key, {
      algorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'],
      complete: true
    });
    
    return !!decoded;
  } catch {
    return false;
  }
};