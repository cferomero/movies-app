import { House, Clapperboard, Tv, Clock, Bookmark, Star, Download, CircleUser, Settings, CircleHelp } from 'lucide-react'

export const dataMenuSidebar = [
    {
        icon: House,
        label: "Inicio",
        href: "/"
    },
    {
        icon: Clapperboard,
        label: "Películas",
        href: "/movies"
    },
    {
        icon: Tv,
        label: "Series",
        href: "/series"
    },
    {
        icon: Clock,
        label: "Próximamente",
        href: "/proximamente"
    }
]
export const dataLibrarySidebar = [
    {
        icon: Bookmark,
        label: "Mi lista",
        href: "/playlist"
    },
    {
        icon: Star,
        label: "Destacados",
        href: "/destacados"
    },
    {
        icon: Download,
        label: "Descargas",
        href: "/descargas"
    }
]
export const dataSupportSidebar = [
    {
        icon: CircleUser,
        label: "Cuenta",
        href: "/cuenta"
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: CircleHelp,
        label: "Help",
        href: "/help"
    }
]