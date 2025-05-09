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
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") !== -1) {
      isEdgeRef.current = true;
      console.log("Microsoft Edge detected - applying Edge-specific optimizations for typewriter effect");
    }
    
    startTypewriter();
    
    return () => {
      if (isEdgeRef.current && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      } else if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);
  
  const startTypewriter = () => {
    let currentText = '';
    let currentIndex = 0;
    let currentPhase = 'main';
    
    setDisplayedText('');
    setIndex(0);
    setPhase('main');
    
    if (isEdgeRef.current) {
      const typeNextCharacter = () => {
        if (currentPhase === 'main' && currentIndex < mainText.length) {
          currentText += mainText[currentIndex];
          setDisplayedText(currentText);
          currentIndex++;
          setIndex(currentIndex);
          timeoutRef.current = setTimeout(typeNextCharacter, 120); // Slower for Edge
        } else if (currentPhase === 'main') {
          currentPhase = 'second';
          setPhase('second');
          currentIndex = 0;
          setIndex(0);
          timeoutRef.current = setTimeout(typeNextCharacter, 120);
        } else if (currentPhase === 'second' && currentIndex < secondText.length) {
          currentText += secondText[currentIndex];
          setDisplayedText(currentText);
          currentIndex++;
          setIndex(currentIndex);
          timeoutRef.current = setTimeout(typeNextCharacter, 120);
        }
      };
      
      timeoutRef.current = setTimeout(typeNextCharacter, 120);
    } 
    else {
      let lastTime = 0;
      const typingInterval = 75; // ms between characters
      
      const animate = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        
        if (elapsed >= typingInterval) {
          lastTime = timestamp;
          
          if (currentPhase === 'main' && currentIndex < mainText.length) {
            currentText += mainText[currentIndex];
            setDisplayedText(currentText);
            currentIndex++;
            setIndex(currentIndex);
          } else if (currentPhase === 'main') {
            currentPhase = 'second';
            setPhase('second');
            currentIndex = 0;
            setIndex(0);
          } else if (currentPhase === 'second' && currentIndex < secondText.length) {
            currentText += secondText[currentIndex];
            setDisplayedText(currentText);
            currentIndex++;
            setIndex(currentIndex);
          }
        }
        
        if ((currentPhase === 'main' && currentIndex < mainText.length) || 
            (currentPhase === 'second' && currentIndex < secondText.length)) {
          animationFrameIdRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }
  };

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
