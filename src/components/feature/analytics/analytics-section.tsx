'use client'

import { useState } from 'react'
import MonthButton from '@/components/ui/month-button'
import ExpenseFrequencyPerCategory from './expense-frequency-per-category'
import HighestExpensePerCategory from './highest-expense-per-category'
import MonthlyExpensesPerCategory from './monthly-expenses-per-category'
import { getMonthYearRange, calculateCategoryTotals, processMonthlyTopExpenses, processExpenseFrequency } from "@/utils/functions"
import { Expense } from '@/utils/types'

type Props = {
    expenses: Expense[];
    currency: string;
}

function AnalyticsSection({ expenses, currency }: Props) {
    const monthsRange = getMonthYearRange(expenses)

    const [month, setMonth] = useState(monthsRange[0])
    const [card, setCard] = useState(1);

    return (
        <div className="pt-3 px-12 max-[1400px]:px-8 max-[1160px]:px-6 max-[800px]:pb-6">
            <div className="mb-2 max-[1400px]:mb-4 flex justify-between items-center">
                <h1 className="text-3xl max-[1400px]:text-2xl max-[800px]:text-xl font-bold">Analytics</h1>

                <MonthButton 
                    month={month} 
                    handleSetMonth={setMonth} 
                    monthsRange={monthsRange} 
                />
            </div>

            {(card === 1) && <MonthlyExpensesPerCategory 
                data={calculateCategoryTotals(expenses, month)}
                currency={currency}
                handleCard={setCard}
            />}

            {(card === 2) && <HighestExpensePerCategory
                data={processMonthlyTopExpenses(expenses, month)}
                currency={currency}
                handleCard={setCard}
            />}
            
            {(card === 3) && <ExpenseFrequencyPerCategory
                data={processExpenseFrequency(expenses, month)}
                handleCard={setCard}
            />}
        </div>
    )
}

export default AnalyticsSection;