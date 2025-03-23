
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { generateBingoCard, checkForWin } from "@/utils/bingoUtils";

interface BingoCell {
  value: number;
  column: string;
  selected: boolean;
}

interface GameContextType {
  bingoCard: BingoCell[][];
  currentNumber: number | null;
  previousNumbers: number[];
  gameStatus: "waiting" | "betting" | "playing" | "finished";
  isConnected: boolean;
  balance: number;
  betAmount: number;
  potAmount: number;
  showVictory: boolean;
  setBetAmount: (amount: number) => void;
  startGame: () => void;
  connectWallet: () => void;
  placeBet: () => void;
  speed: "slow" | "medium" | "fast";
  setSpeed: (speed: "slow" | "medium" | "fast") => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Game state
  const [bingoCard, setBingoCard] = useState<BingoCell[][]>(generateBingoCard());
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [previousNumbers, setPreviousNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<"waiting" | "betting" | "playing" | "finished">("waiting");
  const [showVictory, setShowVictory] = useState(false);
  
  // Player state
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(0.1);
  const [potAmount, setPotAmount] = useState(0);
  
  // Game settings
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [darkMode, setDarkMode] = useState(true);

  // Audio elements
  const [numberCallSound, setNumberCallSound] = useState<HTMLAudioElement | null>(null);
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);
  const [winSound, setWinSound] = useState<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const numberCall = new Audio("/number-call.mp3");
    const background = new Audio("https://www.youtube.com/watch?v=PaFHwTjy1yE");
    const win = new Audio("/win.mp3");
    
    background.loop = true;
    
    setNumberCallSound(numberCall);
    setBackgroundMusic(background);
    setWinSound(win);
    
    return () => {
      background.pause();
      numberCall.pause();
      win.pause();
    };
  }, []);

  // Toggle background music when audio is enabled/disabled
  useEffect(() => {
    if (backgroundMusic) {
      if (audioEnabled && (gameStatus === "betting" || gameStatus === "playing")) {
        backgroundMusic.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Background music autoplay prevented");
        });
      } else {
        backgroundMusic.pause();
      }
    }
  }, [audioEnabled, gameStatus, backgroundMusic]);

  // Update document theme when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Game logic - draw numbers during gameplay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameStatus === "playing") {
      const drawInterval = speed === "slow" ? 3000 : speed === "medium" ? 2000 : 1000;
      
      timer = setInterval(() => {
        if (previousNumbers.length >= 75) {
          clearInterval(timer);
          setGameStatus("finished");
          toast.info("Todos los números han sido sorteados.");
          return;
        }
        
        // Draw a random number that hasn't been called yet
        const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
        const availableNumbers = allNumbers.filter(num => !previousNumbers.includes(num));
        
        if (availableNumbers.length === 0) {
          clearInterval(timer);
          setGameStatus("finished");
          return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const newNumber = availableNumbers[randomIndex];
        
        // Play number call sound
        if (audioEnabled && numberCallSound) {
          numberCallSound.currentTime = 0;
          numberCallSound.play().catch(() => {
            console.log("Number call sound play prevented");
          });
        }
        
        // Update current number and previous numbers
        setCurrentNumber(newNumber);
        setPreviousNumbers(prev => [...prev, newNumber]);
        
        // Update card if number is on it
        setBingoCard(prev => {
          const newCard = [...prev];
          
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
              if (newCard[row][col].value === newNumber) {
                newCard[row][col] = { ...newCard[row][col], selected: true };
              }
            }
          }
          
          return newCard;
        });
        
        // Check for win
        const hasWon = checkForWin(bingoCard);
        if (hasWon) {
          clearInterval(timer);
          setGameStatus("finished");
          
          // Show victory celebration
          setShowVictory(true);
          
          // Play win sound
          if (audioEnabled && winSound) {
            winSound.play().catch(() => {
              console.log("Win sound play prevented");
            });
          }
          
          // Process winnings
          setTimeout(() => {
            if (isConnected) {
              // Add pot amount to player's balance (simulating payout)
              setBalance(prevBalance => prevBalance + potAmount);
              toast.success(`¡Has ganado ${potAmount.toFixed(2)} TON!`);
            }
            
            // Hide victory screen after 5 seconds
            setTimeout(() => {
              setShowVictory(false);
            }, 5000);
          }, 2000);
        }
      }, drawInterval);
    }
    
    return () => clearInterval(timer);
  }, [gameStatus, previousNumbers, speed, audioEnabled, numberCallSound, winSound, bingoCard, isConnected, potAmount]);

  // Game flow - manage betting period
  useEffect(() => {
    let bettingTimer: NodeJS.Timeout;
    
    if (gameStatus === "betting") {
      // 2 minute betting period
      toast.info("El periodo de apuestas ha comenzado. Tienes 2 minutos para realizar tu apuesta.");
      
      bettingTimer = setTimeout(() => {
        if (potAmount > 0) {
          setGameStatus("playing");
          toast.success("¡Comienza el juego!");
        } else {
          setGameStatus("waiting");
          toast.error("No se realizaron apuestas. El juego ha sido cancelado.");
        }
      }, 120000); // 2 minutes
    }
    
    return () => clearInterval(bettingTimer);
  }, [gameStatus, potAmount]);

  // Game functions
  const startGame = () => {
    if (gameStatus === "waiting") {
      // Reset game state
      setBingoCard(generateBingoCard());
      setCurrentNumber(null);
      setPreviousNumbers([]);
      setPotAmount(0);
      
      // Start betting period
      setGameStatus("betting");
    } else {
      toast.info("El juego ya está en curso.");
    }
  };

  const placeBet = () => {
    if (!isConnected) {
      toast.error("Conecta tu billetera para realizar una apuesta.");
      return;
    }
    
    if (gameStatus !== "betting") {
      toast.error("No puedes apostar en este momento.");
      return;
    }
    
    if (betAmount < 0.1 || betAmount > 2) {
      toast.error("La apuesta debe ser entre 0.1 y 2 TON.");
      return;
    }
    
    if (betAmount > balance) {
      toast.error("No tienes suficiente balance para esta apuesta.");
      return;
    }
    
    // Process bet
    setBalance(prevBalance => prevBalance - betAmount);
    setPotAmount(prevPot => prevPot + betAmount);
    
    toast.success(`Apuesta de ${betAmount} TON realizada con éxito.`);
  };

  const connectWallet = () => {
    // Simulate Telegram wallet connection
    setIsConnected(true);
    setBalance(10); // Simulated balance
    toast.success("Billetera conectada correctamente.");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetGame = () => {
    setGameStatus("waiting");
    setBingoCard(generateBingoCard());
    setCurrentNumber(null);
    setPreviousNumbers([]);
    setPotAmount(0);
    setShowVictory(false);
  };

  const value = {
    bingoCard,
    currentNumber,
    previousNumbers,
    gameStatus,
    isConnected,
    balance,
    betAmount,
    potAmount,
    showVictory,
    setBetAmount,
    startGame,
    connectWallet,
    placeBet,
    speed,
    setSpeed,
    audioEnabled,
    toggleAudio,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
