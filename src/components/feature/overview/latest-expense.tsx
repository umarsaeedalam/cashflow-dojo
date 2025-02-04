'use client'

import dayjs from 'dayjs'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@react-hook/media-query'
import CategoryIcon from "../../ui/category-icon"
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol, utcToLocal } from "@/utils/functions"
import { Expense } from "@/utils/types"
import { useEffect, useState } from 'react'

type Props = {
    expense: Expense;
    currency: string;
}

const expenseVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    out: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

function LatestExpense({ expense, currency }: Props) {
    const [mounted, setMounted] = useState(false)

    const currencySymbol = getCurrencySymbol(currency);
    const formattedDate = utcToLocal(expense.date);
    const amount = formatExpenseAmount(expense.amount)
    const isTablet = useMediaQuery('(max-width: 1160px)');

    useEffect(() => setMounted(true), [])

    return (
        <div className="flex flex-col gap-1 border-b-1 border-dark-500 pt-[7px] pb-[13px] px-2 mb-3 font-semibold">
            <AnimatePresence mode='wait'>
                <motion.div key={expense.amount} variants={expenseVariant} initial={`${mounted ? 'hidden' : ''}`} animate='visible' exit='out' className="text-xs pl-2 text-dark-700 tracking-wide">{dayjs(formattedDate).format("D MMMM, YYYY")}</motion.div>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
                <motion.div key={expense.amount} variants={expenseVariant} initial={`${mounted ? 'hidden' : ''}`} animate='visible' exit='out' className="flex gap-4 px-6 mt-1">
                    {!isTablet && 
                        <div className="h-11 w-11 flex justify-center items-center rounded-xl" style={{ backgroundColor: getCategoryColor(expense.category) }}>
                            <CategoryIcon category={expense.category} />
                        </div> 
                    }

                    <div className="flex flex-col grow">
                        <div className="flex justify-between items-center text-accent">
                            <p className="text-base tracking-wide text-dark-900">{expense.name}</p>

                            <p className="text-base tracking-wide text-dark-900">{`${currencySymbol} ${amount}`}</p>
                        </div>
                            
                        <div className={"text-xs text-dark-500 tracking-wide"}>{expense.category}</div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default LatestExpense