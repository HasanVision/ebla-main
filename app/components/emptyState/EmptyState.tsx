import styles from "./emptyState.module.css"




const EmptyState =() => {
    return(
        <div className={styles.chatBox}>
            <div className={styles.chatboxBorder}>
            <h3 className={styles.chath3}>Select a chat or start a new  conversation</h3>
            </div>
        </div>
    )
}

export default EmptyState;