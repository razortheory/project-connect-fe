// See: https://www.npmjs.com/package/dotenv-webpack
// You can reference vars from .env as "process.env.VAR_NAME" (no destructuring)

export const API_MAPBOX_ACCESS_TOKEN =
  process.env.API_MAPBOX_ACCESS_TOKEN ?? '';
