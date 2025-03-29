import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Golden Retriever Pup',
    category: 'Puppies',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Adorable golden retriever puppy playing in the grass with a favorite toy.',
  },
  {
    id: 2,
    title: 'Beach Running',
    category: 'Active',
    image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Energetic dog enjoying a run along the shoreline at sunset.',
  },
  {
    id: 3,
    title: 'Husky Portrait',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Majestic husky with piercing blue eyes in a snowy landscape.',
  },
  {
    id: 4,
    title: 'Sleepy Pug',
    category: 'Relaxing',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Cute pug taking a cozy nap wrapped in a soft blanket.',
  },
  {
    id: 5,
    title: 'Border Collie Agility',
    category: 'Active',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Highly trained border collie demonstrating impressive agility skills.',
  },
  {
    id: 6,
    title: 'Family Time',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Loyal dog enjoying quality time with its loving family.',
  },
];

const categories = ['All', 'Puppies', 'Active', 'Portraits', 'Relaxing'];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <section id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Dog Gallery</h2>
          <p>Explore our collection of heartwarming and adorable dog photos</p>
        </motion.div>
        
        <motion.div 
          className="portfolio-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="btn-underline"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className="portfolio-horizontal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="portfolio-horizontal-scroll"
            ref={scrollRef}
            drag="x"
            dragConstraints={{ right: 0, left: -(filteredProjects.length * 400 - window.innerWidth + 80) }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map(project => (
                <motion.div
                  className="project-card-large"
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -20, scale: 1.02 }}
                >
                  <div className="project-image-large">
                    <img src={project.image} alt={project.title} />
                    <motion.div 
                      className="project-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>View Photo</span>
                    </motion.div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                    <p className="project-description">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="scroll-instruction">
            <motion.p
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Drag to explore more →
            </motion.p>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                layoutId={`project-${selectedProject.id}`}
                className="project-modal"
                onClick={e => e.stopPropagation()}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <motion.img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                />
                <motion.div className="project-modal-content">
                  <motion.h3>{selectedProject.title}</motion.h3>
                  <motion.span className="project-category">{selectedProject.category}</motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProject.description}
                  </motion.p>
                  <motion.button
                    className="btn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 