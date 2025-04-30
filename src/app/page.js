import Image from "next/image";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <section style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>{"Under Construction"}</h1>

      <p>{"Welcome to the future home of M Leonard Blair's website."}</p>
      <p>{"Please check back soon for updates!"}</p>
    </section>
      <Footer></Footer>
    </div>
  );
}
