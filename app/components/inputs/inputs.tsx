'use client'
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

import styles from "./inputs.module.css";
interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div >
            <label className={styles.InputComponentLabel} htmlFor={id}>
                {label}
            </label>
            <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(
                        styles.inputConditional,
                        errors?.[id] && styles.errors,
                        disabled && styles.disabled
                    )}
                />
            </div>
        </div>
    );
}

export default Input;
