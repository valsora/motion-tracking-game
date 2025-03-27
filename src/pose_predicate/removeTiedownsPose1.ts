import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

import roundValue from './roundValue'

export const removeTiedownsPose1 = ({
  poseLandmarks,
}: Pick<Results, 'poseLandmarks'>): boolean => {
  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const elbowR = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW]
  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]

  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const rightSide =
    roundValue(wristL.x) === roundValue(shoulderR.x) &&
    roundValue(wristL.y) === roundValue(shoulderR.y) &&
    shoulderR.y < elbowR.y &&
    elbowR.y < wristR.y

  return rightSide
}
