"use client";
import { useEffect, useState, useRef } from 'react';
import styles from './HeroText.module.css';

export default function HeroText() {
  const mainText = ".NET and React/Next.js";
  const secondText = " Developer ";

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('main');
  const isEdgeRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") !== -1) {
      isEdgeRef.current = true;
      console.log("Microsoft Edge detected - applying Edge-specific optimizations for typewriter effect");
    }
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;
    const typingInterval = isEdgeRef.current ? 120 : 75; // ms between characters
    
    if (isEdgeRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if ((phase === 'main' && index < mainText.length) || 
          (phase === 'second' && index < secondText.length)) {
        
        timeoutRef.current = setTimeout(() => {
          if (phase === 'main' && index < mainText.length) {
            setDisplayedText(prev => prev + mainText[index]);
            setIndex(prev => prev + 1);
          } else if (phase === 'main') {
            setPhase('second');
            setIndex(0);
          } else if (phase === 'second' && index < secondText.length) {
            setDisplayedText(prev => prev + secondText[index]);
            setIndex(prev => prev + 1);
          }
        }, typingInterval);
      }
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      const animate = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        
        if (elapsed >= typingInterval) {
          lastTime = timestamp;
          
          if (phase === 'main' && index < mainText.length) {
            setDisplayedText(prev => prev + mainText[index]);
            setIndex(prev => prev + 1);
          } else if (phase === 'main') {
            setPhase('second');
            setIndex(0);
          } else if (phase === 'second' && index < secondText.length) {
            setDisplayedText(prev => prev + secondText[index]);
            setIndex(prev => prev + 1);
          }
        }
        
        if ((phase === 'main' && index < mainText.length) || 
            (phase === 'second' && index < secondText.length)) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      
      animationFrameId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [index, phase, mainText, secondText, isEdgeRef]);

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
