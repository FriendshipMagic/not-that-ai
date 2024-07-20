import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'

import { subtitle, title } from '@/components/primitives'

export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ color: 'violet' })}>Virgil AI</h1>
                <h2 className={subtitle({ class: 'mt-4' })}>
                    AI with
                    <span className="text-blue-500"> Power</span>
                    ：如果你想用，那就自己来学！
                </h2>
            </div>

            <div className="flex gap-3 mt-8">
                <Link
                    className={buttonStyles({
                        color: 'primary',
                        radius: 'full',
                        variant: 'shadow',
                    })}
                    href={'/chat'}
                >
                    {/*encode \'*/}
                    Let&apos;s Chat!
                </Link>
            </div>
        </section>
    )
}
