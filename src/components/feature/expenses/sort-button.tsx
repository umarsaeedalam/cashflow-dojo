'use client'

import { useState, Dispatch } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import SortForm from "@/components/feature/expenses/sort-form"
import { FaSortNumericDown } from "react-icons/fa"
import { Action } from "@/utils/types"

type Props = {
    dispatch: Dispatch<Action>;
    sortBy: 'Date' | 'Amount';
    sortDirection: 'Ascending' | 'Descending';
}

function SortButton({ dispatch, sortBy, sortDirection }: Props) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-dark-700 text-light-50 p-2 rounded-lg hover:bg-dark-500 hover:border-dark-500 flex items-center focus:outline-none focus-visible:outline-accent-500 transition-all transform active:scale-90 ease-in duration-100">
                    <FaSortNumericDown className="text-lg max-[630px]:text-xs" />
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0 pb-3">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center tracking-wide">Sort Expenses</DialogTitle>
                </DialogHeader>
                
                <SortForm 
                    handleSetOpen={setOpen} 
                    dispatch={dispatch} 
                    sortDirection={sortDirection} 
                    sortBy={sortBy} 
                />
            </DialogContent>
        </Dialog>
    )
}

export default SortButton