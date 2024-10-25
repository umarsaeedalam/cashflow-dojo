'use client'

import { Dispatch, SetStateAction } from 'react'
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

function MonthlyTotal({ allExpenses, currencySymbol, monthsRange, month, handleSetMonth }: Props) {
    const monthlyTotal = calculateMonthlyTotalExpenses(allExpenses, month)

    return (
        <div className="flex flex-col gap-5 max-[1400px]:gap-4 max-[645px]:gap-3">
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl max-[1400px]:text-3xl max-[645px]:text-2xl font-bold">Overview</h1>

                <MonthButton 
                    month={month} 
                    handleSetMonth={handleSetMonth} 
                    monthsRange={monthsRange} 
                />
            </div>

            <div className="flex flex-col justify-center gap-2 border-secondary border-2 rounded-xl py-8 max-[1400px]:py-7 max-[1160px]:py-6 px-12 max-[1400px]:px-11 max-[1160px]:px-10">
                <p className="text-lg max-[1160px]:text-base text-secondary font-semibold">Total Expenses</p>

                <p className="text-5xl max-[1160px]:text-4xl font-bold text-accent">{`${currencySymbol} ${monthlyTotal}`}</p>

                <p className="max-[1160px]:text-sm text-secondary-shade font-semibold">{month}</p>
            </div>
        </div>
    )   
}

export default MonthlyTotal;