import React from 'react'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-full pb-5 flex-1 flex flex-row items-center justify-start gap-5 focus-visible:outline-0">
            <div className="w-32">navigator</div>
            <div className="flex-1 max-w-full text-center justify-center">{children}</div>
        </section>
    )
}
