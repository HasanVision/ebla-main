"use client";

import styles from "./form.module.css";


import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import FileUploader from "@/app/components/fileUpload/FileUploader";



const Form = () => {
  const { conversationId } = useConversation();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue(`message`, '', { shouldValidate: true });
    axios.post(`/api/messages`, {
      ...data,
      conversationId: conversationId
    });

    const handleUpload = (result: any) => {
      axios.post(`/api/messages`, {
        image: result?.info?.secure_url, conversationId
      })
    }
  }

  return (
    <>


      <div
        className={styles.ConversationForm}>

        <HiPhoto onClick={() => setIsUploadOpen(true)} className={styles.hiPhotoIcon}
          size={30} />

        <form className={styles.ConversationFormSubmit}
          onSubmit={handleSubmit(onSubmit)}

        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message"
          />
          <button className={styles.messageInputButton}
            type="submit"
          >
            <HiPaperAirplane className={styles.hiPhotoIcon}
              size={18} />
          </button>
        </form>
      </div>
    </>
  )
}

export default Form
