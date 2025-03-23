
import { useGame } from "@/contexts/GameContext";
import { formatBingoNumber } from "@/utils/bingoUtils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NumberDisplay = () => {
  const { currentNumber, previousNumbers, gameStatus, startGame } = useGame();
  
  const numberVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 150,
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.3,
      }
    }
  };
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };
  
  const previousNumberVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Current number */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-2">
          NÚMERO ACTUAL
        </h3>
        
        <div className="w-28 h-28 rounded-full bg-white dark:bg-slate-800 shadow-subtle flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {currentNumber ? (
              <motion.div
                key={currentNumber}
                className="flex flex-col items-center"
                variants={numberVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <span className="text-4xl font-bold">{currentNumber}</span>
                <span className="text-sm text-muted-foreground">
                  {formatBingoNumber(currentNumber).split('-')[0]}
                </span>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center"
                variants={numberVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {gameStatus === "waiting" ? (
                  <Button 
                    onClick={startGame}
                    variant="outline"
                    className="rounded-full px-4 py-2 font-medium"
                  >
                    Iniciar Juego
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground px-4 py-2">
                    {gameStatus === "betting" ? "Esperando apuestas..." : "Juego finalizado"}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Previous numbers */}
      <div className="w-full">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-2">
          NÚMEROS ANTERIORES
        </h3>
        
        <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-subtle p-4">
          {previousNumbers.length > 0 ? (
            <motion.div 
              className="flex flex-wrap gap-2 justify-center"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {previousNumbers.slice().reverse().map((number, index) => (
                <motion.span
                  key={number}
                  className={cn(
                    "inline-block w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border",
                    index === 0 ? "bg-primary text-white border-primary" : "bg-secondary border-border"
                  )}
                  variants={previousNumberVariants}
                  layout
                >
                  {number}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay números sorteados aún
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberDisplay;
