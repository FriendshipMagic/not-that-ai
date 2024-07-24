import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'
import React from 'react'

import { subtitle, title } from '@/components/primitives'
import { siteConfig } from '@/config/site'

export default function HomePage() {
    return (
        <>
            <div className="w-full h-full grow flex flex-col items-center justify-center">
                <div className="inline-block max-w-lg text-center justify-center">
                    <span className={title({ color: 'blue' })}>Virgil</span>
                    <span className={title({ color: 'violet' })}>&nbsp;AI</span>
                    <h2 className={subtitle({ class: 'mt-4' })}>
                        AI with
                        <span className="text-blue-500">&nbsp;Power</span>
                        ：如果你想用，那就自己来学！
                    </h2>
                </div>
                <div className="flex justify-center items-center gap-3 mt-8">
                    <Link
                        className={buttonStyles({
                            color: 'primary',
                            radius: 'full',
                            variant: 'shadow',
                        })}
                        href={'/chat/0'} // TODO: 暂时先写0
                    >
                        {/*encode \'*/}
                        Let&apos;s Chat!
                    </Link>
                </div>
            </div>

            <div className="w-full h-6 flex items-center justify-center my-3">
                <Link
                    isExternal
                    className="flex items-center text-current"
                    href={siteConfig.links.virgilAI}
                    title="nextui.org homepage"
                >
                    <span className="text-default-600">Powered by</span>
                    <span className={title({ size: 'rem', color: 'blue' })}>&nbsp;Virgil</span>
                    <span className={title({ size: 'rem', color: 'violet' })}>&nbsp;AI</span>
                </Link>
            </div>
        </>
    )
}
