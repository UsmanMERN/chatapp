import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <Image src={"/images/404.svg"} alt='page not found' height={500} width={500} />
            <Link href={"/"} className='text-blue-500 text-lg font-semibold mt-4'>
                <Button>
                    Go to Home
                </Button>
            </Link>
        </div>
    )
}
