'use client'

import { Dispatch, SetStateAction } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/shadcn/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"
import { Action } from "@/utils/types"


type Props = {
    handleSetOpen: Dispatch<SetStateAction<boolean>>;
    dispatch: Dispatch<Action>;
    sortBy: 'Date' | 'Amount';
    sortDirection: 'Ascending' | 'Descending';
  }

const FormSchema = z.object({
    sortBy: z.enum(['Date', 'Amount']),
    direction: z.enum(['Ascending', 'Descending'])
})

function SortForm({ handleSetOpen, dispatch, sortBy, sortDirection }: Props) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sortBy: sortBy,
            direction: sortDirection
        },
      })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        dispatch({type: 'sort', payload: data})
        handleSetOpen(false);
    }

    function onClick() {
        dispatch({type: 'sort', payload: {sortBy: 'Date', direction: 'Descending'}})
        handleSetOpen(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="sortBy" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold tracking-wide">Sort By</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="text-dark-700 bg-light-50 tracking-wide rounded-lg focus:outline-none transition-colors ease-in-out duration-200">
                                        <SelectValue placeholder="Select a category" className="placeholder:!text-stone-400" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="rounded-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-30 border-0">
                                    <SelectItem value="Date">Date</SelectItem>

                                    <SelectItem value="Amount">Amount</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="direction" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[400px]:text-left font-bold tracking-wide">Direction</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="text-dark-700 bg-light-50 tracking-wide rounded-lg focus:outline-none transition-colors ease-in-out duration-200">
                                        <SelectValue placeholder="Select a direction" className="placeholder:!text-stone-400" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="rounded-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-30 border-0">
                                    <SelectItem value="Ascending">Ascending</SelectItem>

                                    <SelectItem value="Descending">Descending</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <div className="flex justify-end space-x-2 mt-2">
                    <Button type="button" onClick={onClick} className="border tracking-wide font-semibold rounded-lg border-dark-700 text-light-50 bg-dark-700 py-2 px-4 hover:bg-dark-500 hover:border-dark-500 focus:outline-none focus-visible:outline-accent-500 transition-colors transform active:scale-90 ease-in-out duration-100">
                        Reset
                    </Button>
                    
                    <Button type="submit" className="border tracking-wide font-semibold rounded-lg bg-accent-500 text-light-50 border-accent-500 py-2 px-4 hover:bg-accent-600 hover:border-accent-600 focus:outline-none focus-visible:outline-dark-700 transition-colors transform active:scale-90 ease-in-out duration-100">
                        Apply
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default SortForm;