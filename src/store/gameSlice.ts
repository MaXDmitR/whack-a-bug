import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface GameState {
  playerName: string;
  score: number;
  bestScores: Record<string, number>; // Це словник, де ключ - рядок (ім'я), а значення - число (рахунок)
}


const initialState: GameState = {
  playerName: '',
  score: 0,
  bestScores: {},
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    // Тут payload - це об'єкт з ім'ям та рахунком
    setBestScore: (state, action: PayloadAction<{ name: string; score: number }>) => {
      const { name, score } = action.payload;
      const currentBest = state.bestScores[name];
      
      if (!currentBest || score > currentBest) {
        state.bestScores[name] = score;
      }
    },
  },
});

export const { setPlayerName, incrementScore, resetScore, setBestScore } = gameSlice.actions;
export default gameSlice.reducer;