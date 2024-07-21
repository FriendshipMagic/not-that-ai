'use client'

import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { GithubIcon, SwordIcon } from '@/components/icons'
import { MobileFeedback, PCFeedback } from '@/components/home/feedback'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <NextUINavbar isMenuOpen={isMenuOpen} maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <SwordIcon />
                        <p className="font-bold text-inherit">VirgilAI</p>
                    </NextLink>
                </NavbarBrand>

                <ul className="hidden md:flex gap-4 justify-start ml-2 mb-[2px]">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.label}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: 'foreground' }),
                                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                    <PCFeedback />
                </ul>
            </NavbarContent>

            <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="flex gap-2">
                    <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                        <GithubIcon className="text-default-500" />
                    </Link>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarMenuToggle
                    className="md:hidden basis-1 justify-end"
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                />
            </NavbarContent>

            <NavbarMenu>
                <div className="md:hidden mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarMenuItem key={item.label}>
                            <Link color={'foreground'} href={item.href} size="lg" onPress={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    <MobileFeedback />
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}
