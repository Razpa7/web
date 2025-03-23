
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useGame();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-black/50 border-red-500/50 hover:bg-red-900/20"
        >
          <Languages className="h-4 w-4" />
          <span className="font-medium">
            {language === "es" ? "ES" : "EN"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0 bg-black/90 border-red-800">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className={`justify-start rounded-none py-2 px-4 text-sm font-medium ${
              language === "es" ? "bg-red-900/30" : ""
            }`}
            onClick={() => setLanguage("es")}
          >
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg mr-2">🇪🇸</span>
              Español
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            className={`justify-start rounded-none py-2 px-4 text-sm font-medium ${
              language === "en" ? "bg-red-900/30" : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-lg mr-2">🇺🇸</span>
              English
            </motion.div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
