import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '🐕',
    title: 'Golden Retriever',
    description: 'Friendly, intelligent dogs known for their loyalty and playful nature.',
  },
  {
    icon: '🦮',
    title: 'German Shepherd',
    description: 'Courageous and confident working dogs with exceptional intelligence.',
  },
  {
    icon: '🐩',
    title: 'Poodle',
    description: 'Highly intelligent and elegant dogs that come in three size varieties.',
  },
  {
    icon: '🐕‍🦺',
    title: 'Labrador Retriever',
    description: 'Outgoing, even-tempered dogs that make excellent family companions.',
  },
  {
    icon: '🦴',
    title: 'Nutritional Care',
    description: 'Tips for providing the best nutrition for your dog at every life stage.',
  },
  {
    icon: '🏃‍♂️',
    title: 'Exercise Needs',
    description: 'Keeping your dog healthy with the right amount and type of exercise.',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
      }
    },
  };

  return (
    <section id="features" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Popular Breeds & Care</h2>
          <p>Discover some of the most beloved dog breeds and essential care information</p>
        </motion.div>
        
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ 
                  rotate: [0, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 