const fs = require("fs");
const { basename, relative, join } = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const awsServerlessExpress = require("aws-serverless-express");

const pathToNext = ((cwd, dir) => join(relative(dir, cwd), ".next"))(
  process.cwd(),
  __dirname,
);

const server = awsServerlessExpress.createServer(async (req, res) => {
  console.log("CWD", process.cwd());
  console.log("__dirname", __dirname);
  const path = req.url.substr(req.url.indexOf("_next") + 6);
  console.log("reading file", `${process.cwd()}/.next/${path}`);
  const file = await readFile(`${process.cwd()}/.next/${path}`);
  res.end(file);
});

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
