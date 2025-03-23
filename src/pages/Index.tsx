
import { useEffect } from "react";
import { GameProvider } from "@/contexts/GameContext";
import { initTelegramApp } from "@/utils/telegramUtils";
import BingoCard from "@/components/BingoCard";
import NumberDisplay from "@/components/NumberDisplay";
import GameControls from "@/components/GameControls";
import WalletConnect from "@/components/WalletConnect";
import BettingPanel from "@/components/BettingPanel";
import Chat from "@/components/Chat";
import VictoryConfetti from "@/components/VictoryConfetti";
import { toast } from "@/lib/toast";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameContext";
import TermsAndConditions from "@/components/TermsAndConditions";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Diamond, Trophy, Star } from "lucide-react";
import WinnersHistory from "@/components/WinnersHistory";

// Inner component to use the GameContext
const BingoGame = () => {
  const { gameStatus, showVictory, language, potAmount } = useGame();
  
  return (
    <div className="min-h-screen bg-purple-100 text-white relative overflow-x-hidden">
      {/* Background pattern with gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none ton-pattern"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-red-900/20 to-black/40 pointer-events-none"></div>
      
      {/* Victory celebration */}
      <VictoryConfetti isVisible={showVictory} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header with language and terms buttons */}
        <motion.div
          className="absolute top-4 right-4 flex gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <LanguageSwitcher />
          <TermsAndConditions />
        </motion.div>
        
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3">
            <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse-soft" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-yellow-500">
              StarBingo
            </h1>
            <Diamond className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
          </div>
          
          <div className="mt-2 flex flex-col items-center">
            <p className="text-white/80 flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-ton animate-pulse-soft"></span>
              {language === "es"
                ? "Conecta tu Billetera TON. ¡Apuesta y Gana!"
                : "Connect your TON Wallet. Bet and Win!"}
            </p>
            
            {/* Pot amount display */}
            <div className="mt-2 glass-card py-1 px-4 rounded-full flex items-center gap-2 text-yellow-300 font-bold animate-pulse-soft">
              <Trophy className="w-4 h-4" />
              <span>{language === "es" ? "Pozo actual:" : "Current pot:"} {potAmount.toFixed(2)} TON</span>
            </div>
          </div>
        </motion.header>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Bingo card */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-4 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
              <BingoCard />
            </div>
          </motion.div>
          
          {/* Right column - Game controls and number display */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NumberDisplay />
            <GameControls />
            <BettingPanel />
            <WalletConnect />
            <WinnersHistory />
          </motion.div>
        </div>
        
        {/* Chat component */}
        <Chat />
        
        {/* Victory message */}
        {showVictory && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]">
              {language === "es" ? "¡VICTORIA!" : "VICTORY!"}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    // Initialize Telegram Web App if available
    const isTelegramAppAvailable = initTelegramApp();
    
    if (!isTelegramAppAvailable) {
      console.log("Running in standalone mode, Telegram WebApp not available");
    }
  }, []);
  
  return (
    <GameProvider>
      <BingoGame />
    </GameProvider>
  );
};

export default Index;
