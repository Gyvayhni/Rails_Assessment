
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task Board App" />
        {/* Dynamically load Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Welcome to the Task Board App</h1>
          <p>
            Go to the{" "}
            <Link href="/taskboard">
              Task Board
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}
