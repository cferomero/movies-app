import { Menu, Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from '@clerk/nextjs';

import { SidebarRoutes } from '../SidebarRoutes/SidebarRoutes'
import { ModeToggle } from '@/components/ModeToggle/ModeToggle'

export function Navbar () {
    return (
        <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20 dark:bg-slate-900/100">
            <div className="block xl:hidden">
                <Sheet>
                    <SheetTrigger className='flex items-center'>
                        <Menu className='dark:text-white' />
                    </SheetTrigger>
                    <SheetContent className='bg-slate-100 dark:bg-slate-900' side='left'>
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="relative justify-self-start w-[300px]">
                <Input placeholder='Buscar...' className='rounded-lg' />
                <Search strokeWidth={1} className='absolute top-2 right-2' />
            </div>
            <div className="flex gap-x-2 items-center">
                <ModeToggle />
                <Bell className='dark:text-white'/>
                <UserButton />
            </div>
        </nav>
    )
}