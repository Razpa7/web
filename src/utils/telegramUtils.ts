
// Telegram integration utilities

const TELEGRAM_BOT_TOKEN = '7774731520:AAEfg9QMKDoTm4CEfqntI3fLIzCq763-WBI';

interface TelegramUser {
  id: number;
  username?: string;
  firstName: string;
  lastName?: string;
}

// Initialize Telegram Web App connection
export const initTelegramApp = (): boolean => {
  try {
    // Check if Telegram WebApp is available
    if (window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram WebApp is available');
      window.Telegram.WebApp.ready();
      return true;
    }
    
    console.log('Telegram WebApp is not available, running in standalone mode');
    return false;
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
    return false;
  }
};

// Get current user if in Telegram environment
export const getCurrentUser = (): TelegramUser | null => {
  try {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;
      if (!initData) return null;
      
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (!user) return null;
      
      return {
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
};

// Connect TON wallet via Telegram
export const connectTonWallet = async (): Promise<{ success: boolean; balance?: number; error?: string }> => {
  try {
    // In a real app, this would connect to the TON wallet in Telegram
    // For now, we'll simulate a successful connection
    return {
      success: true,
      balance: 10.0, // Simulated balance
    };
  } catch (error) {
    console.error('Error connecting TON wallet:', error);
    return {
      success: false,
      error: 'Failed to connect TON wallet',
    };
  }
};

// Send message to the Telegram bot
export const sendMessageToBot = async (
  message: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // In a real app, this would send a message to the Telegram bot
    // For now, we'll simulate a successful message send
    console.log(`Message sent to bot: ${message}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending message to bot:', error);
    return {
      success: false,
      error: 'Failed to send message to bot',
    };
  }
};

// Function to place a bet via Telegram
export const placeTonBet = async (
  amount: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    // In a real app, this would place a bet using the TON wallet in Telegram
    // For now, we'll simulate a successful bet
    if (amount < 0.1 || amount > 2) {
      return {
        success: false,
        error: 'Bet amount must be between 0.1 and 2 TON',
      };
    }
    
    console.log(`Bet placed: ${amount} TON`);
    return { success: true };
  } catch (error) {
    console.error('Error placing TON bet:', error);
    return {
      success: false,
      error: 'Failed to place bet',
    };
  }
};

// Declare global Telegram types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            username?: string;
            first_name: string;
            last_name?: string;
          };
        };
      };
    };
  }
}
