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
import logo from "../../../public/android-chrome-512x512.png"

const local = localFont({
    src: '../../fonts/handbuck/HandbuckRegular-R99xE.otf',
    display: 'swap',
})

function NavBar() {
    const pathname = usePathname();
    const isDesktop = useMediaQuery('(min-width: 1400px)');

    return (
        <nav className={"col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col h-full"}>
            {isDesktop ? 
                <Link href='/dashboard' className={`${local.className} text-accent ml-7 mt-7 p-1 rounded-md text-3xl font-bold focus:outline-none focus-visible:outline-secondary`}>Cashflow Dojo</Link> :
                <Link href='/dashboard' className={`${local.className} ml-4 mt-4 p-1 rounded-md text-3xl font-bold focus:outline-none focus-visible:outline-secondary`}><Image src={logo} alt='logo' height={45}/></Link>}

            <ul className={"grow ml-4 max-[1400px]:ml-5 flex flex-col mt-10 mb-8 gap-2 font-semibold"}>
                <li className={"flex gap-4 items-center rounded-md"}>
                    <Link href="/dashboard" className={`rounded-md focus:outline-none ${pathname === '/dashboard' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                        <div className={`mt-auto flex border-2 rounded-md gap-3 items-center ${pathname === '/dashboard' ? 'text-accent': ''} ${pathname === '/dashboard' ? 'border-accent': 'border-primary'} py-3 pl-4 pr-16 max-[1400px]:p-3 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                            <TbLayoutDashboardFilled className={"text-2xl"}/>

                            {isDesktop && <p>Overview</p>} 
                        </div>
                    </Link>
                </li>

                <li className={"flex gap-4 items-center rounded-md"}>
                    <Link href="/dashboard/expenses" className={`rounded-md focus:outline-none ${pathname === '/dashboard/expenses' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                        <div className={`mt-auto flex border-2 rounded-md gap-3 items-center ${pathname === '/dashboard/expenses' ? 'text-accent': ''} ${pathname === '/dashboard/expenses' ? 'border-accent': 'border-primary'} py-3 pl-4 pr-16 max-[1400px]:p-3 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                            <FaMoneyBillTransfer className={"text-2xl"}/>

                            {isDesktop && <p>Expenses</p>}
                        </div>
                    </Link>
                </li>

                <li className={"flex gap-4 items-center"}>
                    <Link href="/dashboard/analytics" className={`rounded-md focus:outline-none ${pathname === '/dashboard/analytics' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                        <div className={`mt-auto flex border-2 rounded-md gap-3 items-center ${pathname === '/dashboard/analytics' ? 'text-accent' : ''} ${pathname === '/dashboard/analytics' ? 'border-accent' : 'border-primary'} py-3 pl-4 pr-16 max-[1400px]:p-3 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                            <MdAnalytics className={"text-2xl"}/>

                            {isDesktop && <p>Analytics</p>}
                        </div>
                    </Link>
                </li>

                <li className={"mt-auto flex gap-4 items-center rounded-md"}>
                    <form action={signOutAction}>
                        <button className={"mt-auto flex gap-3 items-center py-3 pl-4 pr-16 max-[1400px]:p-3 rounded-md hover:bg-accent hover:text-primary focus:outline-none focus-visible:outline-accent transition-colors ease-in-out duration-200"} type='submit' >
                            <TbLogout2 className={"text-2xl"}/>
                            
                            {isDesktop && <p>Log out</p>}
                        </button>
                    </form>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar