'use client';
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import styles from "./desktopSidebar.module.css";
import Avatar from "../avatar/avatar";
import SettingModal from "./SettingsModal";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    //console.log({ currentUser })

    return (
        <>
            <SettingModal
                currentUser={currentUser}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className={styles.desktopSidebariMain}  >
                <nav className={styles.desktopSidebarNav} >
                    <ul className={styles.desktopSidebarUl} role="list">
                        {routes.map((item) => (
                            <DesktopItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onclick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className={styles.avatarDesktop}>
                    <div className={styles.openAvatar}
                        onClick={() => setIsOpen(true)}>
                        <Avatar user={currentUser} />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default DesktopSidebar;