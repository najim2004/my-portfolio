"use client";

import { JSX, useEffect, useState } from "react";
import { motion, useScroll, MotionStyle } from "framer-motion";

interface ScrollProgressProps {
  threshold?: number;
}

export default function ScrollProgress({
  threshold = 100,
}: ScrollProgressProps): JSX.Element | null {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  if (!isVisible) return null;

  const progressStyle: MotionStyle = {
    scaleX: scrollYProgress,
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-[60] origin-left"
      style={progressStyle}
    />
  );
}
