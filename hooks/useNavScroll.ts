"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const SCROLL_THRESHOLD = 10;
const TOP_THRESHOLD = 80;

export function useNavScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsAtTop(scrollY < TOP_THRESHOLD);

    if (scrollY < TOP_THRESHOLD) {
      setIsVisible(true);
    } else if (scrollY - lastScrollY.current > SCROLL_THRESHOLD) {
      setIsVisible(false);
    } else if (lastScrollY.current - scrollY > SCROLL_THRESHOLD) {
      setIsVisible(true);
    }

    lastScrollY.current = scrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return { isVisible, isAtTop, scrollProgress };
}
