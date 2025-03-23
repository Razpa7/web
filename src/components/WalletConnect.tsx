
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Wallet, 
  Coins, 
  DollarSign 
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WalletConnect = () => {
  const { 
    isConnected, 
    connectWallet, 
    balance, 
    betAmount, 
    setBetAmount, 
    placeBet, 
    gameStatus, 
    potAmount 
  } = useGame();
  
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
      className="w-full space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="glass-card p-5 space-y-4 bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
        <h3 className="text-sm uppercase tracking-wider text-red-400 font-medium mb-2">
          Apuestas en TON
        </h3>
        
        {isConnected ? (
          <div className="space-y-4">
            {/* Wallet info */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 dark:bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-ton" />
                <span className="font-medium">Balance:</span>
              </div>
              <div className="font-bold text-ton">{balance.toFixed(2)} TON</div>
            </div>
            
            {/* Place bet */}
            <div className="space-y-3">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Cantidad de apuesta:</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={betAmount}
                    onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                    disabled={gameStatus !== "betting"}
                    className="bg-white dark:bg-slate-800"
                  />
                  <Button
                    onClick={placeBet}
                    disabled={gameStatus !== "betting" || betAmount < 0.1 || betAmount > 2 || betAmount > balance}
                    className={cn(
                      "ton-button whitespace-nowrap",
                      (gameStatus !== "betting" || betAmount < 0.1 || betAmount > 2 || betAmount > balance) && 
                      "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Apostar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Min: 0.1 TON | Max: 2 TON
                </p>
              </div>
            </div>
            
            {/* Pot info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-4 py-3 bg-ton-muted rounded-lg">
                <span className="font-medium">Pozo acumulado:</span>
                <span className="font-bold text-ton">{potAmount.toFixed(2)} TON</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <p className="text-center text-muted-foreground">
              Conecta tu billetera TON de Telegram para realizar apuestas
            </p>
            <Button 
              onClick={connectWallet}
              className="ton-button"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Conectar Billetera
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WalletConnect;
