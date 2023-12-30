
"use client"

import styles from "./modal.module.css";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children
}) => {
    return (
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                as="div"
                className={styles.modal}
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter={styles.enter}
                    enterFrom={styles.enterFrom}
                    enterTo={styles.enterTo}
                    leave={styles.leave}
                    leaveFrom={styles.leaveFrom}
                    leaveTo={styles.leaveTo}
                >
                    <div className={styles.modal2} />
                </Transition.Child>
                <div className={styles.modal3}>
                    <div className={styles.modal4}>
                        <Transition.Child
                            as={Fragment}
                            enter={styles.enter}
                            enterFrom={styles.enterFromDialogModal}
                            enterTo={styles.enterToDialogModal}
                            leave={styles.leaveDialogModal}
                            leaveFrom={styles.leaveFromDialogModal}
                            leaveTo={styles.leaveToDialogModal}
                        >
                            <Dialog.Panel className={styles.DialogPanelModal}>
                                <div className={styles.DialogPanelModalDiv1}>
                                    <button type="button"
                                        className={styles.DialogPanelModalButton}
                                        onClick={onClose}>
                                        <span className={styles.DialogPanelModalCloseSpan}></span>
                                        <IoClose className={styles.DialogPanleModalCloseIoClose} />
                                    </button>
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal;