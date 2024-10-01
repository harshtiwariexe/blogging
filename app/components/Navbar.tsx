import Link from "next/link";
import ThemeSwitch from "./ThemeButton";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center p-4 sm:px-6 md:px-8 lg:px-12 ">
      <Link href="/" className="text-lg font-semibold sm:text-xl">
        Blog
      </Link>
      <ThemeSwitch />
    </div>
  );
}
