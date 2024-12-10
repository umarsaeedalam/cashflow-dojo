'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/shadcn/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { Button } from "@/components/ui/shadcn/button"
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            setOpenD(false);
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="rounded-md p-2 text-dark-700 hover:text-dark-500 ease-in-out transition-colors focus:outline-none focus-visible:outline-secondary duration-200 transform active:scale-90">
                    <BsThreeDotsVertical />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-35 rounded-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-30 border-0 p-1">
                <div className="flex flex-col items-stretch text-sm gap-1">
                    <Dialog open={openV} onOpenChange={setOpenV}>
                            <DialogTrigger asChild>
                                <button className="py-1 px-6 tracking-wide rounded-lg text-dark-700 hover:text-light-50 hover:bg-dark-700 transition-colors ease-in-out duration-100">View</button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px] !rounded-3xl bg-[#CDD5E0] border-0">
                                <DialogHeader>
                                    <DialogTitle className="max-[400px]:text-center tracking-wide">Expense</DialogTitle>
                                </DialogHeader>

                                <ViewExpense 
                                    expense={expense}
                                    currency={currency} 
                                /> 
                            </DialogContent>
                        </Dialog>

                    <Dialog open={openE} onOpenChange={setOpenE}>
                        <DialogTrigger asChild>
                            <button className="py-1 px-6 tracking-wide rounded-lg text-dark-700 hover:text-light-50 hover:bg-dark-700 transition-colors ease-in-out duration-100">Edit</button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] !rounded-3xl bg-[#CDD5E0] border-0">
                            <DialogHeader>
                                <DialogTitle className="max-[400px]:text-center tracking-wide">Edit Expense</DialogTitle>
                            </DialogHeader>

                            <ExpenseEditForm 
                                expense={expense} 
                                handleSetOpen={setOpenE}
                            /> 
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openD} onOpenChange={setOpenD}>
                        <DialogTrigger asChild>
                            <button className="text-dark-700 tracking-wide hover:bg-red-600 hover:text-light-50 py-1 px-6 rounded-lg transition-all focus:outline-none ease-in-out duration-100 transform active:scale-90">Delete</button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0">
                            <DialogHeader>
                                <DialogTitle className="text-dark-900 mb-1 tracking-wide">Are you absolutely sure?</DialogTitle>

                                <DialogDescription className="text-dark-500">
                                    This action cannot be undone. This will permanently delete this
                                    expense record from your account.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex justify-end gap-2">
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
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>
            </PopoverContent>
        </Popover>
    )
}
