import { createSlice } from '@reduxjs/toolkit'

import { stagesData } from '@/entities/stages/model/stagesData'

interface TrainingModeState {
  level: number
  trainingMessage: string
}

const initialState: TrainingModeState = {
  level: 0,
  trainingMessage: stagesData[0].trainingMessage,
}

export const trainingModeSlice = createSlice({
  name: 'trainingMode',
  initialState,
  reducers: {
    toNextLevel: (state) => {
      state.level += 1
      state.trainingMessage = stagesData[state.level].trainingMessage
    },
    restartTraining: (state) => {
      state.level = 0
      state.trainingMessage = stagesData[0].trainingMessage
    },
  },
})

export const { toNextLevel, restartTraining } = trainingModeSlice.actions

export default trainingModeSlice.reducer
