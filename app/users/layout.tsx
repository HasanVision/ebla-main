import UserList from "@/app/users/components/userList";
import Sidebar from "../../app/components/sidebar/SideBar";
import getUsers from "../actions/getUsers";


export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();



    return(
    
          
        <Sidebar>
            <div style={{height: '100%'}}>
                <UserList items={users}/>
                {children}
            </div>  
        </Sidebar> 
 
    )
}