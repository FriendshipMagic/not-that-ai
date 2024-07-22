'use client'

import { Listbox, ListboxItem } from '@nextui-org/listbox'
import React from 'react'
import { Link } from '@nextui-org/link'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Input } from '@nextui-org/input'
import { PlusFilledIcon, SearchIcon } from '@nextui-org/shared-icons'

function TopBar() {
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
                <PlusFilledIcon className="w-9 h-9" />
            </Link>
        </div>
    )
}

export default function ChatList() {
    return (
        <div className="flex flex-col">
            <TopBar />
            <ScrollShadow className="h-full">
                <Listbox
                    aria-label="Actions"
                    className="h-chat-list overflow-scroll"
                    defaultSelectedKeys="0"
                    onAction={(key) => console.log(key)}
                >
                    {new Array(35).fill(0).map((_, i) => (
                        <ListboxItem key={i} textValue={i.toString()}>
                            <Link color="foreground" href={'/chat'} size="lg" onClick={() => console.log(i)}>
                                {i}
                            </Link>
                        </ListboxItem>
                    ))}
                </Listbox>
            </ScrollShadow>
        </div>
    )
}
