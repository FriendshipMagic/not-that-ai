'use client'

import clsx from 'clsx'
import { link as linkStyles } from '@nextui-org/theme'
import { NavbarItem, NavbarMenuItem } from '@nextui-org/navbar'
import NextLink from 'next/link'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { MailIcon } from '@nextui-org/shared-icons'
import { Link } from '@nextui-org/link'
import { Select, SelectItem } from '@nextui-org/select'
import { useState } from 'react'

import { siteConfig } from '@/config/site'
import { validateEmail } from '@/utils/rules'

function FormBody() {
    const [email, setEmail] = useState('')

    return (
        <ModalBody>
            <Select isRequired label="Application" placeholder="请选择出现问题的应用" variant="bordered">
                {siteConfig.subApps.map((app) => (
                    <SelectItem key={app.value}>{app.label}</SelectItem>
                ))}
            </Select>
            <Textarea
                isRequired
                label="Problem"
                maxLength={200}
                maxRows={8}
                minRows={8}
                placeholder="简要描述您遇到的问题"
                variant="bordered"
            />
            <Input
                isRequired
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                errorMessage="请输入有效的邮箱"
                isInvalid={!validateEmail(email)}
                label="Email"
                placeholder="请输入您的邮箱"
                type="email"
                value={email}
                variant="bordered"
                onValueChange={setEmail}
            />
        </ModalBody>
    )
}

function PCForm({
    isOpen,
    onOpenChange,
    onMessageOpen,
}: {
    isOpen: boolean
    onOpenChange: () => void
    onMessageOpen: () => void
}) {
    return (
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">反馈</ModalHeader>
                        <FormBody />
                        <ModalFooter>
                            <Button color="danger" variant="flat" onClick={onClose}>
                                取消
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    onClose()
                                    onMessageOpen()
                                }}
                            >
                                确定
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

function MobileForm({
    isOpen,
    onOpenChange,
    onMessageOpen,
}: {
    isOpen: boolean
    onOpenChange: () => void
    onMessageOpen: () => void
}) {
    return (
        <Modal hideCloseButton isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex text-center flex-col gap-1">反馈</ModalHeader>
                        <FormBody />
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="flat" onPress={onClose}>
                                取消
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    onClose()
                                    onMessageOpen()
                                }}
                            >
                                确定
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

function Message({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) {
    return (
        <Modal hideCloseButton isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader />
                        <ModalBody>
                            <p className="text-center">感谢您的反馈，我们将尽快为您处理</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button className="hidden md:flex" color="danger" variant="flat" onClick={onClose}>
                                关闭
                            </Button>
                            <Button className="md:hidden" color="danger" variant="flat" onPress={onClose}>
                                关闭
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export function PCFeedback() {
    const label = '反馈'
    const { isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange } = useDisclosure()
    const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure()

    return (
        <>
            <PCForm isOpen={isFormOpen} onMessageOpen={onMessageOpen} onOpenChange={onFormOpenChange} />
            <Message isOpen={isMessageOpen} onOpenChange={onMessageOpenChange} />

            <NavbarItem key={label}>
                <NextLink
                    className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'data-[active=true]:text-primary data-[active=true]:font-medium',
                    )}
                    color="foreground"
                    href=""
                    onClick={onFormOpen}
                >
                    {label}
                </NextLink>
            </NavbarItem>
        </>
    )
}

export function MobileFeedback() {
    const label = '反馈'
    const { isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange } = useDisclosure()
    const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure()

    return (
        <>
            <MobileForm isOpen={isFormOpen} onMessageOpen={onMessageOpen} onOpenChange={onFormOpenChange} />
            <Message isOpen={isMessageOpen} onOpenChange={onMessageOpenChange} />
            <NavbarMenuItem key={label}>
                <Link color={'foreground'} href="" size="lg" onPress={onFormOpen}>
                    {label}
                </Link>
            </NavbarMenuItem>
        </>
    )
}
