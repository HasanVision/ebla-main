'use client'
import  {FullMessageType } from "@/app/types";
import styles from "./body.module.css";
import { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}


const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const buttomRef = useRef<HTMLDivElement>(null)
  
  const { conversationId } = useConversation();
  
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId]); 
  
  return ( 
    <div className={styles.bodyMain}>
      {messages.map((message, i) => (
        <MessageBox
        isLast={i === messages.length - 1}
        key={message.id}
        data={message} />
      ))}
          <div ref={buttomRef} className={styles.bodyMain2}/>
    </div>
  )
}

export default Body
