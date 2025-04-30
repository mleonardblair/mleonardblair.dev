// src/components/Navbar.jsx

import styles from "./Navbar.module.css";  
import DarkModeToggle from './DarkModeToggle';
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1>My Website</h1>
      <ul className={styles.navLinks}>
        <li><a className={styles.link} href="/">Home</a></li>
        <li><a className={styles.link} href="/resume">Resume</a></li>
        <li><a className={styles.link} href="/blog">Blog</a></li>
      </ul>
    <DarkModeToggle />
    </nav>
  );
}
