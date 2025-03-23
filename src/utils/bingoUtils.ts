// BINGO card utility functions

interface BingoCell {
  value: number;
  column: string;
  selected: boolean;
}

// Generates a random BINGO card
export const generateBingoCard = (): BingoCell[][] => {
  const columns = ['B', 'I', 'N', 'G', 'O'];
  const ranges = [
    { min: 1, max: 15 },   // B
    { min: 16, max: 30 },  // I
    { min: 31, max: 45 },  // N
    { min: 46, max: 60 },  // G
    { min: 61, max: 75 },  // O
  ];
  
  const card: BingoCell[][] = [];
  
  // Generate numbers for each column
  for (let row = 0; row < 5; row++) {
    card[row] = [];
    
    for (let col = 0; col < 5; col++) {
      // Skip the center cell for free space
      if (row === 2 && col === 2) {
        card[row][col] = {
          value: 0,
          column: 'N',
          selected: true,
        };
        continue;
      }
      
      const { min, max } = ranges[col];
      let validNumber = false;
      let generatedNumber = 0;
      
      // Keep generating until we get a unique number for the column
      while (!validNumber) {
        generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Check if this number is already in the column
        validNumber = !card.some((r, i) => {
          return i !== row && r[col] && r[col].value === generatedNumber;
        });
      }
      
      card[row][col] = {
        value: generatedNumber,
        column: columns[col],
        selected: false,
      };
    }
  }
  
  return card;
};

// Winning patterns check
export const checkForWin = (card: BingoCell[][]): boolean => {
  // Check rows
  for (let row = 0; row < 5; row++) {
    if (card[row].every(cell => cell.selected)) {
      return true;
    }
  }
  
  // Check columns
  for (let col = 0; col < 5; col++) {
    if (card.every(row => row[col].selected)) {
      return true;
    }
  }
  
  // Check diagonals
  // Top left to bottom right
  if (card[0][0].selected && 
      card[1][1].selected && 
      card[2][2].selected && 
      card[3][3].selected && 
      card[4][4].selected) {
    return true;
  }
  
  // Top right to bottom left
  if (card[0][4].selected && 
      card[1][3].selected && 
      card[2][2].selected && 
      card[3][1].selected && 
      card[4][0].selected) {
    return true;
  }
  
  return false;
};

// Get the corresponding letter for a bingo number
export const getLetterForNumber = (number: number): string => {
  if (number >= 1 && number <= 15) return 'B';
  if (number >= 16 && number <= 30) return 'I';
  if (number >= 31 && number <= 45) return 'N';
  if (number >= 46 && number <= 60) return 'G';
  if (number >= 61 && number <= 75) return 'O';
  return '';
};

// Format a number for display with its corresponding letter
export const formatBingoNumber = (number: number): string => {
  const letter = getLetterForNumber(number);
  return `${letter}-${number}`;
};
