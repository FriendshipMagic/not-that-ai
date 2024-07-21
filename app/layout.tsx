import '@/styles/globals.css'
import { Metadata } from 'next'
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
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="m-0 w-full h-full px-5 flex-1 flex flex-col justify-center">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
