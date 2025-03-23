
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const BettingPanel = () => {
  const { 
    gameStatus, 
    betAmount, 
    setBetAmount,
    placeBet,
    isConnected,
    balance
  } = useGame();
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  // Betting timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStatus === "betting") {
      // Set initial time to 2 minutes (120 seconds)
      setTimeLeft(120);
      
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === null || prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(null);
    }
    
    return () => clearInterval(interval);
  }, [gameStatus]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {gameStatus === "betting" && (
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
              Período de Apuestas
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <Timer className="w-4 h-4 text-destructive animate-pulse-soft" />
              <span className={cn(
                "font-mono",
                (timeLeft !== null && timeLeft <= 30) && "text-destructive font-bold"
              )}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Bet amount slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cantidad:</span>
                <span className="font-bold">{betAmount.toFixed(1)} TON</span>
              </div>
              
              <Slider
                value={[betAmount * 10]}
                min={1}
                max={20}
                step={1}
                onValueChange={(v) => setBetAmount(v[0] / 10)}
                disabled={!isConnected || gameStatus !== "betting"}
                className="py-2"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Min: 0.1 TON</span>
                <span>Max: 2 TON</span>
              </div>
            </div>
            
            {/* Bet button */}
            <Button
              onClick={placeBet}
              disabled={!isConnected || gameStatus !== "betting" || betAmount > balance}
              className={cn(
                "ton-button w-full",
                (!isConnected || gameStatus !== "betting" || betAmount > balance) && 
                "opacity-50 cursor-not-allowed"
              )}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              {!isConnected 
                ? "Conecta tu billetera" 
                : betAmount > balance 
                ? "Balance insuficiente" 
                : "Realizar Apuesta"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BettingPanel;
