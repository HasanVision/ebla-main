'use client';

import Avatar from "@/app/components/avatar/avatar";
import styles from "./header.module.css"

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/avatarGroup/AvatarGroup";

interface HeaderProps {
  conversation: Conversation & { users: User[] }
}

const Header: React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDdrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return 'Active';
  }, [conversation])

  return (

    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDdrawerOpen(false)}
      />
      <div className={styles.headerConversation}>
        <div className={styles.headerConversation2}>
          <Link className={styles.headerConversationLink}
            href="/conversations">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className={styles.headerConversation3}>
            <div>
              <p className={styles.headerConversationName}>
                {conversation.name || (
                  <>
                    <span>{otherUser.firstname}</span>
                    <span className={styles.headerConversationLastname}>{otherUser.lastname}</span>
                  </>
                )}

              </p>
              {/*               {conversation.name || [otherUser.firstname, otherUser.lastname]} */}
            </div>
            <div className={styles.activeStatus}>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => { setDdrawerOpen(true) }}
          className={styles.horisontalIcon} />
      </div>
    </>
  )
}


export default Header;