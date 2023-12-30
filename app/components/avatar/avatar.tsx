'use client';

import { User } from "@prisma/client";

import Image from "next/image";

import styles from "./avatar.module.css";

interface AvatarProps {
  user?: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {

  return (
    <div className={styles.avatarMain}>
      <div className={styles.avatarSec}>
        <Image

          fill
          src={user?.image || '/images/placeholder.jpeg'}
          alt="Avatar"
        />
      </div>
      <span
        className={styles.avatarSpan}
      />
    </div>
  );
}

export default Avatar;