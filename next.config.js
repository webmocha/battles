const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript({
  target: "serverless",
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    STATIC_LOCATION:
      process.env.NODE_ENV !== "production"
        ? "/static"
        : "https://static.battles.dev",
  },
});
