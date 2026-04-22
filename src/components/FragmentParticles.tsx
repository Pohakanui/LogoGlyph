/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface FragmentParticlesProps {
  count?: number;
  sizeScale?: number;
  color?: string;
  speedScale?: number;
  theme?: 'minimal' | 'mystic' | 'technical' | 'organic';
}

export default function FragmentParticles({ 
  count = 12, 
  sizeScale = 1, 
  color = "white", 
  speedScale = 1,
  theme = "technical"
}: FragmentParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-visible">
      {Array.from({ length: count }).map((_, i) => {
        const isDiamond = i % 3 === 0;
        const isFlake = i % 3 === 1;
        
        // Base sizes scaled
        const width = (isFlake ? 3 : 1.5) * sizeScale;
        const height = (isFlake ? 0.5 : 1.5) * sizeScale;
        
        // Durations scaled inversely (higher speedScale = faster/shorter duration)
        const duration = (5 + Math.random() * 8) / speedScale;
        const delay = (Math.random() * 7) / speedScale;
        
        // Random radial outward movement
        const angle = Math.random() * Math.PI * 2;
        const distShort = (10 + Math.random() * 20);
        const distLong = (50 + Math.random() * 150);

        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: isDiamond ? 45 : 0
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0.5],
              x: [Math.cos(angle) * distShort, Math.cos(angle) * distLong],
              y: [Math.sin(angle) * distShort, Math.sin(angle) * distLong],
              rotate: isDiamond ? [45, 225] : [0, 180]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeOut"
            }}
            className="absolute"
            style={{ 
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              boxShadow: theme === 'mystic' ? `0 0 ${6 * sizeScale}px ${color}` : 'none',
              borderRadius: isDiamond ? '0' : (isFlake ? '1px' : '50%'),
              opacity: 0.3
            }}
          />
        );
      })}
    </div>
  );
}
