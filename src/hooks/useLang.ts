"use client";
import { useState, useEffect } from "react";

export type Lang = "es" | "en";

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const l = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
    setLang(l.startsWith("es") ? "es" : "en");
  }, []);
  return lang;
}
