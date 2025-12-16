import { useState, useCallback } from 'react';

let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = toastId++;
        const newToast = { id, message, type, duration };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showSuccess = useCallback(
        (message, duration) => showToast(message, 'success', duration),
        [showToast]
    );

    const showError = useCallback(
        (message, duration) => showToast(message, 'error', duration),
        [showToast]
    );

    const showWarning = useCallback(
        (message, duration) => showToast(message, 'warning', duration),
        [showToast]
    );

    const showInfo = useCallback(
        (message, duration) => showToast(message, 'info', duration),
        [showToast]
    );

    return {
        toasts,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
    };
};
