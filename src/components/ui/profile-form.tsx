"use client"

import { Dispatch, SetStateAction, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/shadcn/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"
import { editProfile } from "@/lib/actions"
import { editProfileSchemaClient } from '@/utils/schemas'
import { User } from "@/utils/types"

type Props = {
    user: User;
    handleSetOpen: Dispatch<SetStateAction<boolean>>;
}

function ProfileForm({ user, handleSetOpen}: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof editProfileSchemaClient>>({
        resolver: zodResolver(editProfileSchemaClient),
        defaultValues: { 
            username: user.name, 
            currency: user.currency,
            email: user.email 
        },
    })

    function onSubmit(data: z.infer<typeof editProfileSchemaClient>) {
        startTransition(async () => {
            await editProfile({ 
                id: user.user_id,
                username: data.username, 
                currency: data.currency 
            })
            handleSetOpen(false)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4 gap-y-1">
                        <FormLabel className="max-[500px]:text-sm text-right max-[500px]:text-left font-bold">Username</FormLabel>

                        <FormControl className="col-span-3 max-[500px]:col-span-4">
                            <Input placeholder="Username" {...field} className="bg-primary border border-secondary text-secondary rounded-md max-[500px]:text-sm placeholder:text-secondary/50 !outline-none" />
                        </FormControl>

                        <FormMessage className="col-span-4"/>
                    </FormItem>
                )}
                />

                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4 gap-y-1 outline-none focus-visible:!outline-accent">
                        <FormLabel className="max-[500px]:text-sm text-right max-[500px]:text-left font-bold">Email</FormLabel>

                        <FormControl className="col-span-3 max-[500px]:col-span-4">
                            <Input placeholder="Email" {...field} disabled className="bg-primary border border-secondary text-secondary rounded-md max-[500px]:text-sm placeholder:text-secondary/50 !outline-none" />
                        </FormControl>

                        <FormMessage className="col-span-4"/>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="currency" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4 gap-y-1">
                        <FormLabel className="max-[500px]:text-sm text-right max-[500px]:text-left font-bold">Currency</FormLabel>

                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger className="max-[500px]:text-sm col-span-3 max-[500px]:col-span-4 border rounded-md bg-primary border-secondary py-1 px-3 transition-colors ease-in-out duration-200 flex gap-4 focus:outline-none">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                            </FormControl>
                            
                            <SelectContent className="rounded-md bg-secondary" onWheel={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                                <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
                                <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                                <SelectItem value="BRL">Brazilian Real (BRL)</SelectItem>
                                <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                                <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                                <SelectItem value="CNY">Chinese Yuan (CNY)</SelectItem>
                                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                <SelectItem value="GBP">British Pound Sterling (GBP)</SelectItem>
                                <SelectItem value="HKD">Hong Kong Dollar (HKD)</SelectItem>
                                <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                                <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                                <SelectItem value="MXN">Mexican Peso (MXN)</SelectItem>
                                <SelectItem value="PKR">Pakistani Rupee (PKR)</SelectItem>
                                <SelectItem value="RUB">Russian Ruble (RUB)</SelectItem>
                                <SelectItem value="SAR">Saudi Riyal (SAR)</SelectItem>
                                <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                                <SelectItem value="USD">United States Dollar (USD)</SelectItem>
                                <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
                            </SelectContent>
                        </Select>

                        <FormMessage className="col-span-4"/>
                    </FormItem>
                    )}/>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="bg-accent hover:bg-accent-shade font-semibold text-primary border-2 rounded-lg mt-2 text-right border-accent hover:border-accent-shade !outline-none focus-visible:!outline-secondary transition-all ease-in-out duration-200 transform active:scale-90">{isPending ? 'Updating...' : 'Save'}</Button>
                </div>
            </form>
        </Form>
    )
}

export default ProfileForm;