"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

export default function LogoutModal({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const handleLogout = async () => {
        // Handle login logic here
        signOut(
            {
                redirect: true, // Redirect after sign-out
                callbackUrl: "/", // Redirect to home after logout
            }
        )


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure ?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your current session from your device.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={handleLogout}>Continue</Button>
                        </DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
