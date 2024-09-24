import { Logo } from "@/components/Logo";

export const metadata = {
    title: 'Movie App',
    description: 'App to see movies'
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
            <div className="flex flex-col justify-center h-full items-center">
                <div className="text-center">
                    <Logo />
                    <h1 className="text-3xl my-2">
                        Movies App
                    </h1>
                </div>
            {children}
            </div>
            </body>
        </html>
    )
}