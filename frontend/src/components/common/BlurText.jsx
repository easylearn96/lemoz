import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BlurText = ({
  text = '',
  className = '',
  variant = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: -20 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
  },
  duration = 0.4,
  delayStep = 0.05,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const letters = Array.from(text);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: delayStep },
    },
  };

  const child = {
    hidden: variant.hidden,
    visible: {
      ...variant.visible,
      transition: { duration },
    },
  };

  return (
    <motion.h2
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default BlurText;
