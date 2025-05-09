"use client";
import { useEffect, useState } from 'react';
import styles from './HeroText.module.css';

export default function HeroText() {
  const mainText = ".NET and React/Next.js";
  const secondText = " Developer ";

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('main');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setTypingComplete(true);
    setDisplayedText(mainText + secondText);
  }, []);

  // Split the output into two parts so we can style 'Developer'
  const fullOutput = displayedText;
  const splitPoint = mainText.length;
  const mainPart = fullOutput.slice(0, splitPoint);
  const developerPart = fullOutput.slice(splitPoint); // ' Developer' in color

  const fullMainText = ".NET and React/Next.js";
  const fullSecondText = " Developer ";
  
  return (
    <div className="w-full">
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
        className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1"
      >
        <div className="whitespace-nowrap">
          {typingComplete ? fullMainText : mainPart}
        </div>
        <div className="whitespace-nowrap text-[var(--accent-color)]">
          {typingComplete ? fullSecondText : developerPart}
          <span className={styles.blink}>|</span>
        </div>
      </h1>
    </div>
  );
}
