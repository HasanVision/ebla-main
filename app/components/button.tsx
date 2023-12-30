import clsx from "clsx";
import React from "react";
import styles from "./button.module.css"; // Import the CSS file

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                styles.buttonGlobal,
                disabled && styles.disabled,
                fullWidth && styles.buttonGlobalfullWidth,
                secondary ? styles.buttonGlobalSecondary : styles.buttonGlobalSecondayElse,
                danger && styles.buttonGlobalDanger,
                !secondary && !danger && styles.buttonGlobalPrimary
            )}
        >
            {children}
        </button>
    );
};

export default Button;
