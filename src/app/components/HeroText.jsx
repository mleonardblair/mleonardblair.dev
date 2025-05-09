"use client";
import { useEffect, useState } from 'react';
import styles from './HeroText.module.css';

export default function HeroText() {
  const mainText = "Java and React/Next.js";
  const secondText = " Developer";

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('main');

  useEffect(() => {
    let timeout;

    if (phase === 'main' && index < mainText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + mainText[index]);
        setIndex(prev => prev + 1);
      }, 75);
    } else if (phase === 'main') {
      setPhase('second');
      setIndex(0);
    } else if (phase === 'second' && index < secondText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + secondText[index]);
        setIndex(prev => prev + 1);
      }, 75);
    }

    return () => clearTimeout(timeout);
  }, [index, phase]);

  // Split the output into two parts so we can style 'Developer'
  const fullOutput = displayedText;
  const splitPoint = mainText.length;
  const mainPart = fullOutput.slice(0, splitPoint);
  const developerPart = fullOutput.slice(splitPoint); // ' Developer' in color

  return (
    <h1
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        minWidth: "38ch",
        whiteSpace: "nowrap",
      }}
    >
      {mainPart}
      <span style={{ color: 'var(--accent-color)' }}>{developerPart}</span>
      <span className={styles.blink}>|</span>
    </h1>
  );
}
