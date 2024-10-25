'use server'

import { revalidatePath } from 'next/cache'
import { auth } from "@/lib/auth"
import { signOut, signIn } from '@/lib/auth'
import prisma from "../../prisma/client"
import { editProfileSchemaServer, newExpenseSchemaServer } from '@/utils/schemas'
import { EditProfile, UserExpense } from "@/utils/types"

/* Authentication Actions */
export async function signInGoogle() {
    await signIn("google", { redirectTo: "/dashboard" })
}

export async function signInGithub() {
    await signIn("github", { redirectTo: "/dashboard" })
} 

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}

/* Profile Management */
export async function editProfile({ id, username, currency }: EditProfile) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    // Validate input data
    if (!editProfileSchemaServer.safeParse({ id, username, currency }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        await prisma.user.update({
            where: { user_id: id },
            data: { 
                currency,
                name: username 
            }
        })
        revalidatePath('/dashboard', 'layout')
    } catch (error) {
        return Error
    } 
}

/* Expense Management */
export async function newExpense(userId: string, data: UserExpense) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    // Validate expense data
    if (!newExpenseSchemaServer.safeParse({ 
        id: userId,
        description: data.description,
        amount: data.amount,
        date: data.date,
        category: data.category 
    }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        await prisma.expense.create({
            data: {
                user_id: userId,
                name: data.description,
                category: data.category,
                date: data.date,
                amount: data.amount 
            },
        })

        revalidatePath('/', 'layout')
    } catch (error) {
        throw error
    }
}

export async function editExpense(expense_id: string, data: UserExpense) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    // Validate expense data
    if (!newExpenseSchemaServer.safeParse({ 
        id: expense_id,
        description: data.description,
        amount: data.amount,
        date: data.date,
        category: data.category 
    }).success) {
        throw Error('Invalid Data/ExpenseID')
    }

    try {
        await prisma.expense.update({
            where: { expense_id },
            data: {
                name: data.description,
                amount: data.amount,
                date: data.date,
                category: data.category
            }
        })
      
        revalidatePath('/', 'layout')
    } catch (error) {
        throw error
    }
}

export async function deleteExpense(expenseId: string) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    try {
        await prisma.expense.delete({
            where: { expense_id: expenseId }
        })

        revalidatePath('/', 'layout')
    } catch (error) {
        return error
    }
}

/* Pagination Management */
export async function updatePageNumber(userId: string, currentPage: number, updatedPage: number) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    try {
        await prisma.user.updateMany({
            where: { user_id: userId },
            data: { currentPage: updatedPage }
        })
    } catch (error) {
        throw error
    }
}