import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes"
import { Logo } from "@/components/Logo"

export function Sidebar() {
    return (
        <div className="h-screen">
            <div className="h-full flex flex-col border-r">
                <Logo />
                <SidebarRoutes />
            </div>
        </div>
    )
}