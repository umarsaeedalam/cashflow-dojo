'use client'

import { useReducer } from "react"
import AddExpenseButton from "@/components/ui/add-expense-button"
import ExpensesTable from "./expenses-table"
import FilterButton from "./filter-button"
import SortButton from "./sort-button"
import { reducer } from "@/lib/reducer"
import { User, Expense } from '@/utils/types'

type Props = {
    user: User;
    expenses: Expense[];
    totalPages: number;
    minAmount: number;
    maxAmount: number;
    currentPage: number;
}

function ExpensesPage({ user, expenses, totalPages, minAmount, maxAmount, currentPage }: Props) {
    const [state, dispatch] = useReducer(reducer, {
        originalExpenseList: expenses,
        filteredExpenseList: expenses,
        totalPages: totalPages,
        currentPage: currentPage,
        sortBy: 'Date',
        sortDirection: 'Descending',
        filters: {
            categories: [
                'Housing',
                'Transportation', 
                'Food & Dining', 
                'Healthcare', 
                'Personal Care', 
                'Education', 
                'Entertainment & Leisure', 
                'Technology', 
                'Savings & Investments', 
                'Debt Repayment', 
                'Gifts & Donations'
            ],
            amountRange: [minAmount, maxAmount],
            dateRange: { from: undefined, to: undefined }
        }
    });

    return (
        <div className="pt-2 px-12 max-[1400px]:px-8 max-[1160px]:px-6 max-[900px]:pb-6 overflow-auto">
            <div className="flex items-center justify-between">
                <p className="text-3xl max-[1400px]:text-2xl font-bold">Expenses</p>

                <div className="flex items-center gap-4 max-[630px]:gap-2">
                    <SortButton 
                        dispatch={dispatch} 
                        sortBy={state.sortBy} 
                        sortDirection={state.sortDirection} 
                    />

                    <FilterButton 
                        dispatch={dispatch} 
                        currency={user.currency} 
                        minAmount={state.filters.amountRange[0]} 
                        maxAmount={state.filters.amountRange[1]} 
                        filterConfig={state.filters} 
                    />

                    <AddExpenseButton userId={user.user_id} />
                </div>
            </div>
            
            <ExpensesTable 
                expenses={state.filteredExpenseList} 
                currency={user.currency} 
                pageCount={state.totalPages} 
                dispatch={dispatch} 
                currentPage={state.currentPage}
                userId={user.user_id} 
            />
        </div>
    )
}

export default ExpensesPage;