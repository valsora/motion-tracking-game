import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

import roundValue from './roundValue'

export const moveAheadPose = ({
  poseLandmarks,
  //rightHandLandmarks,
  //leftHandLandmarks,
}: Results): boolean => {
  const nose_y = poseLandmarks[POSE_LANDMARKS.NOSE].y

  const _shoulderR_y = roundValue(
    poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].y,
  )
  //const elbowR_x = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW].x
  const elbowR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_ELBOW].y
  const _elbowR_y = roundValue(elbowR_y)
  const wristR_y = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST].y

  const _shoulderL_y = roundValue(poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].y)
  //const elbowL_x = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW].x
  const elbowL_y = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW].y
  const _elbowL_y = roundValue(elbowL_y)
  const wristL_y = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST].y

  const rightSide = wristR_y < nose_y && _shoulderR_y === _elbowR_y

  const leftSide = wristL_y < nose_y && _shoulderL_y === _elbowL_y

  return rightSide && leftSide
}
