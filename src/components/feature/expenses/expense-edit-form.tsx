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
            handleSetOpen(false);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Description</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <FormControl>
                                <Input placeholder="Enter expense description" {...field} className="border border-secondary text-secondary rounded-md placeholder:text-secondary focus:!outline-none focus-visible:!outline-accent" />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="amount" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Amount</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} className="border border-secondary text-secondary rounded-md max-[500px]:text-sm placeholder:text-secondary focus:!outline-none focus-visible:!outline-accent" />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Date</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Popover>
                                <PopoverTrigger asChild className="!font-normal border bg-primary border-secondary text-secondary rounded-md placeholder:text-secondary/50 focus:!outline-none focus-visible:!outline-accent">
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left hover:bg-secondary hover:text-neutral", !field.value && "text-muted-foreground")}>
                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}

                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-100" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0 rounded-md border-secondary bg-secondary" align="start">
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
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Category</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-secondary border text-secondary rounded-md hover:text-neutral hover:bg-secondary focus:outline-none focus-visible:outline-accent transition-colors ease-in-out duration-00">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent onWheel={(e) => e.stopPropagation()} className="bg-secondary text-neutral rounded-md border-secondary">
                                    <SelectItem value="Housing">Housing</SelectItem>
                                    <SelectItem value="Transportation">Transportation</SelectItem>
                                    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="Entertainment & Leisure">Entertainment & Leisure</SelectItem>
                                    <SelectItem value="Technology">Technology</SelectItem>
                                    <SelectItem value="Savings & Investments">Savings & Investments</SelectItem>
                                    <SelectItem value="Debt Repayment">Debt Repayment</SelectItem>
                                    <SelectItem value="Gifts & Donations">Gifts & Donations</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>
                
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="bg-primary font-semibold text-accent border-2 rounded-lg mt-2 text-right border-accent hover:bg-accent hover:text-primary !outline-none focus-visible:!outline-secondary transition-all ease-in duration-200 transform active:scale-90">
                        {isPending ? 'Updating...' : 'Update Expense'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ExpenseEditForm;