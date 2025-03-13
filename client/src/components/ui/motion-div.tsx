import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, className, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1],
          delay
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

export { MotionDiv };
