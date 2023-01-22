import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { Nunito } from "@next/font/google";

const nuntio = Nunito({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // Expose the session context at the top level of the app in order to use useSession
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${nuntio.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
