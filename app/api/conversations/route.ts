import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// ... (other parts of the code)

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      // Create a new group conversation without checking for existing conversations
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }
    // For one-on-one conversations, check for existing conversations
    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: userId } } },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    } else {

      // If no existing conversation is found, create a new one-on-one conversation
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              { id: currentUser.id },
              { id: userId },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }
  }
  catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
