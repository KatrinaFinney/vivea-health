// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
