import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const words = "Dog Lovers Paradise".split(" ");

  return (
    <section id="home" ref={ref}>
      <motion.div
        className="hero-content container"
        style={{ y, opacity }}
      >
        <div className="hero-text">
          <div className="title-wrapper">
            {words.map((word, i) => (
              <motion.h1
                key={i}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
                className="hero-title"
              >
                {word}
              </motion.h1>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-subtitle"
          >
            Discover everything about our loyal companions - from care tips to heartwarming stories.
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#features" className="btn">
              Explore Breeds
            </a>
            <a href="#portfolio" className="btn btn-outline">
              Dog Gallery
            </a>
          </motion.div>
        </div>
        
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="floating-shapes">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className={`shape shape-${i + 1}`}
                initial={{ x: 0, y: 0 }}
                animate={{
                  x: Math.sin(i * 45) * 15,
                  y: Math.cos(i * 45) * 15,
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3 + i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <div className="hero-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                fill="#7743DB"
                d="M45.5,-57.1C59.9,-49.9,73.5,-37.8,77.9,-22.8C82.4,-7.8,77.8,10.2,69.7,25.3C61.7,40.4,50.1,52.5,36.4,58.5C22.6,64.5,6.7,64.3,-8.2,61.2C-23.2,58.1,-37.2,52.1,-50.9,42.5C-64.6,32.9,-77.9,19.7,-80.1,4.5C-82.4,-10.7,-73.5,-27.9,-61.1,-39.5C-48.6,-51.1,-32.5,-57.2,-17.3,-63C-2.1,-68.8,12.3,-74.3,26.2,-71.4C40.1,-68.5,53.5,-57.2,66.9,-45.9"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;