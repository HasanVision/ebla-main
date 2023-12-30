'use client';

import clsx from "clsx";
import styles from "./desktopItem.module.css";


import Link from "next/link";

interface DesktopItemProps {
    label?: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean; 
}
const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    return(
        <li onClick={handleClick}>
            <Link className={`${styles.desktopItemLink} ${active ? styles.active : ''}`} 
            href={href}>
                <Icon className={styles.chatIcon} aria-hidden="true" />
            <span className={`${styles.iconSpan} ${styles["sr-only"]}`}>{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;


//<Link className={styles.desktopItemLink} href={href}>
