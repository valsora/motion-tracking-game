import { createSlice } from '@reduxjs/toolkit'

import { Results } from '@mediapipe/holistic'

import {
  idlePose,
  removeTiedownsPose1,
  removeTiedownsPose2,
  removeTiedownsPose3,
  removeTiedownsPose4,
  tiedownsRemovedPose1,
  tiedownsRemovedPose2,
  tiedownsRemovedPose3,
  tiedownsRemovedPose4,
  wheelChocksRemovedPose,
  moveAheadPose,
  turnRightPose,
  turnLeftPose,
  stopPose,
  unfoldWingsPose1,
  unfoldWingsPose2,
  launchBarPose1,
  launchBarPose2,
  enginesRunUpPose,
  launchPose,
} from '@/pose_predicates'

import idleImage from '@images/idle.png'
import removeTiedownsImage from '@images/removeTiedowns.png'
import tiedownsRemoved1Image from '@images/tiedownsRemoved1.png'
import tiedownsRemoved2Image from '@images/tiedownsRemoved2.png'
import tiedownsRemoved3Image from '@images/tiedownsRemoved3.png'
import tiedownsRemoved4Image from '@images/tiedownsRemoved4.png'
import wheelChocksRemovedImage from '@images/wheelChocksRemoved.png'
import moveAheadImage from '@images/moveAhead.png'
import turnRightImage from '@images/turnRight.png'
import turnLeftImage from '@images/turnLeft.png'
import stopImage from '@images/stop.png'
import unfoldWings1Image from '@images/unfoldWings1.png'
import unfoldWings2Image from '@images/unfoldWings2.png'
import launchBar1Image from '@images/launchBar1.png'
import launchBar2Image from '@images/launchBar2.png'
import enginesRunUpImage from '@images/enginesRunUp.png'
import launchImage from '@images/launch.png'

export const levelsData: [number, string, string, ((results: Results) => boolean) | null][] = [
  [0, 'adopt an idle pose to start', idleImage, idlePose],
  [1, '1.1 show "remove tiedowns" signal', removeTiedownsImage, removeTiedownsPose1],
  [2, '1.2 show "remove tiedowns" signal', removeTiedownsImage, removeTiedownsPose2],
  [3, '1.3 show "remove tiedowns" signal', removeTiedownsImage, removeTiedownsPose3],
  [4, '1.4 show "remove tiedowns" signal', removeTiedownsImage, removeTiedownsPose4],
  [5, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [6, '2.1 show "tiedowns removed" signal', tiedownsRemoved1Image, tiedownsRemovedPose1],
  [7, '2.2 show "tiedowns removed" signal', tiedownsRemoved2Image, tiedownsRemovedPose2],
  [8, '2.3 show "tiedowns removed" signal', tiedownsRemoved3Image, tiedownsRemovedPose3],
  [9, '2.4 show "tiedowns removed" signal', tiedownsRemoved4Image, tiedownsRemovedPose4],
  [10, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [11, '3. show "wheel chocks removed" signal', wheelChocksRemovedImage, wheelChocksRemovedPose],
  [12, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [13, '4. show "move ahead" signal', moveAheadImage, moveAheadPose],
  [14, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [15, '5. show "turn right" signal', turnRightImage, turnRightPose],
  [16, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [17, '6. show "turn left" signal', turnLeftImage, turnLeftPose],
  [18, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [19, '7. show "stop" signal', stopImage, stopPose],
  [20, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [21, '8.1 show "unfold wings" signal', unfoldWings1Image, unfoldWingsPose1],
  [22, '8.2 show "unfold wings" signal', unfoldWings2Image, unfoldWingsPose2],
  [23, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [24, '9.1 show "extend launch bar" signal', launchBar1Image, launchBarPose1],
  [25, '9.2 show "extend launch bar" signal', launchBar2Image, launchBarPose2],
  [26, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [27, '10.1 show "retract launch bar" signal', launchBar2Image, launchBarPose2],
  [28, '10.2 show "retract launch bar" signal', launchBar1Image, launchBarPose1],
  [29, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [30, '11. show "engines run-up" signal', enginesRunUpImage, enginesRunUpPose],
  [31, 'adopt an idle pose to go to next level', idleImage, idlePose],
  [32, '12. show "launch" signal', launchImage, launchPose],
  [33, 'adopt an idle pose to finish', idleImage, idlePose],
  [34, 'training finished', idleImage, null],
]

interface TrainingModeState {
  level: number
  trainingMessage: string
}

const initialState: TrainingModeState = {
  level: 0,
  trainingMessage: levelsData[0][1],
}

export const trainingModeSlice = createSlice({
  name: 'trainingMode',
  initialState,
  reducers: {
    toNextLevel: (state) => {
      const nextLevel = state.level + 1
      state.level = nextLevel
      state.trainingMessage = levelsData[nextLevel][1]
    },
    restart: (state) => {
      state.level = 0
      state.trainingMessage = levelsData[0][1]
    },
  },
})

export const { toNextLevel, restart } = trainingModeSlice.actions

export default trainingModeSlice.reducer
