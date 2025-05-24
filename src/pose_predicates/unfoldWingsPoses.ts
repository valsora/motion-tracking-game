import { POSE_LANDMARKS } from '@mediapipe/holistic'

import areCoordsClose from './areCoordsClose'
import type { PosePredicateType } from './PosePredicateType'

export const unfoldWingsPose1: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const rightWristOnLeftShoulder = areCoordsClose(wristR.x, shoulderL.x) && areCoordsClose(wristR.y, shoulderL.y)

  const leftWristOnRightShoulder = areCoordsClose(wristL.x, shoulderR.x) && areCoordsClose(wristL.y, shoulderR.y)

  const rightElbowOnRightShoulder = areCoordsClose(elbowR.x, shoulderR.x) && areCoordsClose(elbowR.y, shoulderR.y)

  const leftElbowOnLeftShoulder = areCoordsClose(elbowL.x, shoulderL.x) && areCoordsClose(elbowL.y, shoulderL.y)

  return rightWristOnLeftShoulder && leftWristOnRightShoulder && rightElbowOnRightShoulder && leftElbowOnLeftShoulder
}

export const unfoldWingsPose2: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]
  const hipR = poseLandmarks[POSE_LANDMARKS.RIGHT_HIP]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]
  const hipL = poseLandmarks[POSE_LANDMARKS.LEFT_HIP]

  const onHorizLine =
    areCoordsClose(wristL.y, elbowL.y) &&
    areCoordsClose(elbowL.y, shoulderL.y) &&
    areCoordsClose(shoulderL.y, shoulderR.y) &&
    areCoordsClose(shoulderR.y, elbowR.y) &&
    areCoordsClose(elbowR.y, wristR.y)

  const orderOnXAxis = wristL.x > elbowL.x && elbowL.x > shoulderL.x && shoulderL.x > shoulderR.x && shoulderR.x > elbowR.x && elbowR.x > wristR.x

  return onHorizLine && orderOnXAxis && (wristL.x - shoulderL.x) * 4 * 1.1 >= (hipL.y - shoulderL.y) * 3 && (shoulderR.x - wristR.x) * 4 * 1.1 >= (hipR.y - shoulderR.y) * 3
}
