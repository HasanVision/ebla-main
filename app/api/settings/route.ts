import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            firstname,
            lastname,
            image
        } = body;

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });

        }
        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                firstname: firstname,
                lastname: lastname    //// find out how to add first and last name woooooorkeddddd
            }
        });
        return NextResponse.json(updateUser);

    } catch (error: any) {
        console.log(error, "Error_Settings");
        return new NextResponse('Internal Error', { status: 500 });
    }
}