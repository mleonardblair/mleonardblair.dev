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
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        color: currentTheme === 'dark' ? 'white' : 'black',
        backgroundColor: currentTheme === 'dark' ? 'black' : 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '50%',
      }}
    >
      {currentTheme === 'dark' ? (
        // Sun SVG for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          fill="currentColor"
          style={{ width: '24px', height: '24px' }}
        >
          <g clipPath="url(#clip0_1308_4725)">
            <path
              d="M12.7531 5.5V1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.9801 7.47698L4.7981 4.29498"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.00305 12.25H1.50305"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.9801 17.023L4.7981 20.205"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.7531 19V23.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.526 17.023L20.708 20.205"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.5031 12.25H24.0031"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.526 7.47698L20.708 4.29498"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.00305 12.25C6.00305 14.0402 6.71421 15.7571 7.98008 17.023C9.24595 18.2888 10.9628 19 12.7531 19C14.5433 19 16.2602 18.2888 17.526 17.023C18.7919 15.7571 19.5031 14.0402 19.5031 12.25C19.5031 10.4598 18.7919 8.7429 17.526 7.47703C16.2602 6.21116 14.5433 5.5 12.7531 5.5C10.9628 5.5 9.24595 6.21116 7.98008 7.47703C6.71421 8.7429 6.00305 10.4598 6.00305 12.25Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.503 15.25C15.3993 15.2497 14.3125 14.9788 13.3377 14.461C12.3629 13.9433 11.5299 13.1945 10.9117 12.2802C10.2934 11.3658 9.90872 10.3139 9.79128 9.21642C9.67384 8.11895 9.82723 7.00943 10.238 5.98499C9.20191 6.4009 8.28513 7.06729 7.56977 7.92448C6.85441 8.78167 6.36281 9.8029 6.139 10.8967C5.91518 11.9905 5.96614 13.1228 6.2873 14.192C6.60846 15.2613 7.18981 16.2343 7.97928 17.0237C8.76874 17.8132 9.74168 18.3945 10.811 18.7157C11.8802 19.0369 13.0125 19.0878 14.1063 18.864C15.2001 18.6402 16.2213 18.1486 17.0785 17.4332C17.9357 16.7179 18.6021 15.8011 19.018 14.765C18.2186 15.0865 17.3647 15.2512 16.503 15.25Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1308_4725">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.753052 0.25)"
              />
            </clipPath>
          </defs>
        </svg>
      ) : (
        // Moon SVG for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="currentColor"
          style={{ width: '24px', height: '24px' }}
        >
          <path d="M32,53A21,21,0,0,1,12.24,39.11a1,1,0,0,1,1.11-1.33,15.54,15.54,0,0,0,3.93.17A16.08,16.08,0,0,0,32,22q0-.64-.06-1.29a16,16,0,0,0-2.93-8,1,1,0,0,1-.1-1,1,1,0,0,1,.8-.58A19,19,0,0,1,32,11a21,21,0,1,1,0,42ZM14.75,40A19,19,0,1,0,31.59,13,18,18,0,0,1,34,20.56c0,.48.06,1,.06,1.46A18.1,18.1,0,0,1,17.44,40,18.59,18.59,0,0,1,14.75,40Z" />
          <path d="M25,21a1,1,0,0,1-1-1V16a1,1,0,0,1,2,0v4A1,1,0,0,1,25,21Z" />
          <path d="M27,19H23a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" />
          <path d="M20,30H16a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z" />
          <path d="M18,32a1,1,0,0,1-1-1V27a1,1,0,0,1,2,0v4A1,1,0,0,1,18,32Z" />
          <path d="M12,23.24a1,1,0,0,1-.71-.29L7.05,18.71a1,1,0,0,1,0-1.42l4.24-4.24a1,1,0,0,1,1.42,0L17,17.29a1,1,0,0,1,0,1.42L12.71,23A1,1,0,0,1,12,23.24Z" />
          <rect
            x="10"
            y="16"
            width="4"
            height="4"
            transform="translate(-9.21 13.76) rotate(-45)"
          />
        </svg>
      )}
    </button>
  );
}