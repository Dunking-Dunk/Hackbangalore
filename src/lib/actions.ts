// @ts-nocheck

"use server"
import { db } from "./db"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

const getUserSession = async() => {
    const session = await getServerSession(authOptions)
    return session?.user
}

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

export const getCompany = async(id: any) => {
    const company = await db.company.findUnique({
        where: {
            userId: id
        }
    })

    return company
}

export const createLoan = async(loan: any) => {
    const user = await getUserSession()
    const company = await getCompany(user?.id)

    return await db.loan.create({
        data: {
            ...loan,
            user: {
                connect: {
                        id: user?.id
                }
            },
            company: {
                connect: {
                        id: company?.id
                }
            }
        }
    })
}

export const getAllLoan = async() => {
    const user = await getUserSession()
    return await db.loan.findMany({
        where: {
            userId: user?.id
        }
    })
}

export const getEveryLoan = async() => {
    return await db.loan.findMany({})
}

export const getLoan = async(id) => {
    return await db.loan.findFirst({
        where: {
            id: id
        }
    })
}