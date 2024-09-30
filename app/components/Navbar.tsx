import Link from "next/link";
import ThemeSwitch from "./ThemeButton";

export default function () {
  return (
    <>
      <div className="flex justify-around gap-10 m-8 ">
        <Link href="/">Blog</Link>
        <ThemeSwitch />
      </div>
    </>
  );
}
