import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen gap-5">
      <Image src="./marketShareAppIcon.svg" alt="market share app icon" width={120} height={120}></Image>
      <h1>MarketShare</h1>
      <h2>By Monopolistic Investor</h2>
      <a href="/api/auth/login">Login</a>
      <h2>None of the content in this app should be considered financial advice. For informational purposes only!</h2>
    </div>
  );
}
