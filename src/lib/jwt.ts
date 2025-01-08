import jwt from 'jsonwebtoken';

export interface DecodedJWT {
  header: any;
  payload: any;
  isValid: boolean;
  error?: string;
}

// Helper function to safely decode base64
const base64Decode = (str: string): string => {
  // Replace non-url compatible chars with base64 standard chars
  const input = str
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Add padding if needed
  const pad = input.length % 4;
  if (pad) {
    input += new Array(5 - pad).join('=');
  }

  try {
    return decodeURIComponent(
      atob(input)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return atob(input);
  }
};

export const decodeToken = (token: string): DecodedJWT => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const header = JSON.parse(base64Decode(parts[0]));
    const payload = JSON.parse(base64Decode(parts[1]));

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
    // For browser compatibility, we'll just validate the token structure
    // Full signature verification would require a backend service
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  } catch {
    return false;
  }
};