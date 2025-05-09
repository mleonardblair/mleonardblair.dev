
"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styles from "./home.module.css";
import HeroText from "./components/HeroText";
import CanvasBackground from "./components/CanvasBackground";
export default function Home() {
  const text = "I am a software engineer with a passion for building web applications. I have experience in various programming languages and frameworks, and I am looking for part-time and internship opportunities to further develop my skills. I am particularly interested in front-end development and have a strong foundation in HTML, CSS, and JavaScript. I am also familiar with React and have worked on several projects using this framework. I am eager to learn and grow as a developer, and I am excited about the possibility of contributing to a team while gaining valuable experience.";
  return (
    <div>
      <Navbar></Navbar>
    <main className={styles.container}>
    <CanvasBackground
      lineSpacing={40}
      lineThickness={0.75}
      particleSpeed={2}
      particlesPerLine={1}
      trailLength={80}
      curveAmount={0}
    />
<section id="hero" className="min-h-screen flex items-center justify-center px-6">
  <div className="flex flex-wrap items-center justify-center gap-24 w-full max-w-8xl">

    {/* LEFT COLUMN - TEXT */}
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-2xl min-h-[280px]">
      <h1 className="text-sm text-[var(--foreground)] mb-4">
        Hi, I&apos;m M. Leonard, a passionate software student.
      </h1>
      <HeroText />
      <div className="flex gap-4 mt-6 flex-wrap justify-center md:justify-start">
        <button
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1KwuzyiMzYyZhIqzlbHTDYX_0JB7yeYLQ/view?usp=sharing",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="px-6 py-3 bg-[var(--surface)] text-[var(--foreground)] border border-transparent rounded-2xl shadow hover:bg-[var(--background)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition cursor-pointer"
        >
          Download CV
        </button>
        <button
          onClick={() =>
            window.open("https://github.com/mleonardblair", "_blank", "noopener,noreferrer")
          }
          className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] border border-transparent rounded-2xl shadow hover:bg-[var(--background)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition cursor-pointer"
        >
          Visit Github
        </button>
      </div>
    </div>

    {/* RIGHT COLUMN - IMAGE */}
    <div className="w-64 h-64 flex-shrink-0">
      <img
        src="/me.png"
        alt="Your face"
        className="w-full h-full object-cover rounded-full shadow-lg"
      />
    </div>

  </div>
</section>



    </main>
      
      <Footer></Footer>
    </div>
  );
}
