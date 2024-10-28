import Layout from "@/components/layout/layout";
import { auth } from "@/lib/auth";
import { fetchUser } from "@/lib/data";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const user = await fetchUser(session?.user?.email, session?.user?.name)

    return (
        <Layout 
            content={children} 
            user={user} 
            profilePicture={session?.user?.image} 
        />
    );
}

export default DashboardLayout;