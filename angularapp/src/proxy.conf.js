const PROXY_CONFIG = [
  {
    context: [
      "/ShortUrl",
      "/LogIn",
    ],
    target: "https://localhost:7139",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
