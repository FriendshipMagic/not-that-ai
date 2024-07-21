export type FeedbackState = {
    feedback: {
        application: string
        problem: string
        email: string
    }
    isValid: boolean
    setApplication: (application: string) => void
    setProblem: (problem: string) => void
    setEmail: (email: string) => void
    setIsValid: () => void
}
