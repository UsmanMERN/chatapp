import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function UserAvatar({ name, imageUrl }: { name: string, imageUrl: string }) {
    return (
        <><Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{name && name[0]}</AvatarFallback>
        </Avatar></>
    )
}
