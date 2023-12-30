import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";


import styles from "./sidebar.module.css";
import MobileFooter from "./mobileFooter/mobileFooter";





async function Sidebar({children}: {
children: React.ReactNode;

}) {
    const currentUser = await getCurrentUser();
    return (
        <div style={{height: "100%"}} >
            <DesktopSidebar currentUser={currentUser!}/>
            <MobileFooter/>
           <main className={styles.sidebarMain}>
                {children}
           </main>
                
        </div>
    )
}

export default Sidebar;

