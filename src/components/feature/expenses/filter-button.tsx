'use client'

import { useState, Dispatch } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import { FaFilterCircleDollar } from "react-icons/fa6"
import FilterForm from "./filter-form"
import { Action } from "@/utils/types"

type Props = { 
    dispatch: Dispatch<Action>;
    currency: string;
    minAmount: number;
    maxAmount: number;
    filterConfig: {
        categories: string[];
        amountRange: [number, number];
        dateRange: {
            from?: Date | undefined;
            to?: Date | undefined;
        };
    }
}

function FilterButton({ dispatch, currency, minAmount, maxAmount, filterConfig }: Props) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-dark-700 border-dark-700 border text-light-50 p-2 rounded-lg hover:bg-dark-500 hover:border-dark-500 flex items-center focus:outline-none focus-visible:outline-accent-500 transition-all transform active:scale-90 ease-in-out duration-100">
                    <FaFilterCircleDollar className="text-[17px] max-[630px]:text-[11px]" />
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0]">
                <DialogHeader>
                    <DialogTitle className="max-[425px]:text-center tracking-wide">Filter Expenses</DialogTitle>
                </DialogHeader>
                
                <FilterForm 
                    handleSetOpen={setOpen} 
                    dispatch={dispatch} 
                    minAmount={minAmount} 
                    maxAmount={maxAmount} 
                    currency={currency} 
                    filterConfig={filterConfig} 
                />
            </DialogContent>
        </Dialog>
    )
}

export default FilterButton