import Image from 'next/image'
import { useMediaQuery } from '@react-hook/media-query'
import { VscAccount } from "react-icons/vsc"

type ProfileProps = {
    username: string
    profilePicture: string | null | undefined
}

function UserProfile({ username, profilePicture }: ProfileProps) {
    const isTablet = useMediaQuery('(max-width: 945px)')
    const imageSize = isTablet ? 28 : 32

    return (
        <div className={`flex p-1 items-center rounded-lg gap-4 hover:underline-offset-4 hover:underline hover:text-accent-shade outline-none transition-all ease-in-out duration-200 max-[945px]:gap-3`}>
            <p className="font-semibold max-[945px]:text-sm">{username}</p>
            
            {profilePicture ? (
                <Image 
                    src={profilePicture} 
                    alt='User Profile Picture' 
                    width={imageSize} 
                    height={imageSize}
                    className="rounded-full"
                />
            ) : (
                <VscAccount className="text-2xl max-[945px]:text-xl"/>
            )}
        </div>
    )
}

export default UserProfile