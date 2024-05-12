"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from '@/components/toggle-mode'
import Logo from '../../public/icon/logo.png'
import { signOut, useSession } from "next-auth/react"

export default function Header({ props }: {props?: any}) {
    const session = useSession()

    const onLogout = () => {
        signOut()
    }

    return (
        <div className="w-full border-b-2 border-primary-foreground px-12">
            <div className="flex flex-row justify-between h-20 w-full ">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-10")}
                    {...props}
                >
                        <Link href='/'>
                        <Image src={Logo} alt='logo of the app' className='h-14 w-14 cursor-pointer' />
                    </Link>
                    {/* <NavigationLink href='/announcement'>Announcement</NavigationLink>
                    <NavigationLink href='/notification'>Notifications</NavigationLink> */}
                </nav>
                <div className="flex items-center content-center flex-row  gap-x-6">
                    <ModeToggle/>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>

                            <div className="space-x-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>{session.data?.user.username}</p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button variant="destructive" className='w-full' onClick={onLogout}>Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}