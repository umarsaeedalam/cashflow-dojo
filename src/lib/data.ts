import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import prisma from "../../prisma/client"
import { User } from '@/utils/types'

// Configure dayjs for timezone handling
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Fetches or creates a user based on email
 * Creates a new user if one doesn't exist with default currency USD
 */
import { Prisma } from '@prisma/client'

export async function fetchUser(email: string | undefined | null, name: string | undefined | null): Promise<User> {
    if (!email) {
        throw Error('Email is required to fetch or create a user')
    }

    try {
        // Try to find existing user first
        let user = await prisma.user.findUnique({ 
            where: { email } 
        })

        // Create new user if none exists
        if (user === null) {
            try {
                user = await prisma.user.create({
                    data: {
                        email,
                        name: name || "Anonymous",
                        currency: "USD"
                    }
                })
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && 
                    error.code === 'P2002') {
                    // If creation fails due to race condition, try to fetch again
                    user = await prisma.user.findUnique({
                        where: { email }
                    })
                    if (!user) {
                        throw error // Re-throw if user still doesn't exist
                    }
                } else {
                    throw error // Re-throw other errors
                }
            }
        }

        return user
    } catch (error) {
        throw error
    }
}

/**
 * Retrieves the 6 most recent expenses for a user
 */
export async function fetchLatestExpenses(userId: string) {
    try {
        return await prisma.expense.findMany({
            where: { user_id: userId },
            orderBy: { date: 'desc' },
            take: 6
        })
    } catch (error) {
        throw error
    }
}

/**
 * Fetches all expenses for a user with pagination and amount range
 * Includes validation of current page number
 */
export async function fetchAllUserExpenses(userId: string, currentPage: number) {
    const PAGE_SIZE = 10

    // Fetch all expenses sorted by date
    const expenses = await prisma.expense.findMany({
        where: { user_id: userId },
        orderBy: { date: 'desc' },
    })
   
    // Include total row in count
    const totalCount = expenses.length + 1
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)
   
    // Validate and correct page number if needed
    let validatedPage = currentPage
    if (currentPage < 1 || currentPage > totalPages) {
        validatedPage = 1
        await prisma.user.update({
            where: { user_id: userId },
            data: { currentPage: 1 }
        })
    }
   
    // Get expense amount range
    const amountAggregations = await prisma.expense.aggregate({
        where: { user_id: userId },
        _min: { amount: true },
        _max: { amount: true }
    })
   
    const minAmount = amountAggregations._min.amount ?? 0
    const maxAmount = amountAggregations._max.amount ?? 0

    return {
        expenses,
        totalPages,
        minAmount,
        maxAmount,
        randomNumber: Math.floor(Math.random() * 1000000),
        currentPage: validatedPage
    }
}