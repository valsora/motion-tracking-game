import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

import idleImage from '../../images/idle.png'
import removeTiedownsImage from '../../images/removeTiedowns.png'
import tiedownsRemoved1Image from '../../images/tiedownsRemoved1.png'
import tiedownsRemoved2Image from '../../images/tiedownsRemoved2.png'
import tiedownsRemoved3Image from '../../images/tiedownsRemoved3.png'
import tiedownsRemoved4Image from '../../images/tiedownsRemoved4.png'
import wheelChocksRemovedImage from '../../images/wheelChocksRemoved.png'
import moveAheadImage from '../../images/moveAhead.png'
import turnRightImage from '../../images/turnRight.png'
import turnLeftImage from '../../images/turnLeft.png'
import stopImage from '../../images/stop.png'
import unfoldWings1Image from '../../images/unfoldWings1.png'
import unfoldWings2Image from '../../images/unfoldWings2.png'
import launchBar1Image from '../../images/launchBar1.png'
import launchBar2Image from '../../images/launchBar2.png'
import enginesRunUpImage from '../../images/enginesRunUp.png'
import launchImage from '../../images/launch.png'

export const levelsData: [string, string | undefined][] = [
  ['adopt an idle pose to start', idleImage],
  ['1.1 show "remove tiedowns" signal', removeTiedownsImage],
  ['1.2 show "remove tiedowns" signal', removeTiedownsImage],
  ['1.3 show "remove tiedowns" signal', removeTiedownsImage],
  ['1.4 show "remove tiedowns" signal', removeTiedownsImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['2.1 show "tiedowns removed" signal', tiedownsRemoved1Image],
  ['2.2 show "tiedowns removed" signal', tiedownsRemoved2Image],
  ['2.3 show "tiedowns removed" signal', tiedownsRemoved3Image],
  ['2.4 show "tiedowns removed" signal', tiedownsRemoved4Image],
  ['adopt an idle pose to go to next level', idleImage],
  ['3. show "wheel chocks removed" signal', wheelChocksRemovedImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['4. show "move ahead" signal', moveAheadImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['5. show "turn right" signal', turnRightImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['6. show "turn left" signal', turnLeftImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['7. show "stop" signal', stopImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['8.1 show "unfold wings" signal', unfoldWings1Image],
  ['8.2 show "unfold wings" signal', unfoldWings2Image],
  ['adopt an idle pose to go to next level', idleImage],
  ['9.1 show "extend launch bar" signal', launchBar1Image],
  ['9.2 show "extend launch bar" signal', launchBar2Image],
  ['adopt an idle pose to go to next level', idleImage],
  ['10.1 show "retract launch bar" signal', launchBar2Image],
  ['10.2 show "retract launch bar" signal', launchBar1Image],
  ['adopt an idle pose to go to next level', idleImage],
  ['11. show "engines run-up" signal', enginesRunUpImage],
  ['adopt an idle pose to go to next level', idleImage],
  ['12. show "launch" signal', launchImage],
  ['adopt an idle pose to finish', idleImage],
  ['training finished', undefined],
]

interface TrainingModeState {
  level: number
  trainingMessage: string
}

const initialState: TrainingModeState = {
  level: 0,
  trainingMessage: levelsData[0][0],
}

export const trainingModeSlice = createSlice({
  name: 'trainingMode',
  initialState,
  reducers: {
    toNextLevel: (state) => {
      const nextLevel = state.level + 1
      state.level = nextLevel
      state.trainingMessage = levelsData[nextLevel][0]
    },
    restart: (state) => {
      state.level = 0
      state.trainingMessage = levelsData[0][0]
    },
  },
})

export const { toNextLevel, restart } = trainingModeSlice.actions

export default trainingModeSlice.reducer
