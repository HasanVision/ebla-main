'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import styles from "./conversationList.module.css";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";
import GroupChatModal from "./groupChat/GroupChatModel";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();




  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          styles.conversationList1,
          isOpen ? styles.conversationList1 : styles.block
        )}
      >
        <div className={styles.conversationList2}>
          <div className={styles.conversationList3}>
            <div className={styles.conversationList4}>
              Messages
            </div>
            <div
              onClick={() => { setIsModalOpen(true) }}
              className={styles.conversationListGroupeIcon}>
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          <div className={styles.conversationBoxGap}>
            {items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))}
          </div>

        </div>
      </aside>
    </>

  )
}

export default ConversationList;
