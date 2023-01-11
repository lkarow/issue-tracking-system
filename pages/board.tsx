import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavbarView from "../components/NavbarView";
import BoardView from "../components/BoardView";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Issue Tracking System</title>
        <meta name="description" content="Issue Tracking System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarView />

      <main className={styles.main}>
        <BoardView />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
