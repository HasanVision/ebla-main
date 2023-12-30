import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
    image: string | null;
    body: string | null;
    createdAt: Date;
};

export type FullConversationType = Conversation & {
    id: string;
    lastMessageAt: Date | null;
    name: string | null;
    isGroup: boolean | null;
    createdAt: Date;
    users: User[];

    messages: FullMessageType[],
};