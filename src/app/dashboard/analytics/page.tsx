import type { Metadata } from "next"
import AnalyticsSection from '@/components/feature/analytics/analytics-section'
import { auth } from '@/lib/auth'
import { fetchUser, fetchAllUserExpenses } from "@/lib/data"

const metadata: Metadata = {
    title: 'Analytics'
}

async function AnalyticsPage() {
    const session = await auth()
    
    const user = await fetchUser(session?.user?.email, session?.user?.name)
    const { expenses } = await fetchAllUserExpenses(user.user_id, user.currentPage)
    
    return (
        <AnalyticsSection 
            expenses={expenses}
            currency={user.currency} 
        />
    );
}

export default AnalyticsPage;

export { metadata };
