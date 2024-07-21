import React from 'react'

import ChatList from '@/components/chat/chat-list'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-main-area pb-5 flex flex-row gap-5 overflow-hidden">
            <div className="w-40 h-full p-2 rounded-medium bg-gray-200 dark:bg-gray-900 overflow-scroll">
                <ChatList />
            </div>
            <div className="grow h-full p-2 text-center justify-center rounded-medium bg-gray-200 dark:bg-gray-900 overflow-scroll">
                {children}
            </div>
        </section>
    )
}
