import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

import roundValue from './roundValue'

export const unfoldWingsPose = ({
  poseLandmarks,
  rightHandLandmarks,
  leftHandLandmarks,
}: Results): boolean => {
  const nose_y = poseLandmarks[POSE_LANDMARKS.NOSE].y

  const shoulderR_x = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x
  const elbowR_x = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW].x
  const _elbowR_x = roundValue(elbowR_x)
  const _wristR_x = roundValue(poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].x)
  const wristR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].y
  const thumbTipR_x = rightHandLandmarks[4].x
  const indexTipR_y = rightHandLandmarks[8].y
  const middleTipR_y = rightHandLandmarks[12].y
  const ringTipR_y = rightHandLandmarks[16].y
  const pinkyTipR_y = rightHandLandmarks[20].y
  const indexMcpR_y = rightHandLandmarks[5].y
  const middleMcpR_y = rightHandLandmarks[9].y
  const ringMcpR_y = rightHandLandmarks[13].y
  const pinkyMcpR_y = rightHandLandmarks[17].y

  const shoulderL_x = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].x
  const elbowL_x = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW].x
  const _elbowL_x = roundValue(elbowL_x)
  const _wristL_x = roundValue(poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].x)
  const wristL_y = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].y
  const thumbTipL_x = leftHandLandmarks[4].x
  const indexTipL_y = leftHandLandmarks[8].y
  const middleTipL_y = leftHandLandmarks[12].y
  const ringTipL_y = leftHandLandmarks[16].y
  const pinkyTipL_y = leftHandLandmarks[20].y
  const indexMcpL_y = leftHandLandmarks[5].y
  const middleMcpL_y = leftHandLandmarks[9].y
  const ringMcpL_y = leftHandLandmarks[13].y
  const pinkyMcpL_y = leftHandLandmarks[17].y

  const rightSide =
    nose_y > wristR_y &&
    elbowR_x < shoulderR_x &&
    _elbowR_x === _wristR_x &&
    thumbTipR_x < elbowR_x &&
    indexMcpR_y < indexTipR_y &&
    middleMcpR_y < middleTipR_y &&
    ringMcpR_y < ringTipR_y &&
    pinkyMcpR_y < pinkyTipR_y

  const leftSide =
    nose_y > wristL_y &&
    shoulderL_x < elbowL_x &&
    _elbowL_x === _wristL_x &&
    thumbTipL_x > elbowL_x &&
    indexMcpL_y < indexTipL_y &&
    middleMcpL_y < middleTipL_y &&
    ringMcpL_y < ringTipL_y &&
    pinkyMcpL_y < pinkyTipL_y

  return rightSide && leftSide
}
