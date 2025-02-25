import Image from "next/image";

export default function Author() {
    return (
        <div className="flex w-full p-5 justify-center items-center gap-4">
             <a className="flex w-full p-5 justify-center items-center gap-4" href="https://monopolisticinvestor.substack.com/"><h2>Author:Monopolistic Investor</h2>            <Image src="/newsletterLogo.svg" alt="Monopolistic Investor logo" width={60} height={60}/></a>
        </div>
    );
}