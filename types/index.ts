import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number
}

export type Feedback = {
    application: string
    problem: string
    email: string
}
