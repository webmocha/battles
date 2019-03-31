const proxyApi = require("./proxy").api;
const { format, subDays } = require("date-fns");

const fetchData = async (req, res) => {
  const { packages } = req.params;
  const twoDaysBefore = format(subDays(new Date(), 2), "YYYY-MM-DD");
  const oneDayBefore = format(subDays(new Date(), 1), "YYYY-MM-DD");
  const url = `/api/npm/downloads/range/${twoDaysBefore}:${oneDayBefore}/${packages}`;

  res.data = await proxyApi(url);
};

exports.fetchData = fetchData;

exports.handler = (event, context) => {
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

  const server = awsServerlessExpress.createServer(async (req, res) => {
    const queryParams = {
      packages: req.originalUrl.replace("/fight/", ""),
    };
    req.params = queryParams;
    await fetchData(req, res);
    page.render(req, res, "/fight", queryParams);
  });

  awsServerlessExpress.proxy(server, event, context);
};
