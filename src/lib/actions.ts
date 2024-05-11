"use server"
import { db } from "./db"

export const setupBuisness = async(data:any) => {
    await db.company.create({
        data: {
            name: data.name,
            email: data.email,
            address: data.address,
            userId: data.userId
        }
    })
}

export const currentUser = async(id: any) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            company: true
        }
    })

    return user
}