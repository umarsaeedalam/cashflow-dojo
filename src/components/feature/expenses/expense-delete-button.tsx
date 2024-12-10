'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { FaTrash } from "react-icons/fa"
import { deleteExpense } from "@/lib/actions"

type Props = {
    expense_id: string;
}

function ExpenseDeleteButton({ expense_id }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleCancelSubmit() {
        startTransition(async () => {
            await deleteExpense(expense_id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setOpen(false);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="text-dark-700 p-2 hover:text-red-600 text-lg max-[900px]:text-md rounded-md transition-all focus:outline-none focus-visible:outline-accent-500 ease-in-out duration-100 transform active:scale-90"><FaTrash /></button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0">
                <DialogHeader>
                    <DialogTitle className="text-dark-900 mb-1">Are you absolutely sure?</DialogTitle>

                    <DialogDescription className="text-dark-500">
                        This action cannot be undone. This will permanently delete this
                        expense record from your account.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isPending} className="border tracking-wide font-semibold rounded-lg border-dark-700 bg-dark-700 text-light-50 py-2 px-4 hover:bg-dark-500 hover:border-dark-500 focus:outline-none focus-visible:outline-accent-500 transition-colors transform active:scale-90 ease-in-out duration-100">
                            Cancel
                        </Button>
                    </DialogClose>
                    
                    <Button 
                        onClick={handleCancelSubmit}
                        disabled={isPending} 
                        className="border tracking-wide font-semibold rounded-lg bg-red-600 text-light-50 border-red-600 py-2 px-4 hover:bg-red-700 hover:border-red-700 focus:outline-none focus-visible:outline-dark-700 transition-colors transform active:scale-90 ease-in-out duration-100"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseDeleteButton;