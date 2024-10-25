'use client'

import { useState } from 'react'
import MonthlyTotal from "@/components/feature/overview/monthly-total"
import MonthlyPicks from "./monthly-picks"
import MonthlyStatistics from "./weekly-statistics"
import { getMonthlyHighestExpense, getMonthlyHighestSpentCategory, getMonthlyLeastSpentCategory, getMonthYearRange } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    allExpenses: Expense[];
    currencySymbol: string;
}

function MonthlySummary({ allExpenses, currencySymbol }: Props) {
    const monthsRange = getMonthYearRange(allExpenses)
    const [month, setMonth] = useState(monthsRange[0])

    return (
        <div className="flex flex-col gap-4 pt-1">
            <MonthlyTotal 
                allExpenses={allExpenses} 
                currencySymbol={currencySymbol} 
                monthsRange={monthsRange} 
                month={month} 
                handleSetMonth={setMonth} 
            />

            <MonthlyPicks 
                highestExpense={getMonthlyHighestExpense(allExpenses, month)} 
                highestSpent={getMonthlyHighestSpentCategory(allExpenses, month)}
                leastSpent={getMonthlyLeastSpentCategory(allExpenses, month)}
                symbol={currencySymbol}
            />

            <MonthlyStatistics 
                allExpenses={allExpenses}
                month={month} 
            />
        </div>
    )
}

export default MonthlySummary;