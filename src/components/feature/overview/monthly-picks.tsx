'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import { GoArrowUp, GoArrowDown } from "react-icons/go"
import { TbNumber1 } from "react-icons/tb"
import { formatExpenseAmount } from "@/utils/functions"

type Props = {
    highestExpense: { amount: number; name: string; };
    highestSpent: { category: string; total: number; }
    leastSpent: { category: string; total: number; }
    symbol: string;
    month: string;
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

const pickVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7
        }
    },
    out: {
        opacity: 0,
        transition: {
            duration: 0.7
        }
    }
}

function MonthlyPicks({ highestExpense, highestSpent, leastSpent, symbol, month }: Props) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold text-lg max-[1400px]:text-base tracking-wide">Key Insights</p>
            
            <div className="flex max-[645px]:flex-col gap-4 max-[645px]:gap-2 max-[1400px]:gap-3">
                <AnimatePresence mode='wait'>
                    <motion.div key={month} variants={cardVariants} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-2xl">
                        <div className="bg-dark-700 p-1 rounded-full mr-3">
                            <TbNumber1 className="text-light-50 text-xl max-[1400px]:text-lg font-bold"/>
                        </div>

                        <div className="flex flex-col font-semibold">
                            <p className="text-xs text-dark-700 tracking-wide">Costliest Expense</p>

                            <AnimatePresence mode='wait'>
                                <motion.p key={highestExpense.amount} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-lg text-dark-900 tracking-wide">{(highestExpense.amount === 0) ? '-' : `${symbol} ${formatExpenseAmount(highestExpense.amount)}`}</motion.p>
                            </AnimatePresence>

                            <AnimatePresence mode='wait'>
                                <motion.p key={highestExpense.name} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-xs text-dark-500 tracking-wide">{(highestExpense.amount === 0) ? '\u00A0' : highestExpense.name}</motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    <motion.div key={month} variants={cardVariants} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-2xl">
                        <div className="bg-dark-700 p-1 rounded-full mr-3">
                            <GoArrowUp className="text-light-50 text-xl max-[1400px]:text-lg font-bold"/>
                        </div>

                        <div className="flex flex-col font-semibold">
                            <p className="text-xs text-dark-700 tracking-wide">Dominant Category</p>

                            <AnimatePresence mode='wait'>
                                <motion.p key={highestSpent.total} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-lg text-dark-900 tracking-wide">{(highestSpent.total === 0) ? '-' : `${symbol} ${formatExpenseAmount(highestSpent.total)}`}</motion.p>
                            </AnimatePresence>

                            <AnimatePresence mode='wait'>
                                <motion.p key={highestSpent.category} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-xs text-dark-500 tracking-wide">{(highestSpent.total === 0) ? '\u00A0' : highestSpent.category}</motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    <motion.div key={month} variants={cardVariants} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-2xl">
                        <div className="bg-dark-700 p-1 rounded-full mr-3">
                            <GoArrowDown className="text-light-50 text-xl max-[1400px]:text-lg font-bold"/>
                        </div>

                        <div className="flex flex-col font-semibold">
                            <p className="text-xs text-dark-700 tracking-wide">Minimal Category</p>

                            <AnimatePresence mode='wait'>
                                <motion.p key={leastSpent.total} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-lg text-dark-900 tracking-wide">{(leastSpent.total === 0) ? '-' : `${symbol} ${formatExpenseAmount(leastSpent.total)}`}</motion.p>
                            </AnimatePresence>

                            <AnimatePresence mode='wait'>
                                <motion.p key={leastSpent.category} variants={pickVariant} initial={`${mounted && 'hidden'}`} animate='visible' exit='out' className="text-xs text-dark-500 tracking-wide">{(leastSpent.total === 0) ? '\u00A0' : leastSpent.category}</motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MonthlyPicks;