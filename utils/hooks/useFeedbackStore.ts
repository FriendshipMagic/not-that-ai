import { create } from 'zustand'
import { produce } from 'immer'

import { validateEmail } from '@/utils/rules'

export type FeedbackState = {
    application: string
    issue: string
    email: string
}

export type FeedbackStore = {
    feedback: FeedbackState
    isValid: boolean
    setApplication: (application: string) => void
    setProblem: (problem: string) => void
    setEmail: (email: string) => void
    setIsValid: () => void
}

const useFeedbackStore = create<FeedbackStore>((set) => ({
    feedback: {
        application: '',
        issue: '',
        email: '',
    },
    isValid: false,
    setApplication: (application: string) =>
        set(
            produce((state: FeedbackStore) => {
                state.feedback.application = application
            }),
        ),
    setProblem: (problem: string) =>
        set(
            produce((state: FeedbackStore) => {
                state.feedback.issue = problem
            }),
        ),
    setEmail: (email: string) =>
        set(
            produce((state: FeedbackStore) => {
                state.feedback.email = email
            }),
        ),
    setIsValid: () =>
        set((state: FeedbackStore) => {
            const { application, issue, email } = state.feedback

            return {
                isValid: application.length > 0 && issue.length > 0 && validateEmail(email),
            }
        }),
}))

export default useFeedbackStore
