'use client'

import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import MonthButton from '@/components/ui/month-button'
import { calculateMonthlyTotalExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    allExpenses: Expense[];
    currencySymbol: string;
    monthsRange: string[];
    month: string;
    handleSetMonth: Dispatch<SetStateAction<string>>
}

const cardVariants = {
    hidden: {
        rotateX: 90,
    },
    visible: {
        rotateX: 0,
        transition: {
            duration: 0.25, 
            ease: 'linear'
        }
    },
    out: {
        rotateX: 90,
        transition: {
            duration: 0.25, 
            ease: 'linear'
        }
    }
}

const totalVariant = {
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
            duration: 0.5
        }
    }
}

function MonthlyTotal({ allExpenses, currencySymbol, monthsRange, month, handleSetMonth }: Props) {
    const [mount, setMount] = useState(false)

    const monthlyTotal = calculateMonthlyTotalExpenses(allExpenses, month)

    useEffect(() => setMount(true), [])

    return (
        <div className="flex flex-col gap-5 max-[1400px]:gap-4 max-[645px]:gap-3">
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl max-[1400px]:text-3xl max-[645px]:text-2xl font-bold tracking-wide">Overview</h1>

                <MonthButton 
                    month={month} 
                    handleSetMonth={handleSetMonth} 
                    monthsRange={monthsRange} 
                />
            </div>

            <AnimatePresence mode='wait'>
                <motion.div key={month} variants={cardVariants} initial={`${mount && 'hidden'}`} animate='visible' exit='out' className="flex flex-col backface-hidden justify-center gap-3 bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 perspective-midrange rounded-3xl py-8 max-[1400px]:py-7 max-[1160px]:py-6 px-12 max-[1400px]:px-11 max-[1160px]:px-10">
                    <p className="text-lg max-[1160px]:text-base text-dark-700 font-semibold tracking-wide">Total Expenses</p>

                    <AnimatePresence mode='wait'>
                        <motion.p key={monthlyTotal} variants={totalVariant} initial={`${mount && 'hidden'}`} animate='visible' exit='out' className="text-5xl max-[1160px]:text-4xl font-bold text-dark-900 tracking-wide">{`${currencySymbol} ${monthlyTotal}`}</motion.p>
                    </AnimatePresence>

                    <p className="max-[1160px]:text-sm text-dark-500 font-semibold tracking-wide">{month}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    )   
}

export default MonthlyTotal;