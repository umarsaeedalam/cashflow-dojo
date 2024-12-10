'use client'

import { useMediaQuery } from '@react-hook/media-query'
import LatestExpense from "@/components/feature/overview/latest-expense"
import AddExpenseButton from "@/components/ui/add-expense-button"
import { getLatestExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    userId: string;
    currency: string;
    allExpenses: Expense[];
}

function LatestExpenses({ userId, currency, allExpenses }: Props) {
    const isMobile = useMediaQuery('(max-width: 960px)');
    const latestExpenses = getLatestExpenses(allExpenses)

    if (isMobile) {
        return null;
    }

    return(
        <div className="pt-4 rounded-3xl">
            <div className="flex justify-between items-center pb-4 max-[1280px]:pb-4">
                <h2 className="text-xl max-[1400px]:text-lg font-bold tracking-wide">Recent Expenses</h2>

                <AddExpenseButton userId={userId} />
            </div>

            {latestExpenses.map((expense) => (
                <LatestExpense 
                    key={expense.expense_id} 
                    expense={expense} 
                    currency={currency} 
                />
            ))}
        </div>       
    )
}

export default LatestExpenses