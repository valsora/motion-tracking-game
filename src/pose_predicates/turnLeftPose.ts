import { POSE_LANDMARKS } from '@mediapipe/holistic'

import areCoordsClose from './areCoordsClose'
import type { PosePredicateType } from './PosePredicateType'

export const turnLeftPose: PosePredicateType = ({ poseLandmarks }) => {
  const nose = poseLandmarks[POSE_LANDMARKS.NOSE]

  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const rightSide = areCoordsClose(wristR.y, elbowR.y) && areCoordsClose(shoulderR.y, elbowR.y)

  const leftSide = wristL.y < nose.y && shoulderL.y >= elbowL.y

  return rightSide && leftSide
}
