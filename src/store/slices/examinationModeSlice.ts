import { createSlice } from '@reduxjs/toolkit'

import { stagesData } from '@/entities/stages/model/stagesData'

interface ExaminationModeState {
  question: number
  examinationMessage: string
}

const initialState: ExaminationModeState = {
  question: 0,
  examinationMessage: stagesData[0].examinationMessage,
}

export const examinationModeSlice = createSlice({
  name: 'examinationMode',
  initialState,
  reducers: {
    toNextQuestion: (state) => {
      state.question += 1
      state.examinationMessage = stagesData[state.question].examinationMessage
    },
    restartExamination: (state) => {
      state.question = 0
      state.examinationMessage = stagesData[0].examinationMessage
    },
  },
})

export const { toNextQuestion, restartExamination } = examinationModeSlice.actions

export default examinationModeSlice.reducer
