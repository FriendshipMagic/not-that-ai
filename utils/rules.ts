export const validateEmail = (email: string): boolean =>
    // 通过isRequired处理email为空的情况
    email === '' || Boolean(email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))
