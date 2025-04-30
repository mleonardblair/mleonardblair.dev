'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    // Always flip based on what we know the *effective* theme is
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 0.5rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        border: currentTheme === 'dark' ? '1px solid white' : '1px solid black',
        backgroundColor: currentTheme === 'dark' ? 'var(--surface)' : 'var(--surface)',
        color: currentTheme === 'dark' ? 'var(--foreground)' : 'var(--foreground)',
      }}
    >
      {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
