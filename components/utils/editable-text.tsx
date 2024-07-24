import { Input } from '@nextui-org/input'

import { useChatListStore } from '@/utils/hooks/useChatListStore'

const EditableText = ({ index }: { index: number }) => {
    const { isEditable, title } = useChatListStore((state) => state.chats)[index]
    const setIsEditable = useChatListStore((state) => state.setIsEditable)
    const setTitle = useChatListStore((state) => state.setTitle)
    const setCurrentTitle = useChatListStore((state) => state.setCurrentTitle)

    return (
        <div>
            {isEditable ? (
                <Input
                    // autoFocus
                    value={title}
                    onChange={(e) => {
                        setCurrentTitle(index, e.target.value)
                    }}
                    onKeyDown={(e) => {
                        switch (e.key) {
                            case 'Enter': {
                                setTitle(index)
                                break
                            }
                            case 'Escape': {
                                setIsEditable(index, false)
                                break
                            }
                        }
                    }}
                />
            ) : (
                <span style={{ cursor: 'pointer' }} onClick={() => setIsEditable(index, true)}>
                    {title}
                </span>
            )}
        </div>
    )
}

export default EditableText
