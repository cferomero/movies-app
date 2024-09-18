"use client"

import { SidebarItems } from "../SidebarItems"
import { dataMenuSidebar, dataLibrarySidebar, dataSupportSidebar } from './SidebarRoutes.data'

import { Separator } from "@/components/ui/separator"
import { Fira_Sans } from 'next/font/google'

const firaSans = Fira_Sans({ subsets: ['latin'], weight: ['400']})


export function SidebarRoutes() {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className={`${firaSans.className} text-slate-400 mb-2`}> MENÚ </p>
                    { dataMenuSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item}/>
                    ))}
                </div>
                <Separator />
                <div className="p-2 md:p-6">
                    <p className={`${firaSans.className} text-slate-400 mb-2`}> BIBLIOTECA </p>
                    { dataLibrarySidebar.map((item) => (
                        <SidebarItems key={item.label} item={item}/>
                    ))}
                </div>
                <Separator />
                <div className="p-2 md:p-6">
                    <p className={`${firaSans.className} text-slate-400 mb-2`}> SOPORTE </p>
                    { dataSupportSidebar.map((item) => (
                        <SidebarItems key={item.label} item={item}/>
                    ))}
                </div>
                <Separator />
                {/* <footer className="mt-3 p-3 text-center">
                    2024. All rights reserved
                </footer> */}
            </div>
        </div>
    )
}