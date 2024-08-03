import "dotenv/config"

export default ({ config }) => ({
  ...config,
  extra: {
    baseUrl: process.env.BASE_URL,
    baseAuthUrl: process.env.BASE_AUTH_URL,
    apiKey: process.env.API_KEY
  }
})