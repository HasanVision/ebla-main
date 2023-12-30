"use client"

import clsx from "clsx";

import styles from "./Conversationpage.module.css";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/emptyState/EmptyState";

const Home = () => {
    const { isOpen } = useConversation();



    return (
          <div className={clsx(styles.conversationMain, 
            isOpen? styles.hidden : styles.block
          )}>
            <EmptyState/>
          </div>
    );
};

export default Home;


