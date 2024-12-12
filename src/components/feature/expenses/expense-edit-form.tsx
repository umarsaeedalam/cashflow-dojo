'use client'

import { Dispatch, SetStateAction, useTransition } from 'react'
import { format } from "date-fns"
import dayjs from 'dayjs'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"
import { editExpense } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { newExpenseSchemaClient } from "@/utils/schemas"
import { Expense } from "@/utils/types"
import '../../../styles/CustomNumberInput.css'

type Props = {
    expense: Expense;
    handleSetOpen: Dispatch<SetStateAction<boolean>>
}

const userTimeZone = dayjs.tz.guess()

function ExpenseEditForm({ expense, handleSetOpen }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newExpenseSchemaClient>>({
        resolver: zodResolver(newExpenseSchemaClient),
        defaultValues: {
            description: expense.name,
            amount: expense.amount.toString(),
            date: expense.date,
            category: expense.category
        },
      })

    function onSubmit(data: z.infer<typeof newExpenseSchemaClient>) {
        startTransition(async () => {
            const formattedData = {...data, amount: parseFloat(data.amount)};
            await editExpense(expense.expense_id, formattedData)
            await new Promise(resolve => setTimeout(resolve, 1000));
            handleSetOpen(false);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold tracking-wide">Description</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <FormControl>
                                <Input placeholder="Enter expense description" {...field} className="text-dark-700 rounded-lg bg-light-50 max-[500px]:text-sm placeholder:text-dark-300 focus:!outline-none" />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="amount" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold ">Amount</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} className="max-[500px]:text-sm text-dark-700 bg-light-50 rounded-lg placeholder:text-dark-300 focus:!outline-none" />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold tracking-wide">Date</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Popover>
                                <PopoverTrigger asChild className="!font-normal bg-light-50 text-dark-700 rounded-lg placeholder:text-dark-300 focus:!outline-none">
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left", !field.value && "text-muted-foreground")}>
                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}

                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-100" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0 rounded-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-30 border-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dayjs.utc(field.value).tz(userTimeZone).toDate()}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold tracking-wide">Category</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="text-dark-700 bg-light-50 rounded-lg focus:outline-none transition-colors ease-in-out duration-200">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent onWheel={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} className="rounded-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-30 border-0">
                                    <SelectItem value="Housing">Housing</SelectItem>
                                    <SelectItem value="Household Items">Household Items</SelectItem>
                                    <SelectItem value="Utilities">Utilities</SelectItem>
                                    <SelectItem value="Groceries">Groceries</SelectItem>
                                    <SelectItem value="Dining Out">Dining Out</SelectItem>
                                    <SelectItem value="Transportation">Transportation</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="Wellness & Fitness">Wellness & Fitness</SelectItem>
                                    <SelectItem value="Beauty & Grooming">Beauty & Grooming</SelectItem>
                                    <SelectItem value="Savings & Investments">Savings & Investments</SelectItem>
                                    <SelectItem value="Insurance & Protection">Insurance & Protection</SelectItem>
                                    <SelectItem value="Entertainment & Leisure">Entertainment & Leisure</SelectItem>
                                    <SelectItem value="Travel & Vacation">Travel & Vacation</SelectItem>
                                    <SelectItem value="Clothing & Accessories">Clothing & Accessories</SelectItem>
                                    <SelectItem value="Technology">Technology</SelectItem>
                                    <SelectItem value="Gifts & Donations">Gifts & Donations</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>
                
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="bg-accent-500 tracking-wide font-semibold text-light-50 border rounded-lg mt-2 text-right border-accent-500 hover:bg-accent-600 hover:border-accent-600 !outline-none focus-visible:!outline-dark-700 transition-all ease-in duration-100 transform active:scale-90">
                        {isPending ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ExpenseEditForm;