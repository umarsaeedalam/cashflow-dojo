'use client'

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/shadcn/sheet"
import ProfileForm from "@/components/ui/profile-form"
import UserProfile from "./user-profile"
import { User } from "@/utils/types"

type Props = {
    user: User;
    profilePicture: string | null | undefined;
  
}

function ProfileButton({ user, profilePicture }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen} modal={true}>
            <SheetTrigger className="outline-none text-accent focus-visible:outline-accent-500 rounded-lg transition-colors ease-in-out duration-200">
                <UserProfile 
                    username={user.name} 
                    profilePicture={profilePicture} 
                />
            </SheetTrigger>

            <SheetContent className="max-w-[425px] bg-[#CDD5E0] rounded-l-3xl border-0">
                <SheetHeader>
                    <SheetTitle className="text-left max-[500px]:text-center tracking-wide">Edit profile</SheetTitle>
                </SheetHeader>
                
                <ProfileForm 
                    user={user} 
                    handleSetOpen={setOpen} 
                />
            </SheetContent>
        </Sheet>
  )
}

export default ProfileButton;