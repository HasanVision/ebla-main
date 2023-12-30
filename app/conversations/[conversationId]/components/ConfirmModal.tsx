"use client"

import Button from "@/app/components/button";
import styles from "./confirmModal.module.css";

import Modal from "@/app/components/modal/Modal";
import useConversation from "@/app/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";




interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {

    const router = useRouter();

    const { conversationId } = useConversation();

    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push(`/conversations`);
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose])
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.ConfirmModal}>
                <div className={styles.ConfirmModal2}>
                    <FiAlertTriangle className={styles.FiAlertTriangle}
                    />
                </div>
                <div className={styles.ConfirmModalTitel}>
                    <Dialog.Title as="h3"
                        className={styles.ConfirmModalDialogTitle}
                    >
                        Delete conversation
                    </Dialog.Title>
                    <div className={styles.ConfirmModalDialogSpan}>
                        <p className={styles.ConfirmModalDialogSpan2}>
                            Are you sure you want to delete this conversation? This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.ConfirmDeleteButton}>

                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}

export default ConfirmModal;