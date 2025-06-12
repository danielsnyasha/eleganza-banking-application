import Navbar from "@/components/landing-page/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <h1 style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        Welcome to MyApp
      </h1>
      <a href="/sign-in">Login</a>
      <a href="/about">About</a>
    </main>
  );
}
