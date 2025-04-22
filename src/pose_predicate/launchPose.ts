import { POSE_LANDMARKS, Results } from '@mediapipe/holistic'
import areCoordsClose from './areCoordsClose'

export const launchPose = ({
  poseLandmarks,
  rightHandLandmarks,
  leftHandLandmarks,
}: Pick<
  Results,
  'poseLandmarks' | 'rightHandLandmarks' | 'leftHandLandmarks'
>): boolean => {
  if (!leftHandLandmarks) return false

  const shoulderR = poseLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER]
  const kneeR = poseLandmarks[26]
  const heelR = poseLandmarks[30]

  const shoulderL = poseLandmarks[POSE_LANDMARKS.LEFT_SHOULDER]
  const elbowL = poseLandmarks[POSE_LANDMARKS.LEFT_ELBOW]
  const wristL = poseLandmarks[POSE_LANDMARKS.LEFT_WRIST]
  const kneeL = poseLandmarks[25]
  const heelL = poseLandmarks[29]
  const indexTipL = leftHandLandmarks[8]
  const indexDipL = leftHandLandmarks[7]
  const indexPipL = leftHandLandmarks[6]
  const indexMcpL = leftHandLandmarks[5]
  const middleTipL = leftHandLandmarks[12]
  const middleDipL = leftHandLandmarks[11]
  const middlePipL = leftHandLandmarks[10]
  const middleMcpL = leftHandLandmarks[9]
  const ringTipL = leftHandLandmarks[16]
  const ringMcpL = leftHandLandmarks[13]
  const pinkyTipL = leftHandLandmarks[20]
  const pinkyMcpL = leftHandLandmarks[17]

  const indexFinger =
    indexTipL.x > indexDipL.x &&
    indexDipL.x > indexPipL.x &&
    indexPipL.x > indexMcpL.x

  const middleFinger =
    middleTipL.x > middleDipL.x &&
    middleDipL.x > middlePipL.x &&
    middlePipL.x > middleMcpL.x

  const otherFingers = ringMcpL.x > ringTipL.x && pinkyMcpL.x > pinkyTipL.x

  const handOnHorizLine =
    areCoordsClose(shoulderL.y, elbowL.y) &&
    areCoordsClose(elbowL.y, wristL.y) &&
    areCoordsClose(wristL.y, indexTipL.y)

  const handOrderOnXAxis =
    indexTipL.x > wristL.x && wristL.x > elbowL.x && elbowL.x > shoulderL.x

  const floorHorizLine = areCoordsClose(heelL.y, kneeR.y)

  const floorOrderOnXAxis = heelL.x > kneeR.x && kneeR.x > heelR.x

  return (
    !rightHandLandmarks &&
    handOnHorizLine &&
    handOrderOnXAxis &&
    indexFinger &&
    middleFinger &&
    otherFingers &&
    kneeL.x > shoulderL.x &&
    shoulderR.x > kneeR.x &&
    floorHorizLine &&
    floorOrderOnXAxis
  )
}
