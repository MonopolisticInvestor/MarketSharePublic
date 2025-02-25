import Link from "next/link";

export default function UserSupport() {
    return (
        <div className="flex justify-center items-center w-full">
            <Link className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded outline-none" href={"https://docs.google.com/forms/d/e/1FAIpQLSfYINAHxNmTo1wSHRTlXPTUdVFH40uLskNBAWzC36Qj8v9haw/viewform?usp=dialog"}>Support</Link>
        </div>
    );
}