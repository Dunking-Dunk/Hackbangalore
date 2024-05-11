import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from 'bcrypt'

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();

        const data = body;

        if (!data.email || !data.password) {
            return new NextResponse("Missing data", { status: 500 });
        }

        const userAlreadyExist = await db.user.findFirst({
            where: {
                email: data.email,
            }
        })

        if (userAlreadyExist?.id) {
            return new NextResponse("User already exist", { status: 500 });
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        const newUser = await db.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });

        return NextResponse.json(newUser);

    } catch (err: any) {
        console.log("REGISTER_ERR: " + err);
        return new NextResponse(err, { status: 500 });
    }
}