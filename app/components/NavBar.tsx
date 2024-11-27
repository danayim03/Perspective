import Link from "next/link";

export default function NavBar() {
return (
    <nav className="flex fixed w-full justify-between items-center font-roboto p-8 bg-white">
        <div className="flex space-x-4">
        <Link href="/" className="hover:text-pink-300">
            Home
        </Link>
        </div>
        <div>
        <Link href="/about" className="hover:text-pink-300">
            About
        </Link>
        </div>
    </nav>
    );
}
