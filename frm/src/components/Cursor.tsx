import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverElement, setHoverElement] = useState<Element | null>(null);
  const [hoverRect, setHoverRect] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'horizontal' | 'vertical' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const shapeRef = useRef<HTMLDivElement>(null);
  
  const checkIfScrollable = (element: Element): [boolean, 'horizontal' | 'vertical' | null] => {
    if (!element) return [false, null];
    
    const isElementScrollable = (el: Element): [boolean, 'horizontal' | 'vertical' | null] => {
      const style = window.getComputedStyle(el);
      const overflowX = style.getPropertyValue('overflow-x');
      const overflowY = style.getPropertyValue('overflow-y');
      
      if (overflowX === 'auto' || overflowX === 'scroll' || el.classList.contains('portfolio-horizontal-scroll')) {
        if (el.scrollWidth > el.clientWidth) {
          return [true, 'horizontal'];
        }
      }
      
      if (overflowY === 'auto' || overflowY === 'scroll') {
        if (el.scrollHeight > el.clientHeight) {
          return [true, 'vertical'];
        }
      }
      
      return [false, null];
    };
    
    let currentEl: Element | null = element;
    while (currentEl) {
      const [scrollable, direction] = isElementScrollable(currentEl);
      if (scrollable) {
        return [true, direction];
      }
      currentEl = currentEl.parentElement;
    }
    
    return [false, null];
  };
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        
        const isInteractive = 
          element.tagName.toLowerCase() === 'a' || 
          element.tagName.toLowerCase() === 'button' ||
          element.closest('a') || 
          element.closest('button') ||
          element.tagName.toLowerCase() === 'input' ||
          element.tagName.toLowerCase() === 'textarea' ||
          computedStyle.cursor === 'pointer';
        
        const [scrollable, direction] = checkIfScrollable(element);
        setIsScrollable(scrollable);
        setScrollDirection(direction);
        
        if (isInteractive) {
          setIsHovering(true);
          
          const targetElement = 
            element.tagName.toLowerCase() === 'a' || 
            element.tagName.toLowerCase() === 'button' ? 
            element : 
            (element.closest('a') || element.closest('button') || element);
          
          setHoverElement(targetElement);
          
          const rect = targetElement.getBoundingClientRect();
          setHoverRect({
            width: rect.width,
            height: rect.height,
            x: rect.left - 5,
            y: rect.top - 5,
          });
        } else {
          setIsHovering(false);
          setHoverElement(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeout);
    };
  }, [cursorX, cursorY, isVisible]);

  const HorizontalScrollIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L3 12L9 18" stroke="rgba(200, 200, 200, 0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 6L21 12L15 18" stroke="rgba(200, 200, 200, 0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  const VerticalScrollIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 3L18 9" stroke="rgba(200, 200, 200, 0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 15L12 21L18 15" stroke="rgba(200, 200, 200, 0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <motion.div
        className="ipad-cursor"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          x: isHovering && hoverElement ? hoverRect.x : cursorXSpring,
          y: isHovering && hoverElement ? hoverRect.y : cursorYSpring,
          width: isHovering ? hoverRect.width + 10 : isScrollable ? 32 : 16,
          height: isHovering ? hoverRect.height + 10 : isScrollable ? 32 : 16,
          backgroundColor: isHovering 
            ? 'rgba(200, 200, 200, 0.15)' 
            : isScrollable 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(255, 255, 255, 0.15)',
          borderRadius: isHovering 
            ? (hoverRect.height >= 40 ? 12 : hoverRect.height / 2) 
            : 16,
          boxShadow: isHovering || isScrollable 
            ? '0 0 0 1px rgba(255, 255, 255, 0.2)' 
            : 'none',
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
          transition: { duration: 0.2 }
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 500,
          x: { type: 'spring', damping: 25, stiffness: 200 },
          y: { type: 'spring', damping: 25, stiffness: 200 },
          width: { type: 'spring', damping: 30, stiffness: 300 },
          height: { type: 'spring', damping: 30, stiffness: 300 },
          borderRadius: { type: 'spring', damping: 25, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      >
        {!isHovering && isScrollable && scrollDirection === 'horizontal' && (
          <HorizontalScrollIcon />
        )}
        
        {!isHovering && isScrollable && scrollDirection === 'vertical' && (
          <VerticalScrollIcon />
        )}
      </motion.div>
    </>
  );
};

export default Cursor;