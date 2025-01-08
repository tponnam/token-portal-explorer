import * as jose from 'jose';

export interface DecodedJWT {
  header: any;
  payload: any;
  isValid: boolean;
  error?: string;
}

export const decodeToken = async (token: string): Promise<DecodedJWT> => {
  try {
    const header = jose.decodeProtectedHeader(token);
    const payload = jose.decodeJwt(token);
    
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

export const verifyToken = async (token: string, key: string): Promise<boolean> => {
  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(key);

    // First, try to verify as HMAC (symmetric)
    try {
      await jose.jwtVerify(token, secretKey);
      return true;
    } catch {
      // If HMAC fails, try RSA (asymmetric)
      try {
        const publicKey = await jose.importSPKI(key, 'RS256');
        await jose.jwtVerify(token, publicKey);
        return true;
      } catch {
        return false;
      }
    }
  } catch {
    return false;
  }
};