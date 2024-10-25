'use client'

import { useState, useTransition } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/shadcn/alert-dialog"
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
            setOpen(false);
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className="text-accent hover:text-primary border-2 border-accent hover:bg-accent p-2 rounded-md transition-all focus:outline-none focus-visible:outline-secondary ease-in-out duration-200 transform active:scale-90"><FaTrash /></button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-[450px] !rounded-md bg-primary border-primary">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                    <AlertDialogDescription className="text-accent">
                        This action cannot be undone. This will permanently delete this
                        expense record from your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="border-2 font-semibold rounded-lg border-secondary bg-primary text-secondary py-2 px-4 hover:bg-secondary hover:text-primary focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleCancelSubmit} className="border-2 font-semibold rounded-lg bg-primary text-accent border-accent py-2 px-4 hover:bg-accent hover:text-primary focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200">
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ExpenseDeleteButton;