import Author from "../ui/author";
import Navbar from "../ui/navbar";
import UserSupport from "../ui/userSupport";
 
export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props; // Destructure children from props

  return (
    <div className="flex h-screen flex-col w-full">
      <div className="w-full flex-none">
        <Navbar />
      </div>
      <div className="flex p-6 items-center justify-center flex-col">{children}</div>
      <UserSupport></UserSupport>
      <Author></Author>
    </div>
  );
}