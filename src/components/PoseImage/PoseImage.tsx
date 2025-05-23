import { useStoreSelector } from '@store/hooks'
import { gameData } from '@store/slices/trainingModeSlice'

const PoseImage = () => {
  const level = useStoreSelector((state) => state.trainingMode.level)

  return <img src={gameData[level][3]} alt="pose" style={{ height: '480px' }} />
}

export default PoseImage
