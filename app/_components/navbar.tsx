import { Button } from "@/components/ui/button";
import { BookHeart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-slate-200">
        <div className="container mx-auto px-4 py-4 max-w-6xl flex items-center justify-between">
            <Link href={'/'} className="flex items-center gap-1">
            <BookHeart className="text-pink-700" />
            <div className="text-xl font-bold">Boo<span className="text-pink-700">g</span>store</div>
            </Link>
            <div className="flex items-center gap-4">
            <Link href={'/books'}>Books</Link>
            <Button>Login</Button>
            </div>
        </div>
    </div>
  )
}