import { POSE_LANDMARKS } from '@mediapipe/holistic'

import areCoordsClose from './areCoordsClose'
import type { PosePredicateType } from './PosePredicateType'

export const removeTiedownsPose1: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const indexR = poseLandmarks[POSE_LANDMARKS.RIGHT_INDEX]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsLowerThanShoulders = elbowR.y > shoulderR.y && elbowL.y > shoulderL.y

  const leftWristLowerThanLeftElbow = wristL.y > elbowL.y

  const leftWristLeftElbowOnVertLine = areCoordsClose(wristL.x, elbowL.x)

  const rightIndexOnLeftElbow = areCoordsClose(indexR.x, elbowL.x) && areCoordsClose(indexR.y, elbowL.y)

  return elbowsLowerThanShoulders && leftWristLowerThanLeftElbow && leftWristLeftElbowOnVertLine && rightIndexOnLeftElbow
}

export const removeTiedownsPose2: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const indexR = poseLandmarks[POSE_LANDMARKS.RIGHT_INDEX]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsLowerThanShoulders = elbowR.y > shoulderR.y && elbowL.y > shoulderL.y

  const leftWristLowerThanLeftElbow = wristL.y > elbowL.y

  const leftWristLeftElbowOnVertLine = areCoordsClose(wristL.x, elbowL.x)

  const rightIndexOnLeftWrist = areCoordsClose(indexR.x, wristL.x) && areCoordsClose(indexR.y, wristL.y)

  return elbowsLowerThanShoulders && leftWristLowerThanLeftElbow && leftWristLeftElbowOnVertLine && rightIndexOnLeftWrist
}

export const removeTiedownsPose3: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const indexL = poseLandmarks[POSE_LANDMARKS.LEFT_INDEX]

  const elbowsLowerThanShoulders = elbowR.y > shoulderR.y && elbowL.y > shoulderL.y

  const rightWristLowerThanRightElbow = wristR.y > elbowR.y

  const rightWristRightElbowOnVertLine = areCoordsClose(wristR.x, elbowR.x)

  const leftIndexOnRightElbow = areCoordsClose(indexL.x, elbowR.x) && areCoordsClose(indexL.y, elbowR.y)

  return elbowsLowerThanShoulders && rightWristLowerThanRightElbow && rightWristRightElbowOnVertLine && leftIndexOnRightElbow
}

export const removeTiedownsPose4: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const indexL = poseLandmarks[POSE_LANDMARKS.LEFT_INDEX]

  const elbowsLowerThanShoulders = elbowR.y > shoulderR.y && elbowL.y > shoulderL.y

  const rightWristLowerThanRightElbow = wristR.y > elbowR.y

  const rightWristRightElbowOnVertLine = areCoordsClose(wristR.x, elbowR.x)

  const leftIndexOnRightWrist = areCoordsClose(indexL.x, wristR.x) && areCoordsClose(indexL.y, wristR.y)

  return elbowsLowerThanShoulders && rightWristLowerThanRightElbow && rightWristRightElbowOnVertLine && leftIndexOnRightWrist
}
