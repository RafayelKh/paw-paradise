import { ReactNode, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ['start start', 'end end']
  });
  
  const smoothY = useSpring(scrollYProgress, { 
    damping: 50,
    stiffness: 400,
  });
  
  const y = useTransform(smoothY, [0, 1], ['0%', '0%']);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SmoothScroll; 