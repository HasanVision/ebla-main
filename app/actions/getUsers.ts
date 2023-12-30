 import prisma from "@/app/libs/prismadb";

 import getSession from "./getSession";

 const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },

            // to remove the current user from the list ... OOOOomg it killed me
            where: {
                NOT: {
                    email:session.user.email
                }
            }
        });
        
        return users;

    } catch (error: any) {
        return [];
    }
 }

 export default getUsers;