"use client";
import { useState, useEffect } from "react";

export default function useTypewriter(text, speed = 50, active = true) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplay((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);

  return display;
}
