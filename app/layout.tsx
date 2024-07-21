import '@/styles/globals.css'
import { Metadata } from 'next'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import React from 'react'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/home/navbar'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <title>{siteConfig.name}</title>
            </head>
            <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7x px-6 flex-grow">{children}</main>
                        <footer className="w-full flex items-center justify-center py-3">
                            <Link
                                isExternal
                                className="flex items-center gap-1 text-current"
                                href={siteConfig.links.virgilAI}
                                title="nextui.org homepage"
                            >
                                <span className="text-default-600">Powered by</span>
                                <p className="text-primary">VirgilAI</p>
                            </Link>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
