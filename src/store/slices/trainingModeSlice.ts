import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

const messages: string[] = [
  'adopt an idle pose to start',
  '1. show "remove tiedowns" gesture',
  'adopt an idle pose to go to next level',
  '2. show "unfold wings" gesture',
  'adopt an idle pose to go to next level',
  '3. show "move ahead" gesture',
  'adopt an idle pose to finish',
  'training finished',
]

interface TrainingModeState {
  level: number
  trainingMessage: string
}

const initialState: TrainingModeState = {
  level: 0,
  trainingMessage: messages[0],
}

export const trainingModeSlice = createSlice({
  name: 'trainingMode',
  initialState,
  reducers: {
    toNextLevel: (state) => {
      const nextLevel = state.level + 1
      state.level = nextLevel
      state.trainingMessage = messages[nextLevel]
    },
    restart: (state) => {
      state.level = 0
      state.trainingMessage = messages[0]
    },
  },
})

export const { toNextLevel, restart } = trainingModeSlice.actions

export default trainingModeSlice.reducer
