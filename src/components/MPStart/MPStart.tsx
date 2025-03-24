import { useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import {
  Holistic,
  Results,
  POSE_CONNECTIONS,
  HAND_CONNECTIONS,
} from '@mediapipe/holistic'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { Camera } from '@mediapipe/camera_utils'

import styles from './MPStart.module.css'
import { idlePose, unfoldWingsPose, moveAheadPose } from '../../pose_predicate'

const MPStart = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isEverythingSeen, setIsEverythingSeen] = useState(false)
  const gameModeRef = useRef('Training')
  const [gameModeTitle, setGameModeTitle] = useState('Training')

  const trainingRef = useRef({ level: 1 })
  const [trainingMessage, setTrainingMessage] = useState(
    'show "unfold wings" gesture',
  )

  const notTrainingRef = useRef<{
    pose: string | null
    count: number
  }>({ pose: null, count: 0 })
  const [notTrainingMessage, setNotTrainingMessage] = useState('unknown')

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    })

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    holistic.onResults(onResults)

    let camera: Camera | null = null
    if (webcamRef.current?.video) {
      camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current!.video! })
        },
      })
      camera.start()
    }

    return () => {
      camera?.stop()
      holistic.close()
    }
  }, [])

  const onResults = (results: Results) => {
    if (!canvasRef.current || !webcamRef.current?.video) return

    const videoW = webcamRef.current.video.videoWidth
    const videoH = webcamRef.current.video.videoHeight
    canvasRef.current.width = videoW
    canvasRef.current.height = videoH

    const canvasCtx = canvasRef.current.getContext('2d')
    if (!canvasCtx) return

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: 'white',
        lineWidth: 3,
      })
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: 'black',
        fillColor: 'rgb(225, 255, 0)',
        lineWidth: 1.5,
      })
      drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
        color: 'rgb(255, 85, 85)',
        lineWidth: 2.5,
      })
      drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: 'white',
        fillColor: 'red',
        lineWidth: 1,
        radius: 4,
      })
      drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
        color: 'rgb(76, 85, 255)',
        lineWidth: 2.5,
      })
      drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: 'white',
        fillColor: 'blue',
        lineWidth: 1,
        radius: 4,
      })
    }

    function processTraining(results: Results) {
      if (trainingRef.current.level === 1 && unfoldWingsPose(results)) {
        trainingRef.current.level += 0.5
        setTrainingMessage('take a neutral pose')
        console.log('unfoldWingsPose')
      }
      if (trainingRef.current.level === 1.5 && idlePose(results)) {
        trainingRef.current.level += 0.5
        setTrainingMessage('show "move ahead" gesture')
        console.log('idlePose')
      }
      if (trainingRef.current.level === 2 && moveAheadPose(results)) {
        trainingRef.current.level += 0.5
        setTrainingMessage('take a neutral pose')
        console.log('moveAheadPose')
      }
    }

    function processNotTraining(results: Results) {
      function processPose(
        results: Results,
        poseName: string,
        posePredicate: (results: Results) => boolean,
      ): boolean {
        if (posePredicate(results)) {
          if (notTrainingRef.current.pose === poseName)
            notTrainingRef.current.count += 1
          else notTrainingRef.current.count = 0
          notTrainingRef.current.pose = poseName
          console.log(`${poseName} ${notTrainingRef.current.count}`)
          return true
        }
        return false
      }

      processPose(results, 'idle', idlePose)
      const unfoldWingsIsDetected = processPose(
        results,
        'unfoldWings',
        unfoldWingsPose,
      )
      if (!unfoldWingsIsDetected) {
        processPose(results, 'moveAhead', moveAheadPose)
      }

      if (notTrainingRef.current.count >= 20) {
        console.log('aaaaa eto ' + notTrainingRef.current.pose)
        notTrainingRef.current.count = 0
        if (notTrainingRef.current.pose)
          setNotTrainingMessage(notTrainingRef.current.pose)
      }
    }

    if (
      results.poseLandmarks &&
      results.rightHandLandmarks &&
      results.leftHandLandmarks
    ) {
      setIsEverythingSeen(true)
      if (gameModeRef.current === 'Training') {
        processTraining(results)
      }
      if (gameModeRef.current === 'Not training') {
        processNotTraining(results)
      }
    } else {
      setIsEverythingSeen(false)
    }

    canvasCtx.restore()
  }

  const changeGameMode = () => {
    if (gameModeRef.current === 'Training') gameModeRef.current = 'Not training'
    else gameModeRef.current = 'Training'
    setGameModeTitle(gameModeRef.current)
  }

  const restartTraining = () => {
    trainingRef.current.level = 1
    setTrainingMessage('show "unfold wings" gesture')
  }

  return (
    <div className={styles.mpstart}>
      <h1>{gameModeTitle}</h1>
      <button onClick={changeGameMode}>change game mode</button>
      <div className={styles.message}>
        {gameModeTitle === 'Training' ? trainingMessage : notTrainingMessage}
      </div>
      {gameModeTitle === 'Training' && (
        <button className={styles.button} onClick={restartTraining}>
          RESTART
        </button>
      )}
      <canvas
        className={styles.canvas}
        style={{ borderColor: isEverythingSeen ? 'green' : 'red' }}
        ref={canvasRef}
      >
        <Webcam audio={false} ref={webcamRef} />
      </canvas>
    </div>
  )
}

export default MPStart
