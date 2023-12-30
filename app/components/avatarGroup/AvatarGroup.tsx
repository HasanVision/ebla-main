" use client"

import Image from "next/image";
import styles from "./avatarGroup.module.css"

import { User } from "@prisma/client";

interface AvatarGroupProps {
    users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
    users = []
}) => {

    const slicedUsers = users.slice(0, 3);

    const positionMap = {
        0: styles["top-left"],
        1: styles.bottom,
        2: styles["bottom-right"]
    }
    return (
        <div style={{ position: "relative", height: "2.75rem", width: "2.75rem" }}>
            {slicedUsers.map((user, index) => (
                <div
                    key={user.id}
                    className={`${styles.GroupChatImage} ${positionMap[index as keyof typeof positionMap]}`}

                >
                    <Image
                        fill
                        src={user?.image || '/images/placeholder.jpeg'}
                        alt="GroupAvatar" />
                </div>
            ))}
        </div>
    );
}

export default AvatarGroup;