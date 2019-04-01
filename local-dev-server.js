/*
 * This is used for local development
 *   to support dynamic routes
 *     ex: /api/npm/*
 *
 *   it will not be deployed
 *
 *   You will need to update the 'paths' array
 *   also see ./components/link-as.js
 *
 * paths :
 * {
 *   route: '/fight/:id',
 *   actualPage: '/fight/show',
 *   queryParams: ['id']
 * },
 *
 * handlers :
 * {
 *   "/fight": require("./handlers/fight").fetchData,
 *   "/fight/:packages": require("./handlers/fight").fetchData
 * }
 *
 */

const paths = [
  {
    route: "/fight/*",
    actualPage: "/fight",
    queryParams: [],
    fetchData: require("./handlers/fight").fetchData,
  },
];

const handlers = {};

const apis = {
  "/api/npm/*": require("./handlers/proxy").fetchData,
};

/*
 * Everything below is boilerplate
 */

const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    for (let { route, actualPage, queryParams, fetchData } of paths) {
      server.get(
        route,
        async (req, res) =>
          (await fetchData(req, res)) ||
          app.render(
            req,
            res,
            actualPage,
            queryParams.reduce(
              (params, param) => ({
                ...params,
                [param]: req.params[param],
              }),
              {},
            ),
          ),
      );
    }

    for (let route of Object.keys(apis)) {
      server.get(route, apis[route]);
    }

    // originalUrl: '/fight',
    // _parsedUrl:
    //  Url {
    //    pathname: '/fight',
    //    path: '/fight',
    //    href: '/fight',
    //    _raw: '/fight' },
    // params: { '0': '/fight' },
    // query: {},

    server.get("*", async (req, res) => {
      if (handlers.hasOwnProperty(req._parsedUrl.pathname)) {
        await handlers[req._parsedUrl.pathname](req, res);
        return app.render(req, res, req._parsedUrl.pathname);
      }
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
