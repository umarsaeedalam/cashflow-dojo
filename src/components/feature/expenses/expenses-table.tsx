'use client'

import React from "react"
import { Dispatch } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import ExpensesPagination from "@/components/feature/expenses/expenses-pagination"
import ExpensesTableRecord from "./expenses-table-record"
import { formatExpenseAmount, getCurrencySymbol, formatExpenseAmountShorter } from "@/utils/functions"
import { Expense, Action } from "@/utils/types"


type Props = {
    expenses: Expense[];
    currency: string;
    pageCount: number;
    dispatch: Dispatch<Action>;
    currentPage: number;
    userId: string;
}

const ITEMS_PER_PAGE = 10;

function ExpensesTable({ expenses, currency, pageCount, dispatch, currentPage, userId }: Props) {
    const isMobile = useMediaQuery('(max-width: 630px)')
    const isMobile2 = useMediaQuery('(max-width: 515px)')

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const totalRow: Expense = {
        user_id: '',
        expense_id: 'total',
        name: 'Total',
        category: '',
        date: new Date(),
        amount: totalAmount
    };

    const expensesWithTotal = [...expenses, totalRow];

    const totalPages = Math.ceil(expensesWithTotal.length / ITEMS_PER_PAGE);
    const displayedExpenses = expensesWithTotal.slice(startIndex, endIndex);

    const currencySymbol = getCurrencySymbol(currency);

    return (
        <>
            <table className="w-full table-auto border-separate border-spacing-y-0 text-left mt-6 max-[1160px]:mt-5 max-[630px]:mt-4">
                <thead className="tracking-wider uppercase text-sm max-[1160px]:text-xs max-[630px]:text-[0.67rem] font-bold">
                    <tr className="font-semibold text-dark-900">
                        <th className="px-6 py-4 max-[1160px]:py-[18px] max-[630px]:py-[19px] w-1/4 rounded-l-2xl max-[900px]:w-1/3 max-[630px]:w-[40%] max-[515px]:hidden bg-white backdrop-filter backdrop-blur-sm bg-opacity-50">Description</th>

                        <th className="py-3 w-1/6 text-center max-[900px]:hidden bg-white backdrop-filter backdrop-blur-sm bg-opacity-50">Category</th>

                        <th className="py-3 max-[515px]:rounded-l-2xl w-1/4 max-[900px]:w-1/3 max-[630px]:w-[25%] max-[515px]:w-[30%] text-center max-[515px]:text-left max-[515px]:pl-8 bg-white backdrop-filter backdrop-blur-sm bg-opacity-50">Date</th>

                        <th className="py-3 w-1/6 max-[900px]:w-1/6 max-[630px]:w-[25%] max-[515px]:w-[50%] text-center bg-white backdrop-filter backdrop-blur-sm bg-opacity-50">Amount</th>

                        <th className="py-3 rounded-r-2xl w-1/6 max-[900px]:w-1/6 max-[630px]:w-[10%] max-[630px]:text-transparent max-[515px]:w-[20%] max-[515px]:text-dark-700 text-center bg-white backdrop-filter backdrop-blur-sm bg-opacity-50">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedExpenses.map((expense) =>
                        expense.expense_id === 'total' ? (
                            <tr key="total" className="text-accent-500 font-bold tracking-wide">
                                <td className="pl-6 py-4 max-[515px]:hidden">{expense.name}</td>

                                <td className="max-[900px]:hidden"></td>

                                <td className="py-4 text-center max-[515px]:text-left max-[515px]:pl-6"> {isMobile2 && expense.name}</td>

                                <td className="py-4 text-center max-[1160px]:text-sm">
                                    {`${currencySymbol} ${formatExpenseAmount(expense.amount)}`}
                                </td>

                                <td className="flex gap-2 py-3 pb-5 max-[630px]:pb-5 justify-center rounded-r-xl border-accent  border-y-2 border-r-2">&nbsp;</td>
                            </tr>
                        ) : (
                            <ExpensesTableRecord
                                expense={expense}
                                currency={currency}
                                key={expense.expense_id}
                            />
                        )
                    )}
                </tbody>
            </table>
            
            <ExpensesPagination
                pageCount={totalPages}
                currentPage={currentPage}
                dispatch={dispatch}
                userId={userId}
            />
        </>
    )
}

export default ExpensesTable;