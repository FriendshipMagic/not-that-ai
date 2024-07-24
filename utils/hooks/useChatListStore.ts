import { create } from 'zustand'
import { produce } from 'immer'

import { mockChats } from '@/utils/mocks/chats'
import { ChatListEnum } from '@/config/constants'

type RemoveState = 'hidden' | 'show' | 'confirm'

export type ChatListState = {
    previousIndex: number
    index: number
    title: string
    isLove: boolean
    removeState: RemoveState
    isEditable: boolean
    currentTitle: string
}

export type ChatListStore = {
    chats: ChatListState[]
    addChat: (title: string) => void
    removeChat: (index: number) => void
    switchLove: (index: number) => void
    setRemoveState: (index: number, removeState: RemoveState) => void
    setIsEditable: (index: number, isEditable: boolean) => void
    setTitle: (index: number) => void
    setCurrentTitle: (index: number, currentTitle: string) => void
}

export const useChatListStore = create<ChatListStore>((set) => ({
    chats: mockChats, // TODO: 替换mock数据
    addChat: (title: string) =>
        set(
            produce((state: ChatListStore) => {
                const length = state.chats.length

                if (length === ChatListEnum.MAX_CHAT_LENGTH) {
                    return { chats: state.chats }
                }

                state.chats.push({
                    previousIndex: length,
                    index: length,
                    title,
                    isLove: false,
                    removeState: 'hidden',
                    isEditable: false,
                    currentTitle: '',
                })
            }),
        ),
    removeChat: (index: number) =>
        set((state: ChatListStore) => {
            if (state.chats.length === 1) {
                return { chats: state.chats }
            }

            const currentChats = state.chats.filter((_, i) => i !== index)

            return {
                chats: currentChats.map((chat, index) => ({
                    ...chat,
                    index,
                })),
            }
        }),
    switchLove: (index: number) =>
        set((state: ChatListStore) => {
            const currentChat = { ...state.chats[index] }
            const currentChats = state.chats.filter((_, i) => i !== index)

            currentChat.isLove = !currentChat.isLove
            currentChat.removeState = 'hidden' // 防止chat被置顶或沉底仍然显示右边的删除键
            currentChat.isLove ? currentChats.unshift(currentChat) : currentChats.push(currentChat)

            return {
                chats: currentChats.map((chat, index) => ({
                    ...chat,
                    index,
                })),
            }
        }),
    setRemoveState: (index: number, removeState: RemoveState) =>
        set(
            produce((state: ChatListStore) => {
                state.chats[index].removeState = removeState
            }),
        ),
    setIsEditable: (index: number, isEditable: boolean) =>
        set(
            produce((state: ChatListStore) => {
                state.chats[index].isEditable = isEditable
            }),
        ),
    setTitle: (index: number) => {
        set(
            produce((state: ChatListStore) => {
                const editText = state.chats[index].currentTitle

                if (editText.length === 0) {
                    return
                }
                state.setIsEditable(index, false)
                state.chats[index].title = editText
            }),
        )
    },
    setCurrentTitle: (index: number, currentTitle: string) => {
        set(
            produce((state: ChatListStore) => {
                state.chats[index].currentTitle = currentTitle
            }),
        )
    },
}))
