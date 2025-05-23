import { ADOPT_IDLE_POSE_LINE, CONGRATS_LINE } from '../consts/consts'

import {
  PosePredicateType,
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

interface Stage {
  index: number
  trainingMessage: string
  examinationMessage: string
  posePredicate: PosePredicateType | null
  poseImage: string
}

class IdlePoseStage implements Stage {
  index: number
  trainingMessage: string
  examinationMessage: string
  posePredicate: PosePredicateType | null = idlePose
  poseImage: string = idleImage

  constructor(index: number, trainingMessage: string = 'go to next level', examinationMessage: string = 'go to next question') {
    this.index = index
    this.trainingMessage = ADOPT_IDLE_POSE_LINE + trainingMessage
    this.examinationMessage = ADOPT_IDLE_POSE_LINE + examinationMessage
  }
}

class OtherPosesStage implements Stage {
  index: number
  trainingMessage: string
  examinationMessage: string
  posePredicate: PosePredicateType | null
  poseImage: string

  constructor(index: number, stageNumber: string, poseName: string, posePredicate: PosePredicateType, poseImage: string) {
    this.index = index
    const message = `Show "${poseName}" signal`
    this.trainingMessage = stageNumber + ' ' + message
    this.examinationMessage = message
    this.posePredicate = posePredicate
    this.poseImage = poseImage
  }
}

export const stagesData: Array<Stage> = [
  new IdlePoseStage(0, 'start training', 'start examination'),
  new OtherPosesStage(1, '1.1.', 'remove tiedowns', removeTiedownsPose1, removeTiedownsImage),
  new OtherPosesStage(2, '1.2.', 'remove tiedowns', removeTiedownsPose2, removeTiedownsImage),
  new OtherPosesStage(3, '1.3.', 'remove tiedowns', removeTiedownsPose3, removeTiedownsImage),
  new OtherPosesStage(4, '1.4.', 'remove tiedowns', removeTiedownsPose4, removeTiedownsImage),
  new IdlePoseStage(5),
  new OtherPosesStage(6, '2.1.', 'tiedowns removed', tiedownsRemovedPose1, tiedownsRemoved1Image),
  new OtherPosesStage(7, '2.2.', 'tiedowns removed', tiedownsRemovedPose2, tiedownsRemoved2Image),
  new OtherPosesStage(8, '2.3.', 'tiedowns removed', tiedownsRemovedPose3, tiedownsRemoved3Image),
  new OtherPosesStage(9, '2.4.', 'tiedowns removed', tiedownsRemovedPose4, tiedownsRemoved4Image),
  new IdlePoseStage(10),
  new OtherPosesStage(11, '3.', 'wheel chocks removed', wheelChocksRemovedPose, wheelChocksRemovedImage),
  new IdlePoseStage(12),
  new OtherPosesStage(13, '4.', 'move ahead', moveAheadPose, moveAheadImage),
  new IdlePoseStage(14),
  new OtherPosesStage(15, '5.', 'turn right', turnRightPose, turnRightImage),
  new IdlePoseStage(16),
  new OtherPosesStage(17, '6.', 'turn left', turnLeftPose, turnLeftImage),
  new IdlePoseStage(18),
  new OtherPosesStage(19, '7.', 'stop', stopPose, stopImage),
  new IdlePoseStage(20),
  new OtherPosesStage(21, '8.1.', 'unfold wings', unfoldWingsPose1, unfoldWings1Image),
  new OtherPosesStage(22, '8.2.', 'unfold wings', unfoldWingsPose2, unfoldWings2Image),
  new IdlePoseStage(23),
  new OtherPosesStage(24, '9.1.', 'extend launch bar', launchBarPose1, launchBar1Image),
  new OtherPosesStage(25, '9.2.', 'extend launch bar', launchBarPose2, launchBar2Image),
  new IdlePoseStage(26),
  new OtherPosesStage(27, '10.1.', 'retract launch bar', launchBarPose2, launchBar2Image),
  new OtherPosesStage(28, '10.2.', 'retract launch bar', launchBarPose1, launchBar1Image),
  new IdlePoseStage(29),
  new OtherPosesStage(30, '11.', 'engines run-up', enginesRunUpPose, enginesRunUpImage),
  new IdlePoseStage(31),
  new OtherPosesStage(32, '12.', 'launch', launchPose, launchImage),
  new IdlePoseStage(33, 'finish training', 'finish examination'),
  {
    index: 34,
    trainingMessage: 'Training' + CONGRATS_LINE,
    examinationMessage: 'Examination' + CONGRATS_LINE,
    posePredicate: null,
    poseImage: idleImage,
  },
]
