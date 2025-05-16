import React from 'react';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IconWithGradient = ({ icon }) => {
  // Generate a unique ID for each gradient to avoid conflicts
  const gradientId = `hoverGradient-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <motion.div className="cursor-pointer">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6a00" />
            <stop offset="100%" stopColor="#ee0979" />
          </linearGradient>
        </defs>
        <motion.g 
          fill="currentColor"
          whileHover={{ fill: `url(#${gradientId})` }}
        >
          <foreignObject width="30" height="30" x="0" y="0">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: "inherit", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FontAwesomeIcon icon={icon} style={{ width: "100%", height: "100%" }} />
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default IconWithGradient;