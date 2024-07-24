'use client'

import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Link } from '@nextui-org/link'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Input } from '@nextui-org/input'
import { PlusFilledIcon, SearchIcon } from '@nextui-org/shared-icons'
import { DeleteFilled, DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { useChatListStore } from '@/utils/hooks/useChatListStore'
import { ChatListEnum } from '@/config/constants'

function TopBar() {
    const chatLength = useChatListStore((state) => state.chats).length
    const addChat = useChatListStore((state) => state.addChat)

    return (
        <>
            <div className="flex flex-row items-center justify-between pb-2 space-x-2">
                <Input
                    placeholder="查找历史对话"
                    size="lg"
                    startContent={<SearchIcon className="mr-1" />}
                    variant="faded"
                />
                <div className="flex flex-col items-center">
                    <Link className="justify-center" color="foreground" href={`/chat/${chatLength}`} size="lg">
                        <PlusFilledIcon className="w-9 h-9" onClick={() => addChat('新的对话')} />
                    </Link>
                    <div className="w-10 text-xs text-center">{`${chatLength} / ${ChatListEnum.MAX_CHAT_LENGTH}`}</div>
                </div>
            </div>
        </>
    )
}

export default function ChatList() {
    const pathname = usePathname()
    const chats = useChatListStore((state) => state.chats)
    const removeChat = useChatListStore((state) => state.removeChat)
    const switchLove = useChatListStore((state) => state.switchLove)
    const setShowRemove = useChatListStore((state) => state.setRemoveState)

    return (
        <div className="flex flex-col">
            <TopBar />
            {/*TODO: 失效bug*/}
            <ScrollShadow className="h-chat-list">
                <Listbox aria-label="Actions" className="h-full overflow-scroll" color="warning" variant="light">
                    {chats.map((chat) => {
                        return (
                            <ListboxItem
                                key={chat.index}
                                className={clsx('py-3', pathname === `/chat/${chat.index}` && 'bg-amber-500')}
                                endContent={
                                    chat.removeState === 'hidden' ? null : chat.removeState === 'show' ? (
                                        <DeleteOutlined
                                            className="text-xl text-icon"
                                            onClick={() => setShowRemove(chat.index, 'confirm')}
                                        />
                                    ) : (
                                        <DeleteFilled
                                            className="text-xl text-red-500"
                                            onClick={() => removeChat(chat.index)}
                                            onMouseLeave={() => setShowRemove(chat.index, 'show')}
                                        />
                                    )
                                }
                                startContent={
                                    chat.isLove ? (
                                        <HeartFilled
                                            className="text-xl text-red-500 pr-2"
                                            onClick={() => switchLove(chat.index)}
                                        />
                                    ) : (
                                        <HeartOutlined
                                            className="text-xl text-icon pr-2"
                                            onClick={() => switchLove(chat.index)}
                                        />
                                    )
                                }
                                textValue={chat.title}
                                variant={pathname !== `/chat/${chat.index}` ? 'light' : 'solid'}
                                onMouseEnter={() => {
                                    if (chat.removeState === 'confirm') {
                                        return
                                    }
                                    setShowRemove(chat.index, 'show')
                                }}
                                onMouseLeave={() => {
                                    setShowRemove(chat.index, 'hidden')
                                }}
                            >
                                <Link color="foreground" href={`/chat/${chat.index}`} size="lg">
                                    {chat.title}
                                </Link>
                            </ListboxItem>
                        )
                    })}
                </Listbox>
            </ScrollShadow>
        </div>
    )
}
