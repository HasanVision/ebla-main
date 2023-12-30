


import EmptyState from "../components/emptyState/EmptyState";
import styles from "./page.module.css"


const Users =() =>{
    return(

            <div className={styles.emptyStatePage} >
                <EmptyState />        
            </div>
    )
}

export default Users;