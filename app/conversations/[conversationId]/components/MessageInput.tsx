"use client";

import styles from "./messageInput.module.css"

import { Field, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}


const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
    errors
}) => {
  return (
    <div style={{position: "relative", width:"100%"}}>
      <input className={styles.messageInput}
      id={id}
      type={type}
      autoComplete={id}
      {...register(id, {required})}
      placeholder={placeholder}      
      />
    </div>
  )
}

export default MessageInput
