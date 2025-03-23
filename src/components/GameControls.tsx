
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { 
  Play, 
  Plus, 
  Locate, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Languages
} from "lucide-react";
import { motion } from "framer-motion";

const GameControls = () => {
  const { 
    gameStatus, 
    startGame, 
    resetGame, 
    speed, 
    setSpeed, 
    audioEnabled, 
    toggleAudio, 
    language, 
    setLanguage, 
    darkMode, 
    toggleDarkMode
  } = useGame();
  
  const speedLabels = {
    slow: { label: "Lenta", value: [25] },
    medium: { label: "Media", value: [50] },
    fast: { label: "Rápida", value: [75] }
  };
  
  const handleSpeedChange = (value: number[]) => {
    if (value[0] <= 33) {
      setSpeed("slow");
    } else if (value[0] <= 66) {
      setSpeed("medium");
    } else {
      setSpeed("fast");
    }
  };
  
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-2">
          Controles del Juego
        </h3>
        
        <div className="glass-card p-5 space-y-6">
          {/* Game speed control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Velocidad:</span>
              <span className="text-sm text-muted-foreground">{speedLabels[speed].label}</span>
            </div>
            
            <Slider
              value={speedLabels[speed].value}
              min={0}
              max={100}
              step={1}
              onValueChange={handleSpeedChange}
              disabled={gameStatus === "playing"}
              className="py-2"
            />
          </div>
          
          {/* Game controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={0}
            >
              <Button 
                onClick={gameStatus === "waiting" ? startGame : resetGame}
                className={cn(
                  "primary-button",
                  gameStatus !== "waiting" && gameStatus !== "finished" && "opacity-50 cursor-not-allowed"
                )}
                disabled={gameStatus !== "waiting" && gameStatus !== "finished"}
              >
                <Play className="w-4 h-4 mr-2" />
                {gameStatus === "waiting" ? "Iniciar" : gameStatus === "finished" ? "Nuevo Juego" : "En Curso"}
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={1}
            >
              <Button 
                variant="outline"
                className="secondary-button"
                onClick={() => window.location.href = '/bet'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Tarjeta
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={2}
            >
              <Button 
                variant="outline"
                className="ton-button"
                onClick={() => window.location.href = '/locate'}
              >
                <Locate className="w-4 h-4 mr-2" />
                Nuevo Juego
              </Button>
            </motion.div>
          </div>
          
          {/* Settings controls */}
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAudio}
              className="rounded-full w-10 h-10"
            >
              {audioEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="rounded-full w-10 h-10"
            >
              <Languages className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full w-10 h-10"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
