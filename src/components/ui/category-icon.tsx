import { IoFastFoodOutline, IoHomeOutline, IoTrainOutline, IoBodyOutline, IoSchoolOutline, IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineHealthAndSafety, MdDevices } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";

type Props = {
    category: string;
    classname?: string;
}

function CategoryIcon({ category, classname }: Props) {
    switch (category) {
        case 'Housing':
            return <IoHomeOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Transportation':
            return <IoTrainOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Food & Dining':
            return <IoFastFoodOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Healthcare':
            return <MdOutlineHealthAndSafety className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Personal Care':
            return <IoBodyOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Education':
            return <IoSchoolOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Entertainment & Leisure':
            return <IoGameControllerOutline className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Technology':
            return <MdDevices className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Savings & Investments':
            return <AiOutlineStock className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Debt Repayment':
            return <FaFileInvoiceDollar className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        case 'Gifts & Donations':
            return <LiaHandHoldingHeartSolid className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
        default:
            return <AiOutlineStock className={`text-neutral ${classname === undefined ? 'text-2xl max-[1280px]:text-xl' : classname}`} />;
    }
};

export default CategoryIcon