
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const BingoCard = () => {
  const { bingoCard } = useGame();
  
  const letterVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const cellVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5 + (i * 0.02),
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    selected: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      {/* BINGO header */}
      <div className="flex justify-center w-full mb-4">
        {['S', 'T', 'A', 'R', 'S'].map((letter, index) => (
          <motion.div
            key={letter + index}
            className={cn(
              "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-3xl font-bold rounded-lg m-1",
              index === 0 && "bg-red-600 text-white",
              index === 1 && "bg-yellow-500 text-white",
              index === 2 && "bg-red-500 text-white",
              index === 3 && "bg-yellow-600 text-white",
              index === 4 && "bg-red-700 text-white"
            )}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            custom={index}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
      
      {/* Card grid */}
      <div className="grid grid-cols-5 gap-2">
        {bingoCard.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "bingo-cell",
                cell.selected && "bingo-cell-selected"
              )}
              variants={cellVariants}
              initial="initial"
              animate="animate"
              custom={rowIndex * 5 + colIndex}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...(cell.selected && { animate: "selected" })}
            >
              {rowIndex === 2 && colIndex === 2 ? (
                <div className="relative">
                  <span className="text-lg uppercase text-yellow-400 font-bold">FREE</span>
                  <motion.div
                    className="absolute -top-3 -right-3"
                    animate={{ 
                      rotate: 360,
                      transition: { duration: 3, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </div>
              ) : (
                cell.value
              )}
            </motion.div>
          ))
        )}
      </div>
      
      {/* Casino decorations */}
      <motion.div 
        className="absolute top-10 left-10 opacity-50 hidden lg:block"
        animate={{ 
          rotate: 360,
          transition: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
      >
        <Star className="w-16 h-16 text-red-500/20" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-40 opacity-50 hidden lg:block"
        animate={{ 
          rotate: -360,
          transition: { duration: 15, repeat: Infinity, ease: "linear" }
        }}
      >
        <Star className="w-24 h-24 text-yellow-500/20" />
      </motion.div>
    </div>
  );
};

export default BingoCard;
