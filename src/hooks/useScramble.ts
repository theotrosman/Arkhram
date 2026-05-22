"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useScramble(text: string, options?: { delay?: number; speed?: number; trigger?: boolean }) {
  const { delay = 0, speed = 40, trigger = true } = options ?? {};
  const [output, setOutput] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const startTimeout = setTimeout(() => {
      iterRef.current = 0;

      const step = () => {
        setOutput(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iterRef.current) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iterRef.current += 0.4;

        if (iterRef.current < text.length) {
          frameRef.current = setTimeout(step, 1000 / speed);
        } else {
          setOutput(text);
        }
      };

      step();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, delay, speed, trigger]);

  return output;
}
