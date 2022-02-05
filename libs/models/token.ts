export interface TokenData {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  fingerprint: string;
}

export interface TokenResponse {
  accessToken: string;
}
