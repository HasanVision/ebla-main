"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

 import styles from "./userBox.module.css";
import Avatar from "@/app/components/avatar/avatar";

interface UserBoxProps {
    data: User
}


const UserBox: React.FC<UserBoxProps> = ({
    data
}) =>{

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = useCallback(() =>{
        setIsLoading(true);

        axios.post(`/api/conversations`, {
            userId:data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(() => setIsLoading(false));
    },[data, router])
    
    
    
    
    return(
        <div onClick={handleClick}
        className={styles.UserBox1}>
           <Avatar user={data}/>
           <div className={styles.userBox2}>
                <div className={styles.userBox3}>
                    <div className={styles.userBox4}>
                        <p className={styles.userBoxFirstname}>
                            {data.firstname}
                        </p>
                        <div className={styles.userBoxLastname}>
                            <p >
                        {data.lastname}
                        </p> 
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
} 

export default UserBox;