import { useStoreSelector } from '@store/hooks'
import { stagesData } from '@/entities/stages/model/stagesData'

const PoseImage = () => {
  const level = useStoreSelector((state) => state.trainingMode.level)

  return <img src={stagesData[level].poseImage} alt="pose" style={{ height: '100%' }} />
}

export default PoseImage
