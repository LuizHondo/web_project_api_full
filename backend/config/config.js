export const IS_PROD = process.env.NODE_ENV === 'production';

// JWT secret: in production require env var; in non-prod allow fallback
export const JWT_SECRET = IS_PROD
  ? process.env.JWT_SECRET
  : (process.env.JWT_SECRET || 'dev-secret-key');
