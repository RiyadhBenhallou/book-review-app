"use client";
import { Button } from "@/components/ui/button";
import { BookHeart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="bg-slate-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1">
          <BookHeart className="text-pink-700" />
          <div className="text-xl font-bold font-dancing">
            Book<span className="text-pink-700">C</span>lub
          </div>
        </Link>
        {pathname === "/books" && (
          <>
            <div className="flex items-center gap-4">
              <Button size={"sm"} variant="link" asChild>
                <Link href={"/"}>Home</Link>
              </Button>
              <Button size={"sm"} variant="link" asChild>
                <Link href={"/books"}>Books</Link>
              </Button>
            </div>
          </>
        )}
        {pathname === "/" && (
          <>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size={"sm"} variant="outline">
                <Link href="/books">Explore Books</Link>
              </Button>
              <Button size={"sm"} asChild>
                <Link href="/books">Get Started</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
