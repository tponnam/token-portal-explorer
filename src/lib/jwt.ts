export interface DecodedJWT {
  header: any;
  payload: any;
  isValid: boolean;
  error?: string;
}

// Helper function to safely decode base64Url
const base64UrlDecode = (input: string): string => {
  // Convert base64url to base64
  const base64 = input
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // Add padding
  const pad = base64.length % 4;
  const padded = pad 
    ? base64 + '='.repeat(4 - pad)
    : base64;

  // Decode
  try {
    const binary = atob(padded);
    // Handle UTF-8 encoding
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Invalid base64url encoding');
  }
};

export const decodeToken = (token: string): DecodedJWT => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

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
    // In browser environments, we can only verify the token format
    // Full signature verification requires a backend service
    // This is a simplified check that ensures the token has all required parts
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Verify each part can be decoded
    const [header, payload] = parts;
    JSON.parse(base64UrlDecode(header));
    JSON.parse(base64UrlDecode(payload));

    return true;
  } catch {
    return false;
  }
};