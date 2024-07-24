import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            height: {
                'main-area': 'calc(100vh - 64px)', // 主要区域高度
                'chat-list': 'calc(100vh - 160px)', // 聊天板块-聊天列表高度
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui(),
        'prettier-plugin-tailwindcss',
        ({ addUtilities }) => {
            const newUtilities = {
                // 图标标准双色
                '.text-icon': {
                    '@apply text-black dark:text-white': {},
                },
            }
            addUtilities(newUtilities)
        },
    ],
}
