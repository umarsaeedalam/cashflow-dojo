'use client'

import Image from "next/image"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import localFont from 'next/font/local'
import { useMediaQuery } from '@react-hook/media-query'
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { MdAnalytics } from "react-icons/md"
import { TbLogout2, TbLayoutDashboardFilled } from "react-icons/tb"
import { signOutAction } from '@/lib/actions'
import logo from "../../../public/file.png"

const local = localFont({
    src: '../../fonts/publica-sans/ZPublicaSans.otf',
    display: 'swap',
})

function NavBar() {
    const pathname = usePathname();
    const isDesktop = useMediaQuery('(min-width: 1400px)');

    return (
        <nav className={"col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col h-full"}>
            {isDesktop ? 
                <Link href='/dashboard' className={`${local.className} text-dark-900 ml-7 mt-7 p-1 rounded text-3xl tracking-tight font-bold focus:outline-none focus-visible:outline-dark-700`}>Cashflow Dojo</Link> :
                <Link href='/dashboard' className={`${local.className} ml-4 mt-4 p-1 rounded-md text-3xl font-bold focus:outline-none focus-visible:outline-secondary`}><Image src={logo} alt='logo' height={45}/></Link>}

            <ul className={"grow ml-4 max-[1400px]:ml-5 flex flex-col mt-10 mb-8 gap-2 font-semibold"}>
                <li className={"flex gap-4 items-center"}>
                    <Link href="/dashboard" className={`rounded-lg focus:outline-none ${pathname === '/dashboard' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                        <div className={`mt-auto rounded-lg flex border gap-3 items-center ${pathname === '/dashboard' ? 'text-light-50 bg-accent-500 border-accent-500': 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-100'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}>
                            <TbLayoutDashboardFilled className={"text-2xl"}/>

                            {isDesktop && <p className="tracking-wide">Overview</p>} 
                        </div>
                    </Link>
                </li>

                <li className={"flex gap-4 items-center"}>
                    <Link href="/dashboard/expenses" className={`focus:outline-none rounded-lg ${pathname === '/dashboard/expenses' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                        <div className={`mt-auto flex rounded-lg border gap-3 items-center ${pathname === '/dashboard/expenses' ? 'text-light-50 bg-accent-500 border-accent-500': 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-100'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}>
                            <FaMoneyBillTransfer className={"text-2xl"}/>

                            {isDesktop && <p className="tracking-wide">Expenses</p>}
                        </div>
                    </Link>
                </li>

                <li className={"flex gap-4 items-center"}>
                    <Link href="/dashboard/analytics" className={`focus:outline-none rounded-lg ${pathname === '/dashboard/analytics' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                        <div className={`mt-auto rounded-lg flex border-2 gap-3 items-center ${pathname === '/dashboard/analytics' ? 'text-light-50 bg-accent-500 border-accent-500' : 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-100'} py-3 pl-4 pr-16 max-[1400px]:p-3 transition-colors ease-in-out duration-200`}>
                            <MdAnalytics className={"text-2xl"}/>

                            {isDesktop && <p className="tracking-wide">Analytics</p>}
                        </div>
                    </Link>
                </li>

                <li className={"mt-auto flex gap-4 items-center"}>
                    <form action={signOutAction}>
                        <button className={"mt-auto flex rounded-lg gap-3 items-center py-3 pl-4 pr-16 max-[1400px]:p-3 text-dark-700 hover:bg-accent-300 hover:text-light-100 focus:outline-none focus-visible:outline-accent-500 transition-colors ease-in-out duration-200"} type='submit' >
                            <TbLogout2 className={"text-2xl"}/>
                            
                            {isDesktop && <p className="tracking-wide">Log out</p>}
                        </button>
                    </form>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar

// comment