import { useStoreSelector } from 'store/hooks'
import { levelsData } from 'store/slices/trainingModeSlice'

const ImageOfPose = () => {
  const level = useStoreSelector((state) => state.trainingMode.level)

  return (
    <img
      src={levelsData[level][1]}
      alt="pose"
      style={{ height: '480px', transform: '1s' }}
    />
  )
}

export default ImageOfPose
