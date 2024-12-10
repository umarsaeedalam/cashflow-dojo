import { Badge } from "@/components/ui/shadcn/badge"
import { getCategoryColor } from "@/utils/functions";

type Props = {
    category: string;
}

function CategoryLabel({ category }: Props) {
    return(
        <Badge style={{ backgroundColor: getCategoryColor(category) }} className="rounded-full text-light-50 font-semibold py-1 px-2 tracking-wide">{category}</Badge>
    )
}

export default CategoryLabel;