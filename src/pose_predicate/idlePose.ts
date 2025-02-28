import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

import roundValue from './roundValue'

export const idlePose = ({
  poseLandmarks,
  //rightHandLandmarks,
  //leftHandLandmarks,
}: Results): boolean => {
  const _shoulderR_x = roundValue(
    poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x,
  )
  const shoulderR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].y
  const _elbowR_x = roundValue(poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW].x)
  const elbowR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW].y
  const _wristR_x = roundValue(poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].x)
  const wristR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].y

  const _shoulderL_x = roundValue(poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].x)
  const shoulderL_y = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].y
  const _elbowL_x = roundValue(poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW].x)
  const elbowL_y = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW].y
  const _wristL_x = roundValue(poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].x)
  const wristL_y = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].y

  const rightSide =
    _shoulderR_x === _elbowR_x &&
    _shoulderR_x === _wristR_x &&
    shoulderR_y < elbowR_y &&
    elbowR_y < wristR_y

  const leftSide =
    _shoulderL_x === _elbowL_x &&
    _shoulderL_x === _wristL_x &&
    shoulderL_y < elbowL_y &&
    elbowL_y < wristL_y

  return rightSide && leftSide
}
