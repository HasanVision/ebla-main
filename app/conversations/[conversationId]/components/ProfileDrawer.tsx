"use client"

import Avatar from "@/app/components/avatar/avatar";
import styles from "./profileDrawer.module.css";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";

import { IoClose, IoTrash } from 'react-icons/io5'
import Modal from "@/app/components/modal/Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/avatarGroup/AvatarGroup";


interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const otherUser = useOtherUser(data);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.firstname
    }, [data.name, otherUser.firstname]);

    const lastName = useMemo(() => {
        return data.name || otherUser.lastname
    }, [data.name, otherUser.lastname])

    /*    const conversationStarted = useMemo(() => {
           return format (new Date(otherUser.conversation.createdAt), 'PP')
       },[]) */

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }
        return 'Active';
    }, [data])





    return (
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            />

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className={styles.ProfileDrawerDialog}
                    onClose={onClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter={styles.easeOut}
                        enterFrom={styles.opacity0}
                        enterTo={styles.opacity100}
                        leave={styles.easeIn}
                        leaveFrom={styles.opacity100}
                        leaveTo={styles.opacity0}
                    >
                        <div className={styles.selfClosingDiv} />
                    </Transition.Child>
                    <div className={styles.profileDrawer1}
                    >
                        <div className={styles.profileDrawer2}>
                            <div className={styles.profileDrawer3} >
                                <Transition.Child
                                    as={Fragment}
                                    enter={styles.TransitionEnter}
                                    enterFrom={styles.TransitionEnterFrom}
                                    enterTo={styles.TrnasitionEnterTo}
                                    leave={styles.TransitionLeave}
                                    leaveFrom={styles.TransitionLeaveFrom}
                                    leaveTo={styles.TrnasitionLeaveTo}
                                >
                                    <Dialog.Panel className={styles.DialogPanel}>
                                        <div className={styles.DialogPanelDiv1}>
                                            <div className={styles.DialogPanelDiv2} >
                                                <div className={styles.DialogPanelDiv3}>
                                                    <div className={styles.DialogPanelDiv4}>
                                                        <button className={styles.DaialogPanelCloseButton}
                                                            type="button"
                                                            onClick={onClose}
                                                        >
                                                            <span className={styles.DialogButtonCloseSpan}>Close panel</span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.avatarDiv1}>
                                                <div className={styles.avatarDiv2}>
                                                    <div className={styles.avatarDiv3}>
                                                        {data.isGroup ? (
                                                            <AvatarGroup users={data.users} />
                                                        ) : (
                                                            <Avatar user={otherUser} />
                                                        )}


                                                    </div>
                                                    <div>
                                                        {title} {lastName}
                                                    </div>

                                                    <div className={styles.statusText}>
                                                        {statusText}
                                                    </div>
                                                    <div className={styles.deleteConversation}>
                                                        <div className={styles.deleteConversations2}
                                                            onClick={() => setConfirmOpen(true)}
                                                        >
                                                            <div

                                                                className={styles.deleteConversationTrashIcon}>
                                                                <IoTrash size={20} />
                                                            </div>
                                                            <div className={styles.deleteConversationText}>
                                                                Delete conversation!
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.otherUserEmail1}>
                                                    <dl className={styles.otherUserEmail2}>
                                                        {!data.isGroup && (
                                                            <div>
                                                                <dt className={styles.otherUserEmail3}>
                                                                    Email
                                                                </dt>
                                                                <dd className={styles.otherUserEmail4}>
                                                                    {otherUser.email}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <>
                                                                <hr />
                                                                <div>
                                                                    <dt className={styles.joined} >
                                                                        Joined
                                                                    </dt>
                                                                    <dd className={styles.joinedDate}>
                                                                        <time dateTime={joinedDate}>
                                                                            {joinedDate}
                                                                        </time>
                                                                    </dd>
                                                                </div>
                                                            </>
                                                        )}
                                                    </dl>
                                                </div>

                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer;