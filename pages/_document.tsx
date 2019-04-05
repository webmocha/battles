import * as React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from "next/document";
import { ServerStyleSheet } from "../styles/styled-components";
import { GA_TRACKING_ID } from "../utils/gtag";

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render(): JSX.Element {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Watch your favorite NPM packages go head-to-head in a no holds barred contest to see which framework reigns supreme!"
          />
          <meta
            name="keywords"
            content="JavaScript, Node, Node Modules, NPM, Front-end, Back-end, Frameworks, Packages, Libraries"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.STATIC_LOCATION}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.STATIC_LOCATION}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.STATIC_LOCATION}/favicon-16x16.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.STATIC_LOCATION}/manifest.json`}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700"
            rel="stylesheet"
          />
          {GA_TRACKING_ID && (
            <React.Fragment>
              <script
                async={true}
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
                }}
              />
            </React.Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
