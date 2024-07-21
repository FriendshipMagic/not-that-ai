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
import { create } from 'zustand'
import { produce } from 'immer'

import { siteConfig } from '@/config/site'
import { validateEmail } from '@/utils/rules'
import { FeedbackState } from '@/types/stores'

const label = '反馈'

const useFeedbackStore = create<FeedbackState>((set) => ({
    feedback: {
        application: '',
        problem: '',
        email: '',
    },
    isValid: false,
    setApplication: (application: string) =>
        set(
            produce((state) => {
                state.feedback.application = application
            }),
        ),
    setProblem: (problem: string) =>
        set(
            produce((state) => {
                state.feedback.problem = problem
            }),
        ),
    setEmail: (email: string) =>
        set(
            produce((state) => {
                state.feedback.email = email
            }),
        ),
    setIsValid: () =>
        set((state) => {
            const { application, problem, email } = state.feedback

            return {
                isValid: application.length > 0 && problem.length > 0 && validateEmail(email),
            }
        }),
}))

function FormBody() {
    const { application, problem, email } = useFeedbackStore((state) => state.feedback)
    const setApplication = useFeedbackStore((state) => state.setApplication)
    const setProblem = useFeedbackStore((state) => state.setProblem)
    const setEmail = useFeedbackStore((state) => state.setEmail)
    const setIsValid = useFeedbackStore((state) => state.setIsValid)

    return (
        <ModalBody>
            <Select
                isRequired
                label="Application"
                placeholder="请选择出现问题的应用"
                value={application}
                variant="faded"
                onSelectionChange={({ currentKey }) => {
                    setApplication(currentKey || '')
                    setIsValid()
                }}
            >
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
                value={problem}
                variant="faded"
                onValueChange={(value) => {
                    setProblem(value)
                    setIsValid()
                }}
            />
            <Input
                isRequired
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                errorMessage="请输入有效的邮箱"
                isInvalid={email !== '' && !validateEmail(email)}
                label="Email"
                placeholder="请输入您的邮箱"
                type="email"
                value={email}
                variant="faded"
                onValueChange={(value) => {
                    setEmail(value)
                    setIsValid()
                }}
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
    const isValid = useFeedbackStore((state) => state.isValid)

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
                                isDisabled={!isValid}
                                onClick={() => {
                                    onClose()
                                    onMessageOpen()
                                    // TODO: 发送表单
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
    const isValid = useFeedbackStore((state) => state.isValid)

    return (
        <Modal hideCloseButton isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex text-center flex-col gap-1">反馈</ModalHeader>
                        <FormBody />
                        <ModalFooter className="flex justify-center">
                            <Button color="danger" variant="flat" onClick={onClose}>
                                取消
                            </Button>
                            <Button
                                color="primary"
                                isDisabled={!isValid}
                                onClick={() => {
                                    onClose()
                                    onMessageOpen()
                                    // TODO: 发送表单
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
                            <Button className="md:hidden" color="danger" variant="flat" onClick={onClose}>
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
    const { isOpen: isFormOpen, onOpen: onFormOpen, onOpenChange: onFormOpenChange } = useDisclosure()
    const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure()

    return (
        <>
            <MobileForm isOpen={isFormOpen} onMessageOpen={onMessageOpen} onOpenChange={onFormOpenChange} />
            <Message isOpen={isMessageOpen} onOpenChange={onMessageOpenChange} />
            <NavbarMenuItem key={label}>
                <Link color={'foreground'} href="" size="lg" onClick={onFormOpen}>
                    {label}
                </Link>
            </NavbarMenuItem>
        </>
    )
}
