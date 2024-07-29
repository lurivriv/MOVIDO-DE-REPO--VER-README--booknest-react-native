import "dotenv/config"

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.BASE_URL,
    baseAuthUrl: process.env.BASSE_AUTH_URL,
    apiKey: process.env.API_KEY
  }
})