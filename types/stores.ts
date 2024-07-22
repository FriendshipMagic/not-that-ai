import { Feedback } from '@/types/index'

export type FeedbackStore = {
    feedback: Feedback
    isValid: boolean
    setApplication: (application: string) => void
    setProblem: (problem: string) => void
    setEmail: (email: string) => void
    setIsValid: () => void
}
