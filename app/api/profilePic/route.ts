/* import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Method Not Allowed
    }

    const userId = req.headers.authorization;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const { image } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { image },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error while updating user profile image:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
 */