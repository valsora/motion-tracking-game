import { useRef, useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'

import { Holistic, Results, POSE_CONNECTIONS, HAND_CONNECTIONS, NormalizedLandmarkList } from '@mediapipe/holistic'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { Camera } from '@mediapipe/camera_utils'

import { Button, CircularProgress } from '@mui/material'

import styles from './MPStart.module.css'

import PoseImage from '@components/PoseImage/PoseImage'

import { stagesData } from '@/entities/stages/model/stagesData'

import { TRAINING_GAME_MODE, EXAMINATION_GAME_MODE, changeGameMode } from '@store/slices/gameLogicSlice'
import { toNextLevel, restartTraining } from '@store/slices/trainingModeSlice'
import { toNextQuestion, restartExamination } from '@/store/slices/examinationModeSlice'
import { useStoreDispatch, useStoreSelector } from '@store/hooks'

const MPStart = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [wholePoseDetected, setWholePoseDetected] = useState(false)

  const dispatch = useStoreDispatch()

  const gameMode = useStoreSelector((state) => state.gameLogic.gameMode)

  const { level, trainingMessage } = useStoreSelector((state) => state.trainingMode)

  const { question, examinationMessage } = useStoreSelector((state) => state.examinationMode)

  const holisticRef = useRef<Holistic | null>(null)
  const cameraRef = useRef<Camera | null>(null)

  function setupMediapipeSolution() {
    if (holisticRef.current === null || cameraRef.current === null) {
      holisticRef.current = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      })

      holisticRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      setupCameraFeed()
    }

    return () => {
      cameraRef.current?.stop()
      holisticRef.current?.close()
    }
  }

  function setupCameraFeed() {
    if (webcamRef.current?.video) {
      cameraRef.current = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holisticRef.current!.send({
            image: webcamRef.current!.video!,
          })
        },
      })
      cameraRef.current.start()
    }
  }

  useEffect(setupMediapipeSolution, [])

  function registerHolisticResultListener() {
    holisticRef.current?.onResults(cachedOnNewFrame)
  }

  const cachedOnNewFrame = useCallback(onNewFrame, [dispatch, gameMode, level, question])

  function onNewFrame(results: Results) {
    if (!canvasRef.current || !webcamRef.current?.video) return

    const videoW = webcamRef.current.video.videoWidth
    const videoH = webcamRef.current.video.videoHeight
    canvasRef.current.width = videoW
    canvasRef.current.height = videoH

    const canvasCtx = canvasRef.current.getContext('2d')
    if (!canvasCtx) return

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height)

    if (bodyDetected(results)) drawEstimatedPose(canvasCtx, results)

    function proceedTrainingOrExamination(isTraining: boolean): void {
      const stage = isTraining ? level : question
      const actionCreator = isTraining ? toNextLevel : toNextQuestion

      stagesData.forEach(({ index, posePredicate }) => {
        if (posePredicate && stage === index && posePredicate(results)) dispatch(actionCreator())
      })
    }

    if (bodyDetected(results) && atLeastOneHandDetected(results)) {
      setWholePoseDetected(true)

      switch (gameMode) {
        case TRAINING_GAME_MODE:
          proceedTrainingOrExamination(true)
          break
        case EXAMINATION_GAME_MODE:
          proceedTrainingOrExamination(false)
          break
        default: {
          const exhaustiveCheck: never = gameMode
          throw new Error(`Unhandled cases: ${exhaustiveCheck}`)
        }
      }
    } else {
      setWholePoseDetected(false)
    }

    canvasCtx.restore()
  }

  function drawEstimatedPose(canvasCtx: CanvasRenderingContext2D, results: Results) {
    function drawBody() {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: 'white',
        lineWidth: 3,
      })

      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: 'black',
        fillColor: 'rgb(225, 255, 0)',
        lineWidth: 1.5,
      })
    }

    function drawHand(handLandmarks: NormalizedLandmarkList) {
      if (!handLandmarks) return

      const isLeft = handLandmarks === results.leftHandLandmarks

      drawConnectors(canvasCtx, handLandmarks, HAND_CONNECTIONS, {
        color: isLeft ? 'rgb(255, 85, 85)' : 'rgb(76, 85, 255)',
        lineWidth: 2.5,
      })

      drawLandmarks(canvasCtx, handLandmarks, {
        color: 'white',
        fillColor: isLeft ? 'red' : 'blue',
        lineWidth: 1,
        radius: 4,
      })
    }

    drawBody()
    drawHand(results.leftHandLandmarks)
    drawHand(results.rightHandLandmarks)
  }

  function bodyDetected(results: Results) {
    return results.poseLandmarks
  }

  function atLeastOneHandDetected(results: Results) {
    return results.rightHandLandmarks || results.leftHandLandmarks
  }

  useEffect(registerHolisticResultListener, [cachedOnNewFrame])

  const handleGameModeButtonClick = () => {
    dispatch(changeGameMode())
  }

  const handleRestartButtonClick = () => {
    if (gameMode === TRAINING_GAME_MODE) {
      dispatch(restartTraining())
    } else {
      dispatch(restartExamination())
    }
  }

  return (
    <div className={styles.mpstart}>
      <h1>{gameMode}</h1>
      <Button variant="contained" size="large" onClick={handleGameModeButtonClick}>
        change game mode
      </Button>
      <div className={styles.messageBox}>
        <p>{gameMode === TRAINING_GAME_MODE ? trainingMessage : examinationMessage}</p>
        <CircularProgress size="3rem" variant="determinate" value={stagesData[gameMode === TRAINING_GAME_MODE ? level : question].stageProgress} />
      </div>
      <Button variant="contained" size="small" onClick={handleRestartButtonClick}>
        restart
      </Button>
      <div className={styles.canvasAndImage}>
        <canvas
          className={styles.canvas}
          style={{
            boxShadow: wholePoseDetected ? '0px 0px 20px 5px rgba(13, 232, 31, 0.5)' : '0px 0px 20px 5px rgba(255, 50, 50, 0.5)',
          }}
          ref={canvasRef}
        >
          <Webcam audio={false} ref={webcamRef} />
        </canvas>
        {gameMode === TRAINING_GAME_MODE && <PoseImage />}
      </div>
    </div>
  )
}

export default MPStart
