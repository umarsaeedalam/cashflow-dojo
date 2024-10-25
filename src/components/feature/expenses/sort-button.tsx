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
                <button className="bg-primary border-accent border-2 text-accent p-2 rounded-md hover:bg-accent hover:text-primary flex items-center focus:outline-none focus-visible:outline-secondary transition-all transform active:scale-90 ease-in duration-200">
                    <FaSortNumericDown className="text-lg max-[630px]:text-xs" />
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] bg-primary border border-primary !rounded-xl text-secondary pb-3">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center">Sort Expenses</DialogTitle>
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