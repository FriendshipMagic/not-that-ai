export const validateEmail = (email: string): boolean =>
    Boolean(email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))
