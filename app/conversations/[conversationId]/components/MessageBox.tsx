"use client";

import styles from "./messageBox.module.css";

import Avatar from "@/app/components/avatar/avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();


  const isOwn = session.data?.user?.email === data?.sender?.email;
  //console.log("data.seen:", data.seen);
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.firstname)
    .join(", ");

  const container = clsx(styles.container1, isOwn && styles.container2);

  const avatar = clsx(isOwn && styles.order2);

  const body = clsx(styles.messagBoxBody);

  const message = clsx(styles.messagetext,
    isOwn ? styles.ownMessage : styles.othersMessage,
    data.image ? styles.roundedmd : styles.roundedFull);



  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className={styles.nameContainer}>
          <span>{data.sender.firstname}</span>
          <span className={styles.nameContainerLastname}>{data.sender.lastname}</span>
          <div className={styles.dateContainerText}>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className={styles.messageBoxImageStyle}
            />
          ) : (<div>{data.body}</div>)}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className={styles.seenMessageSeenBy}>
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;

// text-xs font-light text-gray-500