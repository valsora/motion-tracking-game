import { POSE_LANDMARKS } from '@mediapipe/holistic'

import areCoordsClose from './areCoordsClose'
import type { PosePredicateType } from './PosePredicateType'

export const tiedownsRemovedPose1: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsHigherThanShoulders = elbowR.y < shoulderR.y && elbowL.y < shoulderL.y

  const leftWristLeftElbowOnVertLine = areCoordsClose(wristL.x, elbowL.x)

  const rightWristOnLeftElbow = areCoordsClose(wristR.x, elbowL.x) && areCoordsClose(wristR.y, elbowL.y)

  return elbowsHigherThanShoulders && rightWristOnLeftElbow && leftWristLeftElbowOnVertLine
}

export const tiedownsRemovedPose2: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsHigherThanShoulders = elbowR.y < shoulderR.y && elbowL.y < shoulderL.y

  const leftWristLeftElbowOnVertLine = areCoordsClose(wristL.x, elbowL.x)

  const rightWristOnLeftWrist = areCoordsClose(wristR.x, wristL.x) && areCoordsClose(wristR.y, wristL.y)

  return elbowsHigherThanShoulders && rightWristOnLeftWrist && leftWristLeftElbowOnVertLine
}

export const tiedownsRemovedPose3: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsHigherThanShoulders = elbowR.y < shoulderR.y && elbowL.y < shoulderL.y

  const rightWristRightElbowOnVertLine = areCoordsClose(wristR.x, elbowR.x)

  const leftWristOnRightElbow = areCoordsClose(wristL.x, elbowR.x) && areCoordsClose(wristL.y, elbowR.y)

  return elbowsHigherThanShoulders && rightWristRightElbowOnVertLine && leftWristOnRightElbow
}

export const tiedownsRemovedPose4: PosePredicateType = ({ poseLandmarks }) => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const elbowsHigherThanShoulders = elbowR.y < shoulderR.y && elbowL.y < shoulderL.y

  const rightWristRightElbowOnVertLine = areCoordsClose(wristR.x, elbowR.x)

  const leftWristOnRightWrist = areCoordsClose(wristL.x, wristR.x) && areCoordsClose(wristL.y, wristR.y)

  return elbowsHigherThanShoulders && rightWristRightElbowOnVertLine && leftWristOnRightWrist
}
