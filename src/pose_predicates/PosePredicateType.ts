import { Results } from '@mediapipe/holistic'

export type PosePredicateType = (results: Results) => boolean
