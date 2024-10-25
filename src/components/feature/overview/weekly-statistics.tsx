import ExpenseDistributionChart from "./expense-distribution-chart"
import { getCurrentMonthExpenses } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    allExpenses: Expense[];
    month: string;
}

function MonthlyStatistics({ allExpenses, month }: Props) {
    const data = getCurrentMonthExpenses(allExpenses, month)

    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold text-lg max-[1400px]:text-base">Expense Distribution</p>

            <ExpenseDistributionChart chartData={data} />
        </div>
    )
}

export default MonthlyStatistics;