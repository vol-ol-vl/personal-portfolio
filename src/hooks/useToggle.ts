import { useCallback, useState } from "react";

type UseToggleReturn = {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
};

const useToggle = (initialValue = false): UseToggleReturn => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        open,
        close,
        toggle
    };
};

export default useToggle;

