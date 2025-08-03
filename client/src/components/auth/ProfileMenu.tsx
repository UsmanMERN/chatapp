import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "../common/UserAvatar"
import dynamic from "next/dynamic";
// import LogoutModal from "./LogoutModal";

const LogoutModal = dynamic(() => import("./LogoutModal"))

export function ProfileMenu({ name, imageUrl }: { name: string, imageUrl: string }) {
    const [logoutOpen, setLogoutOpen] = useState(false);


    return (
        <>
            {logoutOpen && <Suspense fallback={<p>Loading..</p>}>
                <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
            </Suspense>}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-transparent outline-0 "><UserAvatar name={name} imageUrl={imageUrl} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
