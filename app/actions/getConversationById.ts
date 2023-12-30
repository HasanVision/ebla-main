import getCurrentUser from "./getCurrentUser";

 
import prisma from "@/app/libs/prismadb";


 const getConversationById = async (
    conversationId: string

    // originally conversationId : String but it gave me errors
 ) => {
    try {
            const currentUser = await getCurrentUser();

            if (!currentUser?.email) {
                return null;
            }
            
            const conversation = await prisma.conversation.findUnique({
                where:{
                    id: conversationId
                },
                include: {
                    users: true
                }
            });
            return conversation;




    } catch (error: any) {
        return console.log(error);
    }
 };

 export default getConversationById;