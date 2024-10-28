'use client'

import { useState, useTransition } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/shadcn/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { BsThreeDotsVertical } from "react-icons/bs"
import { deleteExpense } from "@/lib/actions"
import ExpenseEditForm from "./expense-edit-form"
import { Expense } from "@/utils/types"
import ViewExpense from "./view-expense"

type Props = {
    expense: Expense;
    currency: string;
}

export default function EditAndDeleteButton({ expense, currency }: Props) {
    const [openV, setOpenV] = useState(false);
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
                <button className="rounded-md border p-1 border-accent text-primary bg-accent hover:bg-accent-shade hover:border-accent-shade ease-in-out transition-colors focus:outline-none focus-visible:outline-secondary duration-200 transform active:scale-90">
                    <BsThreeDotsVertical />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-35 !rounded-md bg-accent border-accent p-1">
                <div className="flex flex-col items-stretch text-sm gap-1">
                    <Dialog open={openV} onOpenChange={setOpenV}>
                            <DialogTrigger asChild>
                                <button className="py-1 px-6 rounded-md text-primary hover:text-accent hover:bg-primary transition-colors ease-in-out duration-200">View</button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px] !rounded-md bg-primary border-primary">
                                <DialogHeader>
                                    <DialogTitle className="max-[400px]:text-center">Expense</DialogTitle>
                                </DialogHeader>

                                <ViewExpense 
                                    expense={expense}
                                    currency={currency} 
                                /> 
                            </DialogContent>
                        </Dialog>

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
                                <AlertDialogTitle className="text-accent">Are you absolutely sure?</AlertDialogTitle>

                                <AlertDialogDescription className="text-accent">
                                    This action cannot be undone. This will permanently delete this
                                    expense record from your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className="flex items-center">
                                <AlertDialogCancel className="mt-0 border rounded-lg bg-secondary text-neutral border-secondary font-bold py-2 px-4 hover:bg-secondary-shade hover:border-secondary-shade focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                                    Cancel
                                </AlertDialogCancel>
                                
                                <AlertDialogAction onClick={handleCancelSubmit} className="border rounded-lg bg-accent text-primary border-accent font-bold py-2 px-4 hover:bg-accent-shade hover:border-accent-shade focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200">
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
