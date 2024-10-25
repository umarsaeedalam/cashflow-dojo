import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"
import CategoryIcon from "@/components/ui/category-icon"
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor } from "@/utils/functions"

type Props = {
    data: number[];
    handleCard: Dispatch<SetStateAction<number>>;
}

function ExpenseFrequencyPerCategory({ data, handleCard }: Props) {
    return (
        <Card className="bg-primary border-0 shadow-none">
            <CardHeader className="p-0 text-secondary text-xl text-center">
                <CardTitle className='flex justify-center items-center gap-5 max-[800px]:gap-3'>
                    <button
                        onClick={() => handleCard((card) => card - 1)}
                        className="flex items-center justify-center bg-primary border-2 border-accent text-accent rounded-md w-7 max-[800px]:w-6 h-7 max-[800px]:h-6 hover:bg-accent hover:text-primary cursor-pointer focus:outline-none focus-visible:outline-secondary transition-colors ease-in-out transform active:scale-90 duration-200"
                    >
                        <HiArrowSmLeft />
                    </button>

                    <h2 className="max-[800px]:text-lg max-[500px]:text-base">How Often You Spend</h2>

                    <button
                        disabled 
                        className="flex items-center justify-center bg-primary text-primary rounded-md w-7 max-[800px]:w-6 h-7 max-[800px]:h-6 hover:bg-primary hover:text-primary focus:outline-none transition-colors ease-in-out duration-200"
                    >
                        <HiArrowSmRight />
                    </button>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-6 max-[1400px]:mt-5 text-accent font-semibold">
                <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-2">
                    {categories.map((category, index) => (
                        <div key={category} className="flex items-center justify-between border-secondary border-2 rounded-xl p-4 max-[800px]:p-3 max-[500px]:p-2 pr-8 max-[800px]:pr-6 max-[500px]:pr-4">
                            <div className="flex items-center gap-3 max-[800px]:gap-2">
                                <div className="h-11 max-[800px]:h-10 max-[500px]:h-9 w-11 max-[800px]:w-10 max-[500px]:w-9 flex justify-center items-center rounded-md" style={{ backgroundColor: getCategoryColor(category) }}>
                                    <CategoryIcon 
                                        category={category}
                                        classname="text-2xl max-[800px]:text-xl max-[500px]:text-lg" 
                                    />
                                </div>

                                <div className="max-[500px]:text-sm">{category}</div>
                            </div>
                            
                            <div className="max-[500px]:text-sm">
                                {formatExpenseAmount(data[index])}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ExpenseFrequencyPerCategory;