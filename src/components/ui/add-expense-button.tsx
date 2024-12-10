'use client'

import { useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import ExpenseForm from "@/components/ui/expense-form"
import { FiPlus } from "react-icons/fi";

type Props = {
    userId: string;
}

function AddExpenseButton({ userId }: Props) {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 630px)')
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="">
                <button className="border font-semibold tracking-wide rounded-lg text-sm max-[1400px]:text-xs ml-2 bg-accent-500 border-accent-500 text-light-50 py-2 px-4 max-[630px]:p-2 hover:bg-accent-600 hover:border-accent-600 transition-all ease-in-out duration-200 focus:outline-none focus-visible:!outline-dark-700 transform active:scale-90">
                    {isMobile ? <FiPlus className="text-lg" /> : 'Add New Expense'}
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center tracking-wide">Add New Expense</DialogTitle>
                </DialogHeader>
                
                <ExpenseForm 
                    userId={userId} 
                    handleSetOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddExpenseButton