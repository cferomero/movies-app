"use client"

import { SidebarItemsProps } from "./SidebarItems.types";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fira_Sans } from 'next/font/google'


const firaSans = Fira_Sans({ subsets: ['latin'], weight: ['400']})

export function SidebarItems(props: SidebarItemsProps) {
    const { item } = props
    const { href, icon: Icon, label} = item

    const pathName = usePathname()
    const activePath = pathName === href


    return (
        <Link
            href={href}
            className={cn(`flex gap-x-2 mt-2 light:text-slate-700 dark:text-white text-sm items-center hover:bg-slate-300/70 p-2 rounded-lg cursor-pointer`, activePath && 'bg-slate-400/50')}
        >
            <Icon className="h-5 w-5" strokeWidth={2} />
            <p className={`${firaSans.className} text-base`}> {label} </p>
        </Link>
    )
}