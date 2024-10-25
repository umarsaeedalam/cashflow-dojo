import { useMediaQuery } from '@react-hook/media-query'
import MobileNavbar from "./mobile-Navbar"
import ProfileButton from "@/components/ui/profile-button"
import { User } from "@/utils/types"

type Props = {
    user: User;
    profilePicture: string | null | undefined;
}

function Header({ user, profilePicture }: Props) {
    const isTablet = useMediaQuery('(max-width: 1160px)');

    return (
        <header className={"flex justify-end max-[1160px]:justify-between mx-12 max-[1400px]:mx-8 max-[1160px]:mx-6 items-center row-start-1"}>
            {isTablet && <MobileNavbar />}
            
            <ProfileButton 
                user={user} 
                profilePicture={profilePicture} 
            />
        </header>
    )
}

export default Header