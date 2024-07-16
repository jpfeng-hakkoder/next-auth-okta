import AuthButton from "@components/auth/AuthButton";
import Link from "next/link";

export default function TheTopNavBar() {
    return (
        <nav className="flex justify-between h-16 p-2 bg-teal-400 items-center">
            <AuthButton/>
            {/* Right-hand items*/}
            <div className="flex gap-x-4">
                {/* Public access */}
                <Link href="/public-page">Public page</Link>
                {/* Needs auth */}
                <Link href="/protected-page">Protected page</Link>
            </div>
        </nav>
    )
}