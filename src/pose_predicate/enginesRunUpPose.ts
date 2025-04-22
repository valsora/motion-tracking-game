import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'

export const enginesRunUpPose = ({
  poseLandmarks,
  rightHandLandmarks,
}: Pick<Results, 'poseLandmarks' | 'rightHandLandmarks'>): boolean => {
  if (!rightHandLandmarks) return false

  const nose = poseLandmarks[POSE_LANDMARKS.NOSE]

  const wristR = poseLandmarks[POSE_LANDMARKS.RIGHT_WRIST]
  const indexTipR = rightHandLandmarks[8]
  const indexDipR = rightHandLandmarks[7]
  const indexPipR = rightHandLandmarks[6]
  const indexMcpR = rightHandLandmarks[5]
  const middleTipR = rightHandLandmarks[12]
  const middleDipR = rightHandLandmarks[11]
  const middlePipR = rightHandLandmarks[10]
  const middleMcpR = rightHandLandmarks[9]
  const ringTipR = rightHandLandmarks[16]
  const ringMcpR = rightHandLandmarks[13]
  const pinkyTipR = rightHandLandmarks[20]
  const pinkyMcpR = rightHandLandmarks[17]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]

  const indexFinger =
    indexTipR.y < indexDipR.y &&
    indexDipR.y < indexPipR.y &&
    indexPipR.y < indexMcpR.y

  const middleFinger =
    middleTipR.y < middleDipR.y &&
    middleDipR.y < middlePipR.y &&
    middlePipR.y < middleMcpR.y

  const rightSide =
    wristR.y < nose.y &&
    nose.x > wristR.x &&
    indexFinger &&
    middleFinger &&
    ringMcpR.y < ringTipR.y &&
    pinkyMcpR.y < pinkyTipR.y

  const leftSide = wristL.y > elbowL.y && elbowL.y > shoulderL.y

  return rightSide && leftSide
}
