import { useMediaQuery } from '@react-hook/media-query'
import CategoryLabel from "./category-label"
import EditAndDeleteButton from './edit-and-delete-button'
import ExpenseDeleteButton from "./expense-delete-button"
import ExpenseEditButton from "./expense-edit-button"
import { formatExpenseAmount, getCurrencySymbol, utcToLocal, utcToLocalShorter, formatExpenseAmountShorter } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
    currency: string
}

function ExpensesTableRecord({ expense, currency }: Props) {
    const isMobile = useMediaQuery('(max-width: 630px)')
    const currencySymbol = getCurrencySymbol(currency);

    return (
        <tr className="text-accent font-semibold max-[1160px]:text-sm tracking-wide">
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
        </tr>
    )
}

export default ExpensesTableRecord;