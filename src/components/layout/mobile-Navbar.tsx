'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import localFont from 'next/font/local'
import { motion } from "framer-motion"
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { MdAnalytics } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import { TbLayoutDashboardFilled, TbLogout2 } from "react-icons/tb"
import { signOutAction } from '@/lib/actions'

const local = localFont({
    src: '../../fonts/publica-sans/ZPublicaSans.otf',
    display: 'swap',
})

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button className='bg-transparent text-dark-700 border border-accent p-2 rounded-md hover:bg-dark-500 hover:border-dark-500 hover:text-light-50 transition-all focus:outline-none focus-visible:!outline-accent-500 transform active:scale-90 ease-in-out duration-200'>
                    <RxHamburgerMenu />
                </button>
            </SheetTrigger>

            <SheetContent side={"left"} className='bg-[#CDD5E0] rounded-r-3xl border-0 text-dark-700 w-[265px] font-semibold pl-4'>
                <nav className={"col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col h-full"}>
                    <Link href='/dashboard' onClick={() => setOpen(false)} className={`${local.className} ml-1 mt-8 text-3xl tracking-tight font-bold text-dark-900 focus:outline-none focus-visible:outline-accent-500 rounded p-1`}>Cashflow Dojo</Link>

                    <ul className={"grow flex flex-col mt-8 mb-8 mr-14 gap-2"}>
                        <li className={"flex gap-4 items-center relative"}>
                            {pathname === '/dashboard' && <motion.div layoutId="nav" className="bg-accent-500 border-accent-500 block absolute inset-0 rounded-lg" />}

                            <Link href="/dashboard" onClick={() => setOpen(false)} className={`rounded-lg focus:outline-none ${pathname === '/dashboard' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                                <div className={`mt-auto rounded-lg text-[0.9375rem] flex gap-2 items-center ${pathname === '/dashboard' ? 'text-light-50': 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-50'} relative z-10 py-3 pl-4 pr-14 transition-colors ease-in-out duration-200`}>
                                    <TbLayoutDashboardFilled className={"text-xl"}/>

                                    <p className='tracking-wide'>Overview</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"flex gap-4 items-center relative"}>
                            {pathname === '/dashboard/expenses' && <motion.div layoutId="nav" className="bg-accent-500 border-accent-500 block absolute inset-0 rounded-lg" />}

                            <Link href="/dashboard/expenses" onClick={() => setOpen(false)} className={`focus:outline-none rounded-lg ${pathname === '/dashboard/expenses' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                                <div className={`mt-auto rounded-lg text-[0.91rem] flex gap-2 items-center ${pathname === '/dashboard/expenses' ? 'text-light-50': 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-50'} relative z-10 py-3 pl-4 pr-14 transition-colors ease-in-out duration-200`}>
                                    <FaMoneyBillTransfer className={"text-xl"}/>

                                    <p className='tracking-wide'>Expenses</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"flex gap-4 items-center relative"}>
                            {pathname === '/dashboard/analytics' && <motion.div layoutId="nav" className="bg-accent-500 block absolute inset-0 rounded-lg" />}

                            <Link href="/dashboard/analytics" onClick={() => setOpen(false)} className={`rounded-lg focus:outline-none ${pathname === '/dashboard/analytics' ? 'focus-visible:outline-dark-700': 'focus-visible:outline-accent-500'}`}>
                                <div className={`mt-auto rounded-lg text-[0.9375rem] flex gap-2 items-center ${pathname === '/dashboard/analytics' ? 'text-light-50' : 'text-dark-700 bg-transparent border-transparent hover:bg-accent-300 hover:text-light-50'} relative z-10 py-3 pl-4 pr-14 transition-colors ease-in-out duration-200`}>
                                    <MdAnalytics className={"text-xl"}/>

                                    <p className='tracking-wide'>Analytics</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"mt-auto flex gap-4 items-center"}>
                            <form action={signOutAction}>
                                <button onClick={() => setOpen(false)} className={"mt-auto rounded-lg text-[0.9375rem] flex gap-2 items-center py-3 pl-4 pr-14 hover:bg-accent-300 hover:text-light-50 transition-colors ease-in-out duration-200"} type='submit' >
                                    <TbLogout2 className={"text-xl"}/>
                                    
                                    <p className='tracking-wide'>Log out</p> 
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
