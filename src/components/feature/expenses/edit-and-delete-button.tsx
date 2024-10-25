'use client'

import { useState, useTransition } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/shadcn/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { BsThreeDotsVertical } from "react-icons/bs"
import { deleteExpense } from "@/lib/actions"
import ExpenseEditForm from "./expense-edit-form"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
}

export default function EditAndDeleteButton({ expense }: Props) {
    const [openE, setOpenE] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleCancelSubmit() {
        startTransition(async () => {
            await deleteExpense(expense.expense_id);
            setOpenD(false);
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="rounded-md border-2 p-1 border-accent text-accent bg-primary hover:bg-accent hover:text-primary ease-in-out transition-colors focus:outline-none focus-visible:outline-secondary duration-200">
                    <BsThreeDotsVertical />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-35 !rounded-md bg-accent border-accent p-1">
                <div className="flex flex-col items-stretch text-sm gap-1">
                    <Dialog open={openE} onOpenChange={setOpenE}>
                        <DialogTrigger asChild>
                            <button className="py-1 px-6 rounded-md text-primary hover:text-accent hover:bg-primary transition-colors ease-in-out duration-200">Edit</button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] !rounded-md bg-primary border-primary">
                            <DialogHeader>
                                <DialogTitle className="max-[400px]:text-center">Edit Expense</DialogTitle>
                            </DialogHeader>

                            <ExpenseEditForm 
                                expense={expense} 
                                handleSetOpen={setOpenE}
                            /> 
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={openD} onOpenChange={setOpenD}>
                        <AlertDialogTrigger asChild>
                            <button className="py-1 px-6 rounded-md text-primary hover:text-accent hover:bg-primary transition-colors ease-in-out duration-200">Delete</button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="!rounded-md bg-primary border-primary">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                                <AlertDialogDescription className="text-accent">
                                    This action cannot be undone. This will permanently delete this
                                    expense record from your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="flex items-center">
                                <AlertDialogCancel className="mt-0 border-2 rounded-lg bg-primary text-secondary border-secondary font-bold py-2 px-4 hover:bg-secondary hover:text-primary focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                                    Cancel
                                </AlertDialogCancel>
                                
                                <AlertDialogAction onClick={handleCancelSubmit} className="border-2 rounded-lg bg-primary text-accent border-accent font-bold py-2 px-4 hover:bg-accent hover:text-primary focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200">
                                    {isPending ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </PopoverContent>
        </Popover>
    )
}
