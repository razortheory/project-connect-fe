// See: https://www.npmjs.com/package/dotenv-webpack
// You can reference vars from .env as "process.env.VAR_NAME" (no destructuring)

export const API_MAPBOX_ACCESS_TOKEN =
  process.env.API_MAPBOX_ACCESS_TOKEN ?? '';

export const API_BASE_URL =
  process.env.API_BASE_URL ?? 'https://api.projectconnect.razortheory.com/';

export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY ?? '';
