"use client"

import styles from "./settingsModal.module.css";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../modal/Modal";
import Input from "../inputs/inputs";
import Image from "next/image";
import Button from "../button";
import ImageUpload from "../imageUpload/imageUpload";


interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(``);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.firstname,
            image: currentUser?.image
        }
    });
    const image = watch(`image`);
    const handelUpload = (result: any) => {
        setValue(`image`, result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post(`/api/settings`, data)
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
                <div className={styles.settingsModalForm}>
                    <div className={styles.settingsModalFormDiv2}>
                        <h2 className={styles.settingsModalH2}>
                            Profile
                        </h2>
                        <p className={styles.settingsModalP}>
                            Edit your public information.
                        </p>
                        <div className={styles.settingsModalInput}>
                            <div className={styles.settingsModalInputNameDiv}>
                                <Input
                                    disabled={isLoading}
                                    label="First name"
                                    id="firstname"
                                    errors={errors}
                                    required
                                    register={register}
                                />
                                <Input
                                    disabled={isLoading}
                                    label="Last name"
                                    id="lastname"
                                    errors={errors}
                                    required
                                    register={register}
                                />
                            </div>

                            <div>
                                <label className={styles.setteingsModalInputLable}>
                                    Photo
                                </label>
                                <div className={styles.settingsModalInputImage}>
                                    <Image
                                        width={48}
                                        height={48}
                                        className={styles.settingsModalInputImageImage}
                                        src={image || currentUser?.image || `/images/placeholder.jpeg`}
                                        alt="Avatar"
                                    />
                                    {/* <ImageUpload
                                        value={profileImage}
                                        disabled={isLoading}
                                        onChange={(image) => setProfileImage(image)}
                                        label="Upload profile Image" /> */}
                                    <Button
                                        disabled={isLoading}
                                        secondary
                                        type="button">
                                        Change
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.settingsModalUploadButton}>
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default SettingsModal;