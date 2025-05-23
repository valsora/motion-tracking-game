import { createSlice } from '@reduxjs/toolkit'

export const TRAINING_GAME_MODE = 'Training Mode'
export const EXAMINATION_GAME_MODE = 'Examination Mode'

interface GameLogicState {
  gameMode: typeof TRAINING_GAME_MODE | typeof EXAMINATION_GAME_MODE
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
          state.gameMode = EXAMINATION_GAME_MODE
          break
        case EXAMINATION_GAME_MODE:
          state.gameMode = TRAINING_GAME_MODE
          break
        default: {
          const exhaustiveCheck: never = state.gameMode
          throw new Error(`Unhandled cases: ${exhaustiveCheck}`)
        }
      }
    },
  },
})

export const { changeGameMode } = gameLogicSlice.actions

export default gameLogicSlice.reducer
