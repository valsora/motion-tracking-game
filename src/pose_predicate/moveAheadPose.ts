import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

import roundValue from './roundValue'

export const moveAheadPose = ({
  poseLandmarks,
}: Pick<Results, 'poseLandmarks'>): boolean => {
  const nose = poseLandmarks[POSE_LANDMARKS.NOSE]

  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const rightSide =
    wristR.y < nose.y && roundValue(shoulderR.y) === roundValue(elbowR.y)

  const leftSide =
    wristL.y < nose.y && roundValue(shoulderL.y) === roundValue(elbowL.y)

  return rightSide && leftSide
}
