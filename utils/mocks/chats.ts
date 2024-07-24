import { ChatListState } from '@/utils/hooks/useChatListStore'

const titles = [
    '初识之缘',
    '美好回忆',
    '浪漫约会',
    '心心相印',
    '甜蜜时光',
    '误会解除',
    '重归于好',
    '共同爱好',
    '相伴相随',
    '感人瞬间',
]

export const mockChats: ChatListState[] = new Array(10).fill(0).map((_, i) => ({
    previousIndex: i,
    index: i,
    title: titles[i],
    isLove: false,
    removeState: 'hidden',
    isEditable: false,
    currentTitle: titles[i],
}))

mockChats.forEach((chat, i) => {
    if (i < 4) {
        chat.isLove = true
    }
})
