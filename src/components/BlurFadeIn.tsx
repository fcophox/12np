"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
}

/**
 * BlurFadeIn — wraps children in a Framer Motion scroll-triggered
 * blur + fade + slide-up entrance animation.
 *
 * Props:
 *  delay    — animation delay in seconds (default 0)
 *  duration — animation duration in seconds (default 0.7)
 *  yOffset  — vertical offset to start from in px (default 24)
 *  once     — only animate once when entering viewport (default true)
 */
export default function BlurFadeIn({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  className,
  once = true,
}: BlurFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
