import CategoryLabel from "./category-label"
import { Label } from "@/components/ui/shadcn/label"
import { getCurrencySymbol, utcToLocal, formatExpenseAmount } from "@/utils/functions"
import { Expense } from "@/utils/types";

type Props = {
    expense: Expense;
    currency: string;
}

function ViewExpense({ expense, currency }: Props) {
    const currencySymbol = getCurrencySymbol(currency);

    return (
        <div className="flex flex-col gap-4 mt-4 font-semibold text-sm">
            <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 items-center">
                <Label className="font-semibold text-right">Description:</Label>

                <p className="text-accent col-span-3">{expense.name}</p>
            </div>

            <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 items-center">
                <Label className="font-semibold text-right">Category:</Label>

                <p className="text-accent col-span-3"><CategoryLabel category={expense.category} /></p>
            </div>

            <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 items-center text-[14px]">
                <Label className="font-semibold text-right">Date:</Label>

                <p className="text-accent col-span-3">{utcToLocal(expense.date)}</p>
            </div>

            <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-2 items-center text-[14px]">
                <Label className="font-semibold text-right">Amount:</Label>

                <p className="text-accent col-span-3">{`${currencySymbol} ${formatExpenseAmount(expense.amount)}`}</p>
            </div>
    </div>
    )
}

export default ViewExpense;
