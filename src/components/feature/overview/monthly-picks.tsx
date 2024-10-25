import { GoArrowUp, GoArrowDown } from "react-icons/go"
import { TbNumber1 } from "react-icons/tb"
import { formatExpenseAmount } from "@/utils/functions"

type Props = {
    highestExpense: { amount: number; name: string; };
    highestSpent: { category: string; total: number; }
    leastSpent: { category: string; total: number; }
    symbol: string;
}

function MonthlyPicks({ highestExpense, highestSpent, leastSpent, symbol }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold text-lg max-[1400px]:text-base">Key Insights</p>
            
            <div className="flex max-[645px]:flex-col gap-4 max-[645px]:gap-2 max-[1400px]:gap-3">
                <div className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 border-2 border-secondary rounded-xl">
                    <div className="bg-accent p-1 rounded-full mr-3">
                        <TbNumber1 className="text-primary text-xl max-[1400px]:text-lg font-bold"/>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <p className="text-xs text-secondary">Costliest Expense</p>

                        <p className="text-lg text-accent">{(highestExpense.amount === 0) ? '-' : `${symbol} ${formatExpenseAmount(highestExpense.amount)}`}</p>

                        <p className="text-xs text-secondary-tint">{(highestExpense.amount === 0) ? '\u00A0' : highestExpense.name}</p>
                    </div>
                </div>

                <div className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 border-2 rounded-xl border-secondary">
                    <div className="bg-accent p-1 rounded-full mr-3">
                        <GoArrowUp className="text-primary text-xl max-[1400px]:text-lg font-bold"/>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <p className="text-xs text-secondary">Dominant Category</p>

                        <p className="text-lg text-accent">{(highestSpent.total === 0) ? '-' : `${symbol} ${formatExpenseAmount(highestSpent.total)}`}</p>

                        <p className="text-xs text-secondary-tint">{(highestSpent.total === 0) ? '\u00A0' : highestSpent.category}</p>
                    </div>
                </div>

                <div className="flex items-center w-1/3 max-[645px]:w-full py-3 px-4 border-2 rounded-xl border-secondary">
                    <div className="bg-accent p-1 rounded-full mr-3">
                        <GoArrowDown className="text-primary text-xl max-[1400px]:text-lg font-bold"/>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <p className="text-xs text-secondary">Minimal Category</p>

                        <p className="text-lg text-accent">{(leastSpent.total === 0) ? '-' : `${symbol} ${formatExpenseAmount(leastSpent.total)}`}</p>
                        
                        <p className="text-xs text-secondary-tint">{(leastSpent.total === 0) ? '\u00A0' : leastSpent.category}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyPicks;