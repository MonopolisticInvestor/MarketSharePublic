import { PowerIcon, UserIcon, ChartPieIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="w-full flex justify-start items-center p-2">
            <Link href="/">
                <Image src="/marketShareAppIcon.svg" alt="Market Share App Icon" width={60} height={60} className="w-6 h-6"/> 
            </Link>
            <Link href="https://billing.stripe.com/p/login/4gw01FdDqc7D81y000" className="flex h-[48px] w-fit items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <UserIcon className="w-6"></UserIcon>
            </Link>
            
            <a href="/api/auth/logout" className="flex h-[48px] w-fit items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6"/>
                <div>Sign Out</div>
             </a>

             <Link href="/dashboard/marketShare" className="flex h-[48px] w-fit items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <ChartPieIcon className="w-6"></ChartPieIcon>
                <div>Market Share App</div>
             </Link>
        </div>
    )
}