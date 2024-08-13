import Link from "next/link";
import ThemeSwitch from "./ThemeButton";

export default function () {
  return (
    <>
      <div>
        <Link href="/">Blog</Link>
        <ThemeSwitch />
      </div>
    </>
  );
}
