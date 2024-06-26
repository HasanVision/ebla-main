import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST (
    request: Request
) {
    try {
    const body = await request.json();
    const {firstname, lastname, email, password} = body;

    if ( !firstname || !lastname || !email || !password) {
        return new NextResponse('Missing info', {status: 400});
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            firstname,
            lastname,
            email,
            hashedPassword,
        },
    });
    return NextResponse.json(user);
} catch(error: any) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Internal Error', {status: 500})
}
}