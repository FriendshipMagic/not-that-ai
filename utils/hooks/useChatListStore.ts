import { create } from 'zustand'
import { produce } from 'immer'

import { mockChats } from '@/utils/mocks/chats'
import { ChatListEnum } from '@/config/constants'

export type ChatListState = {
    previousIndex: number
    index: number
    title: string
    isLove: boolean
    showRemove: boolean
    removeConfirm: boolean
}

export type ChatListStore = {
    chats: ChatListState[]
    addChat: (title: string) => void
    removeChat: (index: number) => void
    switchLove: (index: number) => void
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
                    showRemove: false,
                    removeConfirm: false,
                })
            }),
        ),
    removeChat: (index: number) =>
        set((state: ChatListStore) => {
            if (state.chats.length === 1) {
                return { chats: state.chats }
            }

            const currentChats = state.chats.filter((_, i) => i !== index)

            currentChats.forEach((chat, i) => {
                chat.index = i
            })

            return { chats: currentChats }
        }),
    switchLove: (index: number) =>
        set((state: ChatListStore) => {
            const currentChat = state.chats[index]
            const currentChats = state.chats.filter((_, i) => i !== index)

            currentChat.isLove = !currentChat.isLove
            currentChat.isLove ? currentChats.unshift(currentChat) : currentChats.push(currentChat)
            currentChats.forEach((chat, i) => {
                chat.index = i
            })

            return { chats: currentChats }
        }),
}))
