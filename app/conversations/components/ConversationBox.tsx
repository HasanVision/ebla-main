"use client";

import clsx from "clsx";

import styles from "./conversationBox.module.css"

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/avatar/avatar";
import AvatarGroup from "@/app/components/avatarGroup/AvatarGroup";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean;
}


const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1]
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    },
        [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }

        if (lastMessage?.body) {
            return lastMessage.body;

        }

        return "Started a conversation";
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={clsx(styles.conversationBox, {
                [styles.conversationBoxSelected]: selected,
            })}
        >
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser} />
            )}

            <div className={styles.conversationBox1}>
                <div className={styles.conversationBox2}>
                    <div className={styles.conversationBox3}>
                        <p className={styles.conversationBoxUserName}>
                            {data.name || (
                                <>
                                    <span className={styles.conversationBoxFirstname}>{otherUser.firstname}</span>
                                    <span className={styles.conversationBoxLastname}> {otherUser.lastname}</span>
                                </>
                            )}

                        </p>
                    </div>
                    {lastMessage?.createdAt && (
                        <p className={styles.createdAt}>
                            {format(new Date(lastMessage.createdAt), `p`)}
                        </p>
                    )}
                </div>
                <p className={clsx(
                    styles.lastMessageText,

                    { [styles.hasSeen]: hasSeen }
                )}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    )
}

export default ConversationBox;

// styles.lastMessageText