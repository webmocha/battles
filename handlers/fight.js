const proxyApi = require("./proxy").api;
const { format, subDays } = require("date-fns");

const fetchData = async (req, res) => {
  const packages = req.url.replace("/fight/", "");
  const twoDaysBefore = format(subDays(new Date(), 2), "YYYY-MM-DD");
  const oneDayBefore = format(subDays(new Date(), 1), "YYYY-MM-DD");
  const responses = await Promise.all(
    packages
      .split(",")
      .map((p) =>
        proxyApi(
          `/api/npm/downloads/range/${twoDaysBefore}:${oneDayBefore}/${p}`,
        ),
      ),
  );

  res.data = responses
    .filter((r) => r.status === 200)
    .map((r) => JSON.parse(r.payload))
    .reduce(
      (packages, p) => ({
        ...packages,
        [p.package]: p,
      }),
      {},
    );
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
    await fetchData(req, res);
    page.render(req, res, "/fight");
  });

  awsServerlessExpress.proxy(server, event, context);
};
