import { createSlice } from '@reduxjs/toolkit'

export const TRAINING_GAME_MODE = 'Training mode'
export const NOT_TRAINING_GAME_MODE = 'Not training mode' //придумать позже

interface GameLogicState {
  gameMode: typeof TRAINING_GAME_MODE | typeof NOT_TRAINING_GAME_MODE
}

const initialState: GameLogicState = {
  gameMode: TRAINING_GAME_MODE,
}

export const gameLogicSlice = createSlice({
  name: 'gameLogic',
  initialState,
  reducers: {
    changeGameMode: (state) => {
      switch (state.gameMode) {
        case TRAINING_GAME_MODE:
          state.gameMode = NOT_TRAINING_GAME_MODE
          break
        case NOT_TRAINING_GAME_MODE:
          state.gameMode = TRAINING_GAME_MODE
          break
        default:
          break
      }
    },
  },
})

export const { changeGameMode } = gameLogicSlice.actions

export default gameLogicSlice.reducer
