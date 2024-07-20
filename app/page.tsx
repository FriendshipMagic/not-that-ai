import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'
import { subtitle, title } from '@/components/primitives'

export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ color: 'violet' })}>Not That AI</h1>
                <h2 className={subtitle({ class: 'mt-4' })}>AI，并非AI：一款实用的AI工具</h2>
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
                    Let's Chat!
                </Link>
            </div>
        </section>
    )
}
