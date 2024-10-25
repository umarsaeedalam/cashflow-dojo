import type { Metadata } from "next"
import ExpensesPage from "@/components/feature/expenses/expenses-page"
import { auth } from "@/lib/auth"
import { fetchUser, fetchAllUserExpenses } from "@/lib/data"

const metadata: Metadata = {
    title: 'Expenses'
}

async function Expenses() {
    const session = await auth()
    
    const user = await fetchUser(session?.user?.email, session?.user?.name)
    const {expenses, totalPages, minAmount, maxAmount, randomNumber, currentPage} = await fetchAllUserExpenses(user.user_id, user.currentPage)

    return (
        <ExpensesPage 
            user={user} 
            expenses={expenses} 
            totalPages={totalPages} 
            minAmount={minAmount} 
            maxAmount={maxAmount}
            key={randomNumber} 
            currentPage={currentPage}
        />
    );
}

export default Expenses;

export { metadata };
















