// src/components/Footer.jsx
import styles from "./Footer.module.css";  // <- This is how you import CSS specific to this component

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} M Leonard Blair. All rights reserved.</p>
    </footer>
  );
}
