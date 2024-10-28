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
                <button className="bg-accent border-accent border text-primary p-2 rounded-md hover:bg-accent-shade hover:border-accent-shade flex items-center focus:outline-none focus-visible:outline-secondary transition-all transform active:scale-90 ease-in-out duration-200">
                    <FaFilterCircleDollar className="text-lg max-[630px]:text-xs" />
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] bg-primary border border-primary !rounded-xl text-secondary">
                <DialogHeader>
                    <DialogTitle className="max-[425px]:text-center">Filter Expenses</DialogTitle>
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