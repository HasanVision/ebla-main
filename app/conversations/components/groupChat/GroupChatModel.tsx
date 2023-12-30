
'use client'

import Input from "@/app/components/inputs/inputs";
import styles from "./groupChatModal.module.css";

import Modal from "@/app/components/modal/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/button";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[]
}


const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            firstname: '',
            lastName: '',
            members: []
        },
    });

    const members = watch(`members`);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(`/api/conversations`, {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.GroupChat}>
                    <div className={styles.GroupChatDiv2}>
                        <h2 className={styles.groupChatTitle}>Create a group chat</h2>
                        <p className={styles.CreateAChatMorethan2}>
                            Create a chat with more than 2 people.
                        </p>
                        <div className={styles.groupChatInput}>
                            <Input
                                register={register}
                                label="Group name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    lable: [user.firstname, user.lastname]
                                }))}
                                onChange={(value) => setValue(`members`, value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.selectButtons}>
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary>
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit" >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default GroupChatModal;