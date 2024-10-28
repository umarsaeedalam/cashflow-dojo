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
                <button className="text-primary border border-accent hover:border-accent-shade bg-accent hover:bg-accent-shade p-2 rounded-md transition-all focus:outline-none focus-visible:outline-secondary ease-in-out duration-200 transform active:scale-90"><FaEdit /></button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-md bg-primary border-primary">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center">Edit Expesnse</DialogTitle>
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
