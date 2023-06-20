import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://api.liveto.io/api/v1/dropshop/5794803d-3f88-4f23-8ee7-5a26b42ca5bf.js"
        />
      </Head>
      <body>
        <Main />
        <div id="portal1" />
        <div id="portal2" />
        <NextScript />
      </body>
    </Html>
  );
}
