import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // Expose the session context at the top level of the app in order to use useSession
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
