import { OKTA } from "@/app/constants/okta";
import { authOptions } from "@/app/lib/auth";
import AuthButton from "@components/auth/AuthButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TheTopNavBar() {

    const session = await getServerSession(authOptions)

    return (
        <nav className="flex justify-between h-16 p-2 bg-teal-400 items-center">
            <AuthButton/>
            {/* Right-hand items*/}
            <div className="flex gap-x-4">
                {/* Public access */}
                <Link href="/public-page">Public page</Link>
                {/* Needs auth */}
                <Link href="/protected-page">Protected page</Link>
                {session?.groups.includes(OKTA.GROUPS.APPROVERS) && <Link href="/approver/home">Approver Home</Link> }
            </div>
        </nav>
    )
}