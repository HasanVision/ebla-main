import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import styles from "./page.module.css"
import EmptyState from "@/app/components/emptyState/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";



interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className={styles.conversation}>
        <div className={styles.conversation2}>
            <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.conversation3}>
      <div className={styles.conversation4}>
        <Header conversation={conversation} />
        <Body initialMessages={messages}/>
        <Form/>
      </div>
    </div>
  ); 
};

export default ConversationId;
