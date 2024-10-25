'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import localFont from 'next/font/local'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { MdAnalytics } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import { TbLayoutDashboardFilled, TbLogout2 } from "react-icons/tb"
import { signOutAction } from '@/lib/actions'

const local = localFont({
    src: '../../fonts/handbuck/HandbuckRegular-R99xE.otf',
    display: 'swap',
})

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button className='bg-primary text-accent border-2 border-accent p-2 rounded-md hover:bg-accent hover:text-primary transition-all focus:outline-none focus-visible:!outline-secondary transform active:scale-90 ease-in-out duration-200'>
                    <RxHamburgerMenu />
                </button>
            </SheetTrigger>

            <SheetContent side={"left"} className='bg-primary text-secondary border-primary rounded-r-lg w-[235px] font-semibold'>
                <nav className={"col-start-1 col-end-2 row-start-1 row-end-3 flex flex-col h-full"}>
                    <Link href='/dashboard' onClick={() => setOpen(false)} className={`${local.className} ml-2 mt-8 text-2xl font-bold text-accent focus:outline-none focus-visible:outline-secondary rounded-md p-1`}>Cashflow Dojo</Link>

                    <ul className={"grow flex flex-col mt-10 mb-8 gap-2"}>
                        <li className={"flex gap-4 items-center"}>
                            <Link href="/dashboard" onClick={() => setOpen(false)} className={`rounded-md focus:outline-none ${pathname === '/dashboard' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                                <div className={`mt-auto border-2 text-sm flex gap-2 items-center ${pathname === '/dashboard' ? 'text-accent': ''} ${pathname === '/dashboard' ? 'border-accent': 'border-primary'} py-3 pl-4 pr-10 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                                    <TbLayoutDashboardFilled className={"text-xl"}/>

                                    <p>Overview</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"flex gap-4 items-center"}>
                            <Link href="/dashboard/expenses" onClick={() => setOpen(false)} className={`rounded-md focus:outline-none ${pathname === '/dashboard/expenses' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                                <div className={`mt-auto border-2 text-sm flex gap-2 items-center ${pathname === '/dashboard/expenses' ? 'text-accent': ''} ${pathname === '/dashboard/expenses' ? 'border-accent': 'border-primary'} py-3 pl-4 pr-10 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                                    <FaMoneyBillTransfer className={"text-xl"}/>

                                    <p>Expenses</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"flex gap-4 items-center"}>
                            <Link href="/dashboard/analytics" onClick={() => setOpen(false)} className={`rounded-md focus:outline-none ${pathname === '/dashboard/analytics' ? 'focus-visible:outline-secondary': 'focus-visible:outline-accent'}`}>
                                <div className={`mt-auto border-2 text-sm flex gap-2 items-center ${pathname === '/dashboard/analytics' ? 'text-accent' : ''} ${pathname === '/dashboard/analytics' ? 'border-accent' : 'border-primary'} py-3 pl-4 pr-10 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200`}>
                                    <MdAnalytics className={"text-xl"}/>

                                    <p>Analytics</p>
                                </div>
                            </Link>
                        </li>

                        <li className={"mt-auto flex gap-4 items-center"}>
                            <form action={signOutAction}>
                                <button onClick={() => setOpen(false)} className={"mt-auto text-sm flex gap-2 items-center py-3 pl-4 pr-10 rounded-md hover:bg-accent hover:text-primary transition-colors ease-in-out duration-200"} type='submit' >
                                    <TbLogout2 className={"text-xl"}/>
                                    
                                    <p>Log out</p> 
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
