'use client';

import { User } from "@prisma/client";

import styles from "./userList.module.css";
import UserBox from "./UserBox";
interface UserListProps {
  items: User[]
};

const UserList: React.FC<UserListProps> = ({
  items
}) => {
  return (
    <aside className={styles.userListMain}>
        <div className={styles.userListMain2}>
          <div className={styles.userList3}>
            <div className={styles.userList4}>
                People
            </div>
          </div>
          {items.map((item) => (
            <UserBox
            key={item.id}
            data={item}
            />
          ))}
        </div>
    </aside>

  )
}
 
export default UserList;
 