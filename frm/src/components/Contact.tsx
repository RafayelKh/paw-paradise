import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 1500);
  };
  
  const inputVariants = {
    focused: { 
      boxShadow: '0 0 0 2px rgba(119, 67, 219, 0.4)',
      y: -2,
    },
    idle: { 
      boxShadow: '0 0 0 0px rgba(119, 67, 219, 0)',
      y: 0,
    },
  };
  
  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Adopt a Furry Friend</h2>
          <p>Interested in adopting a dog or have questions about pet care? Contact us!</p>
        </motion.div>
        
        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Adoption Information</h3>
            <p>Fill out the form or contact our shelter directly using the information below.</p>
            
            <div className="contact-details">
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="contact-icon">🏠</div>
                <div>
                  <h4>Shelter Address</h4>
                  <p>123 Paw Street, Dogville</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>adopt@pawparadise.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="contact-icon">📱</div>
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-DOGS</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <motion.input
                  type="text"
                  placeholder="Your Name"
                  required
                  initial="idle"
                  whileFocus="focused"
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="form-group">
                <motion.input
                  type="email"
                  placeholder="Your Email"
                  required
                  initial="idle"
                  whileFocus="focused"
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <div className="form-group">
                <motion.textarea
                  placeholder="Your Message - Tell us about your living situation and experience with dogs"
                  rows={5}
                  required
                  initial="idle"
                  whileFocus="focused"
                  variants={inputVariants}
                  transition={{ duration: 0.2 }}
                />
              </div>
              
              <motion.button
                className="btn btn-secondary"
                type="submit"
                disabled={formStatus === 'submitting'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {formStatus === 'idle' && 'Submit Adoption Request'}
                {formStatus === 'submitting' && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    ⏳
                  </motion.span>
                )}
                {formStatus === 'success' && '✅ Request Submitted!'}
                {formStatus === 'error' && '❌ Please try again'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 