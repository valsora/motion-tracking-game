import { configureStore } from '@reduxjs/toolkit'

import gameLogicReducer from './slices/gameLogicSlice'
import trainingModeReducer from './slices/trainingModeSlice'
import examinationModeReducer from './slices/examinationModeSlice'

export const store = configureStore({
  reducer: {
    gameLogic: gameLogicReducer,
    trainingMode: trainingModeReducer,
    examinationMode: examinationModeReducer,
  },
})

export type StoreDispatch = (typeof store)['dispatch']
export type RootState = ReturnType<(typeof store)['getState']>

export default store
