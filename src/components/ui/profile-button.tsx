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
            <SheetTrigger className="outline-none text-accent focus-visible:outline-secondary rounded-lg transition-colors ease-in-out duration-200">
                <UserProfile 
                    username={user.name} 
                    profilePicture={profilePicture} 
                />
            </SheetTrigger>

            <SheetContent className="max-w-[425px] bg-primary text-secondary border-primary rounded-l-lg">
                <SheetHeader>
                    <SheetTitle className="text-secondary text-left max-[500px]:text-center">Edit profile</SheetTitle>
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