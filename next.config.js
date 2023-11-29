/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000/api"
  },
  reactStrictMode: false,
  output: 'build'
}

module.exports = nextConfig
