const fetchData = async (req, res) => {
  return { "api-npm": true };
};

exports.fetchData = fetchData;

exports.handler = (event, context) => {
  const awsServerlessExpress = require("aws-serverless-express");
  const server = awsServerlessExpress.createServer(
    async (req, res) => {
      const result = await fetchData(req, res);
      res.end(JSON.stringify(result));
    },
    null,
    ["application/json"],
  );

  awsServerlessExpress.proxy(server, event, context);
};
