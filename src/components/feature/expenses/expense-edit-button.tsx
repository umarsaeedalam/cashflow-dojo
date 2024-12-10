'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import { FaEdit } from "react-icons/fa"
import ExpenseEditForm from "./expense-edit-form"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
}

function ExpenseEditButton({ expense }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-dark-700 hover:text-dark-500 text-lg max-[900px]:text-md rounded-md transition-all focus:outline-none focus-visible:outline-accent-500 ease-in-out duration-100 transform active:scale-90"><FaEdit /></button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center tracking-wide">Edit Expesnse</DialogTitle>
                </DialogHeader>
                
                <ExpenseEditForm 
                    expense={expense} 
                    handleSetOpen={setOpen}
                /> 
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseEditButton;
