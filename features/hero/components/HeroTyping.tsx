"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const roles = [
  "Frontend Developer",
  "UI/UX Specialist",
  "React Engineer",
  "Next.js Architect",
  "Creative Developer",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

export default function HeroTyping() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setTimeout(
          () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
          TYPING_SPEED
        );
      } else {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayText.length > 0) {
        setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          DELETING_SPEED
        );
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTimeout(() => {}, PAUSE_AFTER_DELETE);
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(tick, 10);
    return () => clearTimeout(timer);
  }, [tick]);

  return (
    <span className="inline-flex items-center">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-medium">
        {displayText}
      </span>
      <motion.span
        className="inline-block w-[2px] h-[1.1em] bg-cyan-400 ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}
