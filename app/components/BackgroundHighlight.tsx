import type { MouseEvent, ReactNode } from "react";
import { cn } from "../lib/utils";
import { motion, useMotionTemplate, useSpring } from "motion/react";
import { useTimeout } from "../hooks/useTimeout";
import { useMeasure } from "../hooks/useMeasure";

export const BackgroundHighlight = ({
  className,
  children,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const { placeTimeout } = useTimeout(1000);

  const percentage = useSpring(0, { bounce: 0.2 });
  const {
    ref,
    state: { left, width },
  } = useMeasure();

  const handleMouseEnter = (event: MouseEvent<HTMLSpanElement>) => {
    const { clientX } = event;
    const p = (clientX - left) / width;
    percentage.set(p * 100);
  };
  const backgroundSize = useMotionTemplate`${percentage}% 100%`;

  const handleMouseLeave = () => {
    placeTimeout(() => percentage.set(100));
  };

  return (
    <motion.span
      ref={ref}
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ delay: 1 }}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize,
      }}
      className={cn("bg-gradient-to-l rounded px-1", className)}
      id="container"
    >
      {children}
    </motion.span>
  );
};
