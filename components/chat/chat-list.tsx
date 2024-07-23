'use client'

import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { Link } from '@nextui-org/link'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Input } from '@nextui-org/input'
import { PlusFilledIcon, SearchIcon } from '@nextui-org/shared-icons'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import { useChatListStore } from '@/utils/hooks/useChatListStore'

function TopBar() {
    const addChat = useChatListStore((state) => state.addChat)

    return (
        <div className="flex flex-row items-center justify-between pb-2 space-x-2">
            <Input
                placeholder="查找历史对话"
                size="lg"
                startContent={<SearchIcon className="mr-1" />}
                variant="faded"
            />
            <Link className="justify-center" color="foreground" href={'/chat'} size="lg">
                {/*TODO: 给按钮加一圈灯条，显示对话占用量*/}
                <PlusFilledIcon className="w-9 h-9" onClick={() => addChat('新的对话')} />
            </Link>
        </div>
    )
}

export default function ChatList() {
    const chats = useChatListStore((state) => state.chats)
    const loveChat = useChatListStore((state) => state.switchLove)

    return (
        <div className="flex flex-col">
            <TopBar />
            <ScrollShadow className="h-full">
                <Listbox
                    shouldHighlightOnFocus
                    aria-label="Actions"
                    className="h-chat-list overflow-scroll"
                    defaultSelectedKeys="0"
                >
                    {chats.map((chat) => (
                        <ListboxItem key={chat.index} className="py-3" color="warning" textValue={chat.title}>
                            <div className="flex flex-row items-center space-x-3">
                                {chat.isLove ? (
                                    <HeartFilled className="text-lg text-icon" onClick={() => loveChat(chat.index)} />
                                ) : (
                                    <HeartOutlined className="text-lg text-icon" onClick={() => loveChat(chat.index)} />
                                )}
                                <Link color="foreground" href={'/chat'} size="lg">
                                    {chat.title}
                                </Link>
                            </div>
                        </ListboxItem>
                    ))}
                </Listbox>
            </ScrollShadow>
        </div>
    )
}
