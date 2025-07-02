
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Welcome to Firebase Notes App</title>
        <meta name="description" content="A simple notes app with Firebase and Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landing-container">
        <div className="landing-content">
          <h1>📝 Firebase Notes App</h1>
          <p className="subtitle">A simple, fast, and secure way to keep your notes online.</p>
          <div className="landing-actions">
            <button className="primary-btn" onClick={() => router.push("/login")}>Login</button>
            <button className="secondary-btn" onClick={() => router.push("/signup")}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
}
