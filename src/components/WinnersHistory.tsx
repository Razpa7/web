
import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { Trophy, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock winner data (in a real app, this would come from the backend)
const mockWinners = [
  { id: 1, username: "Carlos", amount: 12.5, date: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 2, username: "Maria", amount: 8.2, date: new Date(Date.now() - 1000 * 60 * 60) },
  { id: 3, username: "Juan", amount: 5.7, date: new Date(Date.now() - 1000 * 60 * 120) },
];

const WinnersHistory = () => {
  const { language } = useGame();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const containerVariants = {
    collapsed: { height: "60px", overflow: "hidden" },
    expanded: { height: "auto", overflow: "visible" }
  };
  
  return (
    <motion.div 
      className="glass-card"
      variants={containerVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header with toggle */}
      <div 
        className="p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h3 className="font-medium">
            {language === "es" ? "Ganadores Recientes" : "Recent Winners"}
          </h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {isExpanded ? "▲" : "▼"}
        </div>
      </div>
      
      {/* Winners list */}
      <div className="space-y-1 p-2">
        {mockWinners.map((winner, index) => (
          <motion.div
            key={winner.id}
            className={cn(
              "winner-row",
              index === 0 && "bg-yellow-900/20"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{winner.username}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 font-bold mr-3">
                {winner.amount.toFixed(2)} TON
              </span>
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(winner.date)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WinnersHistory;
