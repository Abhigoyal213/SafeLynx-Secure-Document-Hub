import { useState, useEffect } from 'react';

export const usePasswordValidation = (password, confirmPassword) => {
    const [validation, setValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        passwordsMatch: false,
        isValid: false,
    });

    useEffect(() => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const passwordsMatch = password === confirmPassword && password.length > 0;

        const isValid =
            minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            hasSpecialChar &&
            passwordsMatch;

        setValidation({
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
            passwordsMatch,
            isValid,
        });
    }, [password, confirmPassword]);

    return validation;
};
