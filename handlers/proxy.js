const fetch = require("isomorphic-unfetch");

const api = async (path) => {
  const npmPath = path.replace("/api/npm/", "");
  const npmUrl = `https://api.npmjs.org/${npmPath}`;
  try {
    const response = await fetch(npmUrl);
    const data = await response.json();
    return {
      status: 200,
      payload: JSON.stringify(data),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      status: 400,
      payload: JSON.stringify({
        error: "Invalid request",
      }),
    };
  }
};

const fetchData = async (req, res) => {
  const { status, payload } = await api(req.url);
  res.writeHead(status);
  res.end(payload);
};

exports.api = api;

exports.fetchData = fetchData;

exports.handler = (event, context) => {
  const awsServerlessExpress = require("aws-serverless-express");
  const server = awsServerlessExpress.createServer(fetchData, null, [
    "application/json",
  ]);

  awsServerlessExpress.proxy(server, event, context);
};
