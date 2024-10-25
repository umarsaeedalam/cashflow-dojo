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
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Sort By</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-secondary border text-secondary rounded-md hover:text-neutral hover:bg-secondary focus:outline-none focus:outline-accent transition-colors ease-in-out duration-200">
                                        <SelectValue placeholder="Select a category" className="placeholder:!text-stone-400" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="bg-secondary text-neutral rounded-md border-secondary">
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
                        <FormLabel className="text-right max-[400px]:text-left font-bold">Direction</FormLabel>

                        <div className="col-span-3 max-[400px]:col-span-4 space-y-1">
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-secondary border text-secondary rounded-md hover:text-neutral hover:bg-secondary focus:outline-none focus:outline-accent transition-colors ease-in-out duration-200">
                                        <SelectValue placeholder="Select a direction" className="placeholder:!text-stone-400" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent className="bg-secondary text-neutral rounded-md border-secondary">
                                    <SelectItem value="Ascending">Ascending</SelectItem>

                                    <SelectItem value="Descending">Descending</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <div className="flex justify-end space-x-2 mt-2">
                    <Button type="button" onClick={onClick} className="border-2 font-semibold rounded-lg border-secondary text-secondary py-2 px-4 hover:bg-secondary hover:text-primary focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                        Reset
                    </Button>
                    
                    <Button type="submit" className="border-2 font-semibold rounded-lg bg-primary text-accent border-accent py-2 px-4 hover:bg-accent hover:text-primary focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200">
                        Apply
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default SortForm;