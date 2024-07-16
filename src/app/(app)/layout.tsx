import TheTopNavBar from "@components/TheTopNavBar/TheTopNavBar"

interface Props {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <>
            <TheTopNavBar/>
            {children}
        </>
    )
}