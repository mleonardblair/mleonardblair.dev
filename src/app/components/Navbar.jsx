// src/components/Navbar.jsx

import styles from "./Navbar.module.css";  
import DarkModeToggle from './DarkModeToggle';
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img
        src="/navImage.jpeg"
        alt="My headshot"
        className={styles.responsiveImage}
      />
      <ul className={styles.navLinks}>
        <li><a className={styles.link} href="#">Home</a></li>
      </ul>
    <DarkModeToggle />
    </nav>
  );
}
