'use client'

import { Listbox, ListboxItem } from '@nextui-org/listbox'
import React from 'react'

export default function ChatList() {
    return (
        <Listbox aria-label="Actions" onAction={(key) => console.log(key)}>
            {new Array(35).fill(0).map((_, i) => (
                <ListboxItem key={i}>{i}</ListboxItem>
            ))}
        </Listbox>
    )
}
