import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

export function LoginModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Getting start</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Welcome to Quickchat</DialogTitle>
                        <DialogDescription>
                            QuickChat makes it effortless to create secure chat links and start conversions in seconds.
                        </DialogDescription>
                    </DialogHeader>
                    <Button variant={"outline"}>
                        <Image src={"/images/google.png"} className="mr-4" height={25} width={25} alt="Google Logo" /> Continue with Google
                    </Button>
                </DialogContent>
            </form>
        </Dialog>
    )
}
