import React from 'react'
import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"
import CategoryIcon from "@/components/ui/category-icon"
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol } from "@/utils/functions"

type Props = {
    data: { amount: number; description: string; }[];
    currency: string;
    handleCard: Dispatch<SetStateAction<number>>;
}

function HighestExpensePerCategory({ data, currency, handleCard }: Props) {
    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-0 text-dark-700 text-xl tracking-wide text-center">
                <CardTitle className='flex justify-center items-center gap-5 max-[800px]:gap-3'>
                    <button
                        onClick={() => handleCard((card) => card - 1)}
                        className="flex items-center justify-center bg-dark-700 text-light-50 border-dark-700 border rounded-lg w-7 max-[800px]:w-6 h-7 max-[800px]:h-6 hover:bg-dark-500 hover:border-dark-500 cursor-pointer focus:outline-none focus-visible:outline-accent-500 transition-colors ease-in-out transform active:scale-90 duration-100"
                    >
                        <HiArrowSmLeft />
                    </button>

                    <h2 className='max-[800px]:text-lg max-[500px]:text-base tracking-wide'>What&rsquo;s Costing You the Most</h2>

                    <button
                        onClick={() => handleCard((card) => card + 1)} 
                        className="flex items-center justify-center bg-dark-700 text-light-50 border-dark-700 border rounded-lg w-7 max-[800px]:w-6 h-7 max-[800px]:h-6 hover:bg-dark-500 hover:border-dark-500 cursor-pointer focus:outline-none focus-visible:outline-accent-500 transition-colors ease-in-out transform active:scale-90 duration-100">
                        <HiArrowSmRight />
                    </button>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-6 max-[1400px]:mt-5 text-accent font-semibold tracking-wide">
                <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-2">
                    {categories.map((category, index) => (
                        <div key={category} className="flex items-center justify-between bg-white backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-3xl p-4 max-[800px]:p-3 max-[500px]:p-2 pr-8 max-[800px]:pr-6 max-[500px]:pr-4">
                            <div className="flex items-center gap-3 max-[800px]:gap-2">
                                <div className="h-11 max-[800px]:h-10 max-[500px]:h-9 w-11 max-[800px]:w-10 max-[500px]:w-9 flex justify-center items-center rounded-xl" style={{ backgroundColor: getCategoryColor(category) }}>
                                    <CategoryIcon
                                        category={category}
                                        classname="text-2xl max-[800px]:text-xl max-[500px]:text-lg"
                                    />
                                </div>

                                <div className='max-[500px]:text-sm'>
                                    {data[index].description}
                                </div>
                            </div>
                            
                            <div className='max-[500px]:text-sm'>
                                {data[index].amount !== 0 && `${getCurrencySymbol(currency)} ${formatExpenseAmount(data[index].amount)}`}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default HighestExpensePerCategory;