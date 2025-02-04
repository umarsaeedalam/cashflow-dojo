'use client'

import { useMediaQuery } from '@react-hook/media-query'
import { motion, AnimatePresence } from 'framer-motion'
import CategoryLabel from "./category-label"
import EditAndDeleteButton from './edit-and-delete-button'
import ExpenseDeleteButton from "./expense-delete-button"
import ExpenseEditButton from "./expense-edit-button"
import { formatExpenseAmount, getCurrencySymbol, utcToLocal, utcToLocalShorter, formatExpenseAmountShorter } from "@/utils/functions"
import { Expense } from "@/utils/types"
import { useEffect, useState } from 'react'

type Props = {
    expense: Expense;
    currency: string
}

const recordAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
    out: {
        opacity: 0,
        transition: {
            duration: 5.5
        }
    }
}

function ExpensesTableRecord({ expense, currency }: Props) {
    const [mounted, setMounted] = useState(false)
    const isMobile = useMediaQuery('(max-width: 630px)')

    const currencySymbol = getCurrencySymbol(currency);

    useEffect(() => setMounted(true), [])

    return (
        <AnimatePresence mode='wait'>
            <motion.tr key={expense.expense_id} variants={recordAnimation} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-accent font-semibold max-[1160px]:text-sm tracking-wide">
                <td className="pl-6 py-4 border-dark-500 border-b-1 max-[515px]:hidden">{expense.name}</td>

                <td className="text-center border-dark-500 border-b-1 max-[900px]:hidden"><CategoryLabel category={expense.category} /></td>

                <td className="py-4 text-center max-[515px]:text-left max-[515px]:pl-6 border-dark-500 border-b-1">{isMobile ? utcToLocalShorter(expense.date) : utcToLocal(expense.date)}</td>

                <td className="py-4 text-center border-dark-500 border-b-1">{`${currencySymbol} ${isMobile ? formatExpenseAmount(expense.amount) : formatExpenseAmount(expense.amount)}`}</td>

                <td className="flex py-3 max-[630px]:pb-4 justify-center border-dark-500 border-b-1">
                    {isMobile ? 
                        <EditAndDeleteButton 
                            expense={expense}
                            currency={currency}     
                        /> :
                        <div className='flex gap-2'>
                            <ExpenseEditButton expense={expense} />

                            <ExpenseDeleteButton expense_id={expense.expense_id} />
                        </div>
                    }
                </td>
            </motion.tr>
        </AnimatePresence>
    )
}

export default ExpensesTableRecord;