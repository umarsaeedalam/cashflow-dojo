'use client'

import Image from "next/image"
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import Header from "@/components/layout/header"
import NavBar from "./nav-bar"
import { User } from "@/utils/types"
import logo from '../../../public/android-chrome-512x512.png'

type Props = {
    content: React.ReactNode;
    user: User;
    profilePicture: string | null | undefined;
}

function Layout({ content, user, profilePicture }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const isTablet = useMediaQuery('(max-width: 1160px)');

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className="h-full flex justify-center items-center">
                <Image src={logo} alt="Loading..." height={75}/>
            </div>
        )
    }

    if (isTablet) {
        return (
            <div className="grid grid-rows-[65px,_1fr] min-h-dvh max-h-dvh">
                <Header user={user} profilePicture={profilePicture}/>
                <main className="overflow-auto">{content}</main>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[auto_1fr] grid-rows-[65px,_1fr] min-h-dvh max-h-dvh">
            <Header 
                user={user} 
                profilePicture={profilePicture} 
            />

            <NavBar />

            <main className="overflow-auto">{content}</main>
        </div>
    )
}

export default Layout