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
                <button className="text-primary border border-accent hover:border-accent-shade bg-accent hover:bg-accent-shade p-2 rounded-md transition-all focus:outline-none focus-visible:outline-secondary ease-in-out duration-200 transform active:scale-90"><FaTrash /></button>
            </DialogTrigger>
            <DialogContent className="max-w-[450px] !rounded-md bg-primary border-primary">
                <DialogHeader>
                    <DialogTitle className="text-accent mb-1">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-secondary ">
                        This action cannot be undone. This will permanently delete this
                        expense record from your account.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isPending} className="border font-semibold rounded-lg border-secondary bg-secondary text-neutral py-2 px- hover:bg-secondary-shade hover:border-secondary-shade focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        onClick={handleCancelSubmit}
                        disabled={isPending} 
                        className="border font-semibold rounded-lg bg-accent text-primary border-accent py-2 px-4 hover:bg-accent-shade hover:border-accent-shade focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseDeleteButton;