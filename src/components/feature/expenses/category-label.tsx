import { Badge } from "@/components/ui/shadcn/badge"
import { getCategoryColor } from "@/utils/functions";

type Props = {
    category: string;
}

function CategoryLabel({ category }: Props) {
    return(
        <Badge style={{ backgroundColor: getCategoryColor(category) }} className="rounded-md text-neutral font-semibold py-1 px-2 tracking-wide">{category}</Badge>
    )
}

export default CategoryLabel;