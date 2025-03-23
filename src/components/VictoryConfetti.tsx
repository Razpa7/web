
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

interface VictoryConfettiProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const VictoryConfetti = ({ isVisible, onComplete }: VictoryConfettiProps) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      
      // Hide confetti after 6 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
        if (onComplete) onComplete();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);
  
  return (
    <AnimatePresence>
      {showConfetti && (
        <>
          <Confetti 
            width={width} 
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
            colors={['#ff4136', '#ffdc00', '#ffd700', '#ff851b', '#ff0000']}
            confettiSource={{
              x: width / 2,
              y: height / 2,
              w: 0,
              h: 0
            }}
          />
          
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.5 }
                }}
              >
                <Trophy className="w-24 h-24 text-yellow-400 mb-4" />
              </motion.div>
              
              <div className="relative">
                <motion.div
                  className="text-8xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: 3,
                      duration: 1
                    }
                  }}
                >
                  ¡VICTORIA!
                </motion.div>
                
                {/* Decorative stars */}
                <motion.div
                  className="absolute -top-10 -left-10"
                  animate={{ 
                    rotate: 360,
                    transition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <Star className="w-8 h-8 text-yellow-400" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-10 -right-10"
                  animate={{ 
                    rotate: 360,
                    transition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <Star className="w-8 h-8 text-yellow-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VictoryConfetti;
