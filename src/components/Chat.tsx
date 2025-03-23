
import { useState, useEffect, useRef } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  username: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

const Chat = () => {
  const { isConnected, language } = useGame();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Mock initial messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        username: "Carlos",
        text: "¡Hola a todos! Suerte en el juego.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isCurrentUser: false,
      },
      {
        id: 2,
        username: "María",
        text: "Espero que esta sea mi noche de suerte.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        isCurrentUser: false,
      },
      {
        id: 3,
        username: "Anfitrión",
        text: "¡Bienvenidos al StarBingo! Recuerden que pueden hacer sus apuestas antes de que comience el juego.",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        isCurrentUser: false,
      },
    ];
    
    setMessages(initialMessages);
  }, []);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableNode) {
        scrollableNode.scrollTop = scrollableNode.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !isConnected) return;
    
    const newMsg: Message = {
      id: Date.now(),
      username: "Tú",
      text: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  const chatHeightVariants = {
    minimized: { height: "60px" },
    full: { height: "400px" }
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-float z-50 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      
      {/* Chat panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 rounded-xl overflow-hidden shadow-float z-40 border-2 border-red-800/30"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex flex-col bg-gradient-to-b from-black/90 to-red-950/90 backdrop-blur-lg"
              variants={chatHeightVariants}
              animate={isMinimized ? "minimized" : "full"}
              transition={{ duration: 0.3 }}
            >
              {/* Chat header */}
              <div className="p-3 border-b border-red-800/30 bg-gradient-to-r from-red-800 to-red-900 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <h3 className="font-medium">
                      {language === "es" ? "Chat del StarBingo" : "StarBingo Chat"}
                    </h3>
                    <div className="text-xs bg-green-600 px-2 py-0.5 rounded-full">
                      {messages.length} {language === "es" ? "en línea" : "online"}
                    </div>
                  </div>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/10"
                    >
                      {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsChatOpen(false)}
                      className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/10"
                    >
                      &times;
                    </Button>
                  </div>
                </div>
              </div>
              
              {!isMinimized && (
                <>
                  {/* Chat messages */}
                  <ScrollArea className="h-72 p-3" ref={scrollAreaRef}>
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          className={cn(
                            "flex flex-col p-3 rounded-lg max-w-[90%]",
                            msg.isCurrentUser 
                              ? "ml-auto bg-gradient-to-r from-red-700 to-red-800 text-white" 
                              : "bg-black/50 border border-red-900/20 text-white"
                          )}
                          variants={messageVariants}
                          initial="initial"
                          animate="animate"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="font-medium text-sm">{msg.username}</span>
                            </div>
                            <span className="text-xs opacity-70 ml-2">
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{msg.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Chat input */}
                  <div className="p-3 border-t border-red-800/30 bg-black/70">
                    {isConnected ? (
                      <form 
                        className="flex space-x-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                      >
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={language === "es" ? "Escribe un mensaje..." : "Type a message..."}
                          className="bg-black/50 border border-red-900/30 focus:border-red-500"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    ) : (
                      <p className="text-center text-sm text-muted-foreground">
                        {language === "es" 
                          ? "Conecta tu billetera para participar en el chat" 
                          : "Connect your wallet to join the chat"}
                      </p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Notification badge for new messages (future feature) */}
      {!isChatOpen && messages.length > 0 && (
        <div className="fixed bottom-16 right-6 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full z-50 animate-pulse-soft">
          {messages.length > 9 ? "9+" : messages.length}
        </div>
      )}
    </>
  );
};

export default Chat;
