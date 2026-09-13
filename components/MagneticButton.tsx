"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsFinePointer, usePrefersReducedMotion } from "@/lib/motion";

// Subtle magnetic pull for primary CTAs — disabled on touch devices and
// when the user prefers reduced motion, so it never fights the user.
export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  onClick,
  strength = 18,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const isFinePointer = useIsFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
