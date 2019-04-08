const { basename, relative, join } = require("path");
const awsServerlessExpress = require("aws-serverless-express");
const { subdir, pathToNext } = ((cwd, dir) => ({
  subdir: relative(cwd, dir).replace("handlers", ""),
  pathToNext: join(relative(dir, cwd), ".next"),
}))(process.cwd(), __dirname);
const page = require(`${pathToNext}/serverless/pages/${join(
  subdir,
  basename(__filename),
)}`);

const server = awsServerlessExpress.createServer(page.render);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
