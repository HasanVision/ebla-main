import getConversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";
import { FullMessageType, FullConversationType } from "../types"; // Make sure to import the correct types
import { User } from "@prisma/client";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  /*   const fullConversations: FullConversationType[] = conversations.map((conversation) => ({
      ...conversation,
      users: conversation.users as User[],
      messages: conversation.messages as FullMessageType[],
    })); */

  return (
    <Sidebar>
      <div style={{ height: "100vh" }}>
        <ConversationList
          users={users}
          initialItems={conversations}
        // users={[]}
        />
        {children}
      </div>
    </Sidebar>
  );
}
