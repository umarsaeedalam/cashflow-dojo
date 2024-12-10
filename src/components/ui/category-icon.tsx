import { IoFastFoodOutline, IoHomeOutline, IoTrainOutline, IoBodyOutline, IoSchoolOutline, IoGameControllerOutline, IoBagOutline, IoShirtOutline } from "react-icons/io5";
import { MdOutlineHealthAndSafety, MdDevices, MdOutlinePower } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { GiMeal } from "react-icons/gi";
import { RiSuitcaseLine } from "react-icons/ri";
import { CiBank } from "react-icons/ci";
import { GiLipstick } from "react-icons/gi";

type Props = {
    category: string;
    classname?: string;
};
  
function CategoryIcon({ category, classname }: Props) {
    switch (category) {
        case "Housing":
            return <IoHomeOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Household Items":
            return <IoBagOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Utilities":
            return <MdOutlinePower className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Groceries":
            return <GiMeal className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Dining Out":
            return <IoFastFoodOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Transportation":
            return <IoTrainOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Education":
            return <IoSchoolOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Wellness & Fitness":
            return <IoBodyOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Beauty & Grooming":
            return <GiLipstick className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Savings & Investments":
            return <CiBank className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Insurance & Protection":
            return <MdOutlineHealthAndSafety className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Entertainment & Leisure":
            return <IoGameControllerOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Travel & Vacation":
            return <RiSuitcaseLine className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Clothing & Accessories":
            return <IoShirtOutline className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Technology":
            return <MdDevices className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        case "Gifts & Donations":
            return <LiaHandHoldingHeartSolid className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
        default:
            return <AiOutlineStock className={`text-neutral ${classname ?? "text-2xl max-[1280px]:text-xl"}`} />;
    }
  }
  
  export default CategoryIcon;
  